'use client';

import { useRef } from 'react';

export default function HeroScene() {
  const frame = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!frame.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    frame.current.style.setProperty('--model-x', `${x * 9}px`);
    frame.current.style.setProperty('--model-y', `${y * 7}px`);
    frame.current.style.setProperty('--model-rotate-x', `${y * -0.65}deg`);
    frame.current.style.setProperty('--model-rotate-y', `${x * 0.9}deg`);
  };

  const resetFrame = () => {
    if (!frame.current) return;
    frame.current.style.setProperty('--model-x', '0px');
    frame.current.style.setProperty('--model-y', '0px');
    frame.current.style.setProperty('--model-rotate-x', '0deg');
    frame.current.style.setProperty('--model-rotate-y', '0deg');
  };

  return (
    <div className="hero-model" onPointerMove={handlePointerMove} onPointerLeave={resetFrame}>
      <div className="hero-model-frame" ref={frame}>
        <iframe
          title="Camión de carga interactivo en 3D"
          src="https://sketchfab.com/models/67ee20c981b64c059669d70f2cb302bf/embed?autostart=1&preload=1&autospin=0.08&ui_controls=0&ui_infos=0&ui_help=0&ui_settings=0&ui_inspector=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&transparent=1"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          loading="eager"
        />
      </div>
      <div className="model-axis axis-horizontal" />
      <div className="model-axis axis-vertical" />
      <div className="model-status"><span /> Modelo 3D en tiempo real</div>
      <a className="model-credit" href="https://sketchfab.com/3d-models/semi-truck-gameready-67ee20c981b64c059669d70f2cb302bf" target="_blank" rel="noreferrer">Semi Truck · badd / Sketchfab</a>
    </div>
  );
}
