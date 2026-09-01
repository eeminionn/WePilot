'use client';

import { useEffect, useRef } from 'react';

const MODEL_UID = '67ee20c981b64c059669d70f2cb302bf';
const VIEWER_SCRIPT_ID = 'sketchfab-viewer-api';
const VIEWER_SCRIPT_URL = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
const FALLBACK_URL = `https://sketchfab.com/models/${MODEL_UID}/embed?autostart=1&preload=1&camera=0&autospin=0.18&dnt=1&dof_circle=0&ui_controls=0&ui_general_controls=0&ui_infos=0&ui_hint=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0`;

type SketchfabApi = {
  start: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  setFov: (angle: number, callback?: () => void) => void;
  recenterCamera: (callback?: () => void) => void;
  setUserInteraction: (enabled: boolean, callback?: () => void) => void;
};

type SketchfabClient = {
  init: (uid: string, options: Record<string, unknown>) => void;
};

type SketchfabConstructor = new (version: string, iframe: HTMLIFrameElement) => SketchfabClient;

declare global {
  interface Window {
    Sketchfab?: SketchfabConstructor;
  }
}

function loadViewerApi() {
  if (window.Sketchfab) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(VIEWER_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Sketchfab viewer unavailable')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = VIEWER_SCRIPT_ID;
    script.src = VIEWER_SCRIPT_URL;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('Sketchfab viewer unavailable')), { once: true });
    document.head.appendChild(script);
  });
}

export default function HeroScene() {
  const iframe = useRef<HTMLIFrameElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    let active = true;
    const frame = iframe.current;

    const useFallback = () => {
      if (active && frame) frame.src = FALLBACK_URL;
    };

    loadViewerApi().then(() => {
      if (!active || !frame || !window.Sketchfab || initialized.current) return;
      initialized.current = true;

      const client = new window.Sketchfab('1.12.1', frame);
      client.init(MODEL_UID, {
        autostart: 1,
        autospin: 0.18,
        camera: 0,
        dnt: 1,
        dof_circle: 0,
        ui_controls: 0,
        ui_general_controls: 0,
        ui_infos: 0,
        ui_help: 0,
        ui_settings: 0,
        ui_inspector: 0,
        ui_vr: 0,
        ui_ar: 0,
        ui_fullscreen: 0,
        ui_annotations: 0,
        ui_hint: 0,
        ui_stop: 0,
        ui_watermark: 0,
        ui_watermark_link: 0,
        success: (api: SketchfabApi) => {
          if (!active) return;
          api.start();
          api.addEventListener('viewerready', () => {
            api.setUserInteraction(false);
            api.setFov(55, () => api.recenterCamera());
          });
        },
        error: useFallback,
      });
    }).catch(useFallback);

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="hero-model" aria-hidden="true">
      <div className="hero-model-frame">
        <iframe
          ref={iframe}
          title="Camión de carga girando en tres dimensiones"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
