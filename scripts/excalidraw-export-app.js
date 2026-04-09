import React from 'react';
import { createRoot } from 'react-dom/client';
import { Excalidraw, exportToBlob } from '@excalidraw/excalidraw';
import scene from './.generated-scene.json';

window.__pngBytes = null;
window.__exportError = null;

function App() {
  return React.createElement(Excalidraw, {
    initialData: scene,
    viewModeEnabled: true,
    zenModeEnabled: true,
    gridModeEnabled: false,
    UIOptions: {
      canvasActions: {
        export: false,
        loadScene: false,
        saveToActiveFile: false,
        toggleTheme: false,
      },
    },
    excalidrawAPI: (api) => {
      if (!api || window.__started) return;
      window.__started = true;
      setTimeout(async () => {
        try {
          const blob = await exportToBlob({
            elements: api.getSceneElements(),
            appState: {
              ...api.getAppState(),
              exportBackground: true,
              exportWithDarkMode: false,
            },
            files: api.getFiles(),
            mimeType: 'image/png',
            getDimensions: () => ({ width: 1200, height: 500, scale: 2 }),
          });
          const buffer = await blob.arrayBuffer();
          window.__pngBytes = Array.from(new Uint8Array(buffer));
        } catch (error) {
          window.__exportError = String(error?.stack || error?.message || error);
          console.error(error);
        }
      }, 1500);
    },
  });
}

createRoot(document.getElementById('app')).render(React.createElement(App));
