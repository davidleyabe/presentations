import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

const outDir = path.resolve('assets/diagrams');
const outPng = path.join(outDir, 'supply-chain-flow.png');
const sceneSource = path.resolve('scripts/excalidraw-export-scene.json');
const outJson = path.join(outDir, 'supply-chain-flow.excalidraw.json');

await fs.mkdir(outDir, { recursive: true });
await fs.copyFile(sceneSource, outJson);

const vite = spawn('npx', ['vite', '--host', '127.0.0.1', '--port', '4173'], {
  cwd: process.cwd(),
  stdio: ['ignore', 'pipe', 'pipe'],
});

let started = false;
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('Vite did not start in time')), 30000);
  const onData = (chunk) => {
    const text = chunk.toString();
    process.stdout.write(text);
    if (text.includes('http://127.0.0.1:4173') || text.includes('ready in')) {
      started = true;
      clearTimeout(timer);
      resolve();
    }
  };
  vite.stdout.on('data', onData);
  vite.stderr.on('data', onData);
  vite.on('exit', (code) => {
    if (!started) {
      clearTimeout(timer);
      reject(new Error(`Vite exited early with code ${code}`));
    }
  });
});

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
page.on('console', (msg) => console.log('BROWSER:', msg.type(), msg.text()));
page.on('pageerror', (err) => console.log('PAGEERROR:', err.message));

try {
  await page.goto('http://127.0.0.1:4173/scripts/excalidraw-export-app.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Array.isArray(window.__pngBytes) && window.__pngBytes.length > 0 || window.__exportError, null, { timeout: 45000 });
  const exportError = await page.evaluate(() => window.__exportError);
  if (exportError) throw new Error(exportError);
  const bytes = await page.evaluate(() => window.__pngBytes);
  await fs.writeFile(outPng, Buffer.from(bytes));
  console.log(JSON.stringify({ outPng, outJson }, null, 2));
} finally {
  await browser.close();
  vite.kill('SIGTERM');
}
