import {
  test,
  expect,
  type BrowserContext,
  type ConsoleMessage,
  type Page,
  type Route,
} from '@playwright/test';
import { startDocsServer, HOST, PORT } from './utils/docsServer';

const MOCK_TOKEN_ARTIFACT = {
  version: 1,
  issuedAt: '2025-10-17T00:30:38.735Z',
  charSet: 'ncs-app-secure',
  fragmentSize: 5,
  payload: [
    'ncVhFV-',
    'cDQxc0a',
    'slZTGdp',
    '-LUlRjp',
    'aT3lKd-',
    'pXRxd3s',
    'pp4UUFe',
    '-PeUVDc',
    'sUVB6Su',
    'ekowX3r',
    'cBoZw=e',
    'u=n',
  ],
  checksum: '21254',
};

/**
 * Verifica o bootstrap quando data/db.yml ainda não existe (404).
 */
test(
  'inicializa estado padrão quando o repositório está vazio',
  async ({ page, context }: { page: Page; context: BrowserContext }) => {
    const stopServer = await startDocsServer();
    const consoleMessages: string[] = [];

    try {
      await context.addInitScript(() => {
        window.localStorage.clear();
        window.localStorage.removeItem('territoryAppPat');
      });

    page.on('console', (message: ConsoleMessage) => {
      const text = message.text();
      if (text.includes('[controle-ncs]')) {
        consoleMessages.push(text);
      }
    });

      await page.route('**/token.json', async (route: Route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(MOCK_TOKEN_ARTIFACT),
        });
      });

      await page.route(
        'https://api.github.com/repos/EliezerRosa/app-controle-ncs/contents/data/db.yml',
        async (route: Route) => {
          await route.fulfill({ status: 404 });
        },
      );

      await page.goto(`http://${HOST}:${PORT}/`, { waitUntil: 'networkidle' });

    await expect(page.locator('main')).toContainText('Controle de Territórios');
    await expect(page.locator('main')).not.toContainText('Não foi possível carregar os dados do GitHub');

    await expect(async () => {
      expect(consoleMessages.some((entry) => entry.includes('Token reconstruído.'))).toBeTruthy();
      expect(consoleMessages.some((entry) => entry.includes('Repositório vazio, inicializando estado padrão.'))).toBeTruthy();
    }).toPass();

      const storedToken = await page.evaluate(() => window.localStorage.getItem('territoryAppPat'));
      expect(storedToken).toBeTruthy();
    } finally {
      await stopServer();
    }
  },
);
