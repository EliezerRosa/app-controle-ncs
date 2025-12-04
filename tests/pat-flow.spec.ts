import {
  test,
  expect,
  type BrowserContext,
  type ConsoleMessage,
  type Page,
  type Route,
} from '@playwright/test';
import { Buffer } from 'node:buffer';

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

const MOCK_DB_YAML = `appConfig:
  superAdminEmail: "super.admin@exemplo.com"
  userRoles:
    super.admin@exemplo.com: "Super Admin"
territories:
  "01":
    name: "Mock Territory"
    status: "Em Uso"
    lastUse: "2025-10-15T10:00:00Z"
    blocks: {}
`;

const MOCK_DB_RESPONSE = {
  content: Buffer.from(MOCK_DB_YAML, 'utf8').toString('base64'),
  sha: 'mock-sha',
  encoding: 'base64',
};

/**
 * Exercita o fluxo inicial do app numa sessão “anônima”, simulando a reconstrução
 * do PAT a partir de token.json e validando os logs e a superfície da UI.
 */
test(
  'recupera PAT e exibe tela de login sem erro inicial',
  async ({ page, context }: { page: Page; context: BrowserContext }) => {
  const consoleMessages: string[] = [];

  await context.addInitScript(() => {
    window.localStorage.clear();
    // garante que nenhum PAT pré-existente será usado
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

  await page.route('https://api.github.com/repos/EliezerRosa/app-controle-ncs/contents/data/db.yml', async (route: Route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(MOCK_DB_RESPONSE),
    });
  });

  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });

  await expect(page.locator('main')).toContainText('Controle de Territórios', { timeout: 15000 });
  await expect(page.locator('main')).not.toContainText('Não foi possível carregar os dados do GitHub');

  await expect(async () => {
    expect(consoleMessages.some((entry) => entry.includes('Aguardando token...'))).toBeTruthy();
    expect(consoleMessages.some((entry) => entry.includes('Token reconstruído.'))).toBeTruthy();
    expect(consoleMessages.some((entry) => entry.includes('Dados carregados.'))).toBeTruthy();
  }).toPass();

  const storedToken = await page.evaluate(() => window.localStorage.getItem('territoryAppPat'));
  expect(storedToken).toBeTruthy();
  },
);
