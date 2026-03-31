import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd());
const targetFile = path.join(projectRoot, 'src', 'environments', 'environment.prod.ts');

function normalizeApiUrl(rawUrl) {
  const trimmed = (rawUrl || '').trim().replace(/\/+$/, '');
  if (!trimmed) {
    return 'http://localhost:3000/api';
  }

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const apiUrl = normalizeApiUrl(
  process.env.API_URL ||
  process.env.PUBLIC_API_URL ||
  process.env.BACKEND_URL
);

const googleClientId = (process.env.GOOGLE_CLIENT_ID || '').trim();

const fileContent = `export const environment = {
  production: true,
  apiUrl: '${apiUrl}',
  googleClientId: '${googleClientId}'
};
`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`environment.prod.ts generado con apiUrl=${apiUrl}`);
