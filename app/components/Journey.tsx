'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const steps = [
  { number: '01', kicker: 'Antes de partir', title: 'Entiende el trayecto.', body: 'Duración estimada, tiempo acumulado de conducción y tipo de ruta crean el contexto inicial.' },
  { number: '02', kicker: 'Mientras avanzas', title: 'Pregunta poco. Escucha bien.', body: 'Chequeos breves por voz ayudan a reconocer sueño, distracción o baja concentración sin exigir mirar la pantalla.' },
  { number: '03', kicker: 'Cuando importa', title: 'Convierte señales en una pausa.', body: 'WePilot recomienda hidratarse, moverse, descansar o detenerse antes de que el cansancio se transforme en riesgo.' },
  { number: '04', kicker: 'Vehículo detenido', title: 'Ayuda a decidir antes de continuar.', body: 'Un chequeo breve de atención puede orientar una recomendación clara y preventiva.' },
];

function MiniCar() {
  return (
    <group rotation={[0.04, -0.2, 0]}>
      <RoundedBox args={[1.45, 0.4, 0.72]} radius={0.16} smoothness={5}>
        <meshStandardMaterial color="#f7f7f2" roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[0.78, 0.3, 0.58]} radius={0.12} smoothness={5} position={[-0.08, 0.27, 0]}>
        <meshPhysicalMaterial color="#7895ff" roughness={0.1} transmission={0.15} />
      </RoundedBox>
      {[-0.44, 0.44].flatMap((x) => [-0.38, 0.38].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, -0.23, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.1, 28]} />
          <meshStandardMaterial color="#050507" />
        </mesh>
      )))}
    </group>
  );
}

function JourneyWorld({ active }: { active: number }) {
  const world = useRef<THREE.Group>(null);
  const car = useRef<THREE.Group>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-3.8, -3, -1), new THREE.Vector3(-2.6, -1.3, 0),
    new THREE.Vector3(-1.2, -0.8, 0.6), new THREE.Vector3(0.4, 0.3, 0),
    new THREE.Vector3(1.8, 1.4, -0.4), new THREE.Vector3(3.8, 3, -1),
  ]), []);

  useFrame((state) => {
    if (!world.current || !car.current) return;
    const target = [0.30, 0.43, 0.59, 0.72][active];
    const point = curve.getPoint(target);
    point.z += .82;
    car.current.position.lerp(point, 0.035);
    world.current.rotation.z = THREE.MathUtils.lerp(world.current.rotation.z, -0.18 + active * 0.09, 0.03);
    world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, state.pointer.x * 0.12, 0.03);
    world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, state.pointer.y * 0.07, 0.03);
  });

  return (
    <group ref={world} rotation={[0, 0, -0.18]}>
      <mesh>
        <tubeGeometry args={[curve, 160, 0.48, 20, false]} />
        <meshStandardMaterial color="#242427" roughness={0.48} metalness={0.12} />
      </mesh>
      <mesh position={[0, 0, .5]}>
        <tubeGeometry args={[curve, 160, 0.026, 10, false]} />
        <meshBasicMaterial color="#6f8cff" />
      </mesh>
      <group ref={car}><Float speed={1.2} floatIntensity={0.08} rotationIntensity={0.03}><MiniCar /></Float></group>
      {[0.30, 0.43, 0.59, 0.72].map((point, index) => {
        const position = curve.getPoint(point);
        return (
          <group key={point} position={position}>
            <mesh scale={active === index ? 1.7 : 1}>
              <sphereGeometry args={[0.09, 24, 24]} />
              <meshBasicMaterial color={active === index ? '#ffffff' : '#3157ff'} />
            </mesh>
            {active === index && <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.32, 0.018, 12, 64]} /><meshBasicMaterial color="#7895ff" transparent opacity={0.72} /></mesh>}
          </group>
        );
      })}
    </group>
  );
}

export default function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.step));
    }, { rootMargin: '-38% 0px -38% 0px', threshold: [0, 0.2, 0.6] });
    refs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="journey" id="como-funciona">
      <div className="journey-copy">
        {steps.map((step, index) => (
          <article className={`journey-step ${active === index ? 'is-active' : ''}`} data-step={index} key={step.number} ref={(element) => { refs.current[index] = element; }}>
            <div className="step-index">{step.number}</div>
            <p className="step-kicker">{step.kicker}</p>
            <h3>{step.title}</h3>
            <p className="step-body">{step.body}</p>
          </article>
        ))}
      </div>
      <div className="journey-stage">
        <div className="stage-header"><span>El trayecto</span><span>{String(active + 1).padStart(2, '0')} / 04</span></div>
        <Canvas camera={{ position: [0, 0, 9.2], fov: 43 }} dpr={[1, 1.5]}>
          <color attach="background" args={['#111113']} />
          <fog attach="fog" args={['#111113', 7, 14]} />
          <ambientLight intensity={1.1} />
          <directionalLight position={[3, 5, 5]} intensity={3.8} color="#ffffff" />
          <directionalLight position={[-4, -3, 4]} intensity={2.2} color="#3157ff" />
          <JourneyWorld active={active} />
        </Canvas>
        <div className="stage-note"><span className="pulse" /> La pantalla espera. La voz acompaña.</div>
      </div>
    </section>
  );
}
