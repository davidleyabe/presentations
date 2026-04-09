import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { spawn } from 'child_process';

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'diagram';
}

function createRectangle(id, x, y, width, height, backgroundColor) {
  return {
    id,
    type: 'rectangle',
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor,
    fillStyle: 'solid',
    strokeWidth: 2,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 3 },
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: [],
    updated: Date.now(),
    link: null,
    locked: false,
  };
}

function createText(id, x, y, text) {
  return {
    id,
    type: 'text',
    x,
    y,
    width: Math.max(80, text.length * 10),
    height: 24,
    angle: 0,
    strokeColor: '#1e1e1e',
    backgroundColor: 'transparent',
    fillStyle: 'hachure',
    strokeWidth: 1,
    strokeStyle: 'solid',
    roughness: 0,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    text,
    fontSize: 20,
    fontFamily: 1,
    textAlign: 'center',
    verticalAlign: 'middle',
    containerId: null,
    originalText: text,
    lineHeight: 1.2,
    baseline: 18,
  };
}

function createArrow(id, x, y, width, startId, endId) {
  return {
    id,
    type: 'arrow',
    x,
    y,
    width,
    height: 0,
    angle: 0,
    strokeColor: '#2563eb',
    backgroundColor: 'transparent',
    fillStyle: 'hachure',
    strokeWidth: 3,
    strokeStyle: 'solid',
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: { type: 2 },
    seed: Math.floor(Math.random() * 1000000),
    version: 1,
    versionNonce: Math.floor(Math.random() * 1000000),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    points: [[0, 0], [width, 0]],
    lastCommittedPoint: null,
    startBinding: { elementId: startId, focus: 0, gap: 0 },
    endBinding: { elementId: endId, focus: 0, gap: 0 },
    startArrowhead: null,
    endArrowhead: 'arrow',
  };
}

function buildFlowScene(spec) {
  const nodes = spec.nodes || [];
  const spacing = 200;
  const startX = 80;
  const y = 140;
  const width = 180;
  const height = 72;
  const palette = ['#e8f0ff', '#dcfce7', '#fef3c7', '#fee2e2', '#ede9fe'];
  const elements = [];

  nodes.forEach((label, index) => {
    const rectId = `rect-${index + 1}`;
    const textId = `text-${index + 1}`;
    const x = startX + index * spacing;
    elements.push(createRectangle(rectId, x, y, width, height, palette[index % palette.length]));
    elements.push(createText(textId, x + 24, y + 23, label));
  });

  for (let i = 0; i < nodes.length - 1; i++) {
    const x = startX + i * spacing + width;
    elements.push(createArrow(`arrow-${i + 1}`, x, y + 36, spacing - width, `rect-${i + 1}`, `rect-${i + 2}`));
  }

  return {
    type: 'excalidraw',
    version: 2,
    source: 'openclaw-presentations-site',
    elements,
    appState: { viewBackgroundColor: '#ffffff', gridSize: null },
    files: {},
  };
}

async function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error('Usage: node scripts/generate-excalidraw-diagram.mjs <spec.json>');
    process.exit(1);
  }

  const spec = JSON.parse(await fs.readFile(specPath, 'utf8'));
  const slug = slugify(spec.slug || spec.title || 'diagram');
  const outDir = path.resolve(spec.outputDir || 'assets/diagrams');
  const scenePath = path.join(outDir, `${slug}.excalidraw.json`);
  const pngPath = path.join(outDir, `${slug}.png`);
  const tempScenePath = path.resolve('scripts/.generated-scene.json');

  const scene = buildFlowScene(spec);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(tempScenePath, JSON.stringify(scene, null, 2));
  await fs.writeFile(scenePath, JSON.stringify(scene, null, 2));

  const vite = spawn('npx', ['vite', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
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
  const page = await browser.newPage({ viewport: { width: 1920, height: 720 }, deviceScaleFactor: 2 });

  try {
    await page.goto('http://127.0.0.1:4173/scripts/excalidraw-export-app.html', { waitUntil: 'networkidle' });
    await page.waitForFunction(() => Array.isArray(window.__pngBytes) && window.__pngBytes.length > 0 || window.__exportError, null, { timeout: 45000 });
    const exportError = await page.evaluate(() => window.__exportError);
    if (exportError) throw new Error(exportError);
    const bytes = await page.evaluate(() => window.__pngBytes);
    await fs.writeFile(pngPath, Buffer.from(bytes));
  } finally {
    await browser.close();
    vite.kill('SIGTERM');
  }

  console.log(JSON.stringify({ pngPath, scenePath }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
