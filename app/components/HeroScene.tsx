'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Car() {
  return (
    <Float speed={1.25} rotationIntensity={0.025} floatIntensity={0.07}>
      <group rotation={[0.04, -0.38, -0.06]}>
        <RoundedBox args={[1.1, 0.34, 0.62]} radius={0.15} smoothness={5}>
          <meshStandardMaterial color="#171719" roughness={0.25} />
        </RoundedBox>
        <RoundedBox args={[0.62, 0.25, 0.5]} radius={0.11} smoothness={5} position={[-0.06, 0.22, 0]}>
          <meshPhysicalMaterial color="#a8bdff" roughness={0.12} transmission={0.2} />
        </RoundedBox>
        {[-0.34, 0.34].flatMap((x) => [-0.33, 0.33].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.19, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
            <meshStandardMaterial color="#030304" />
          </mesh>
        )))}
      </group>
    </Float>
  );
}

function HeroWorld() {
  const world = useRef<THREE.Group>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.8, -4.5, -0.4),
    new THREE.Vector3(-.3, -2.6, 0.2),
    new THREE.Vector3(1.35, -1.1, -0.2),
    new THREE.Vector3(-.85, .8, 0.35),
    new THREE.Vector3(.35, 2.3, 0.05),
    new THREE.Vector3(2.3, 4.7, -0.45),
  ]), []);
  const carPosition = useMemo(() => {
    const point = curve.getPoint(.38);
    point.z += .62;
    return point;
  }, [curve]);

  useFrame((state) => {
    if (!world.current) return;
    world.current.rotation.y = THREE.MathUtils.lerp(world.current.rotation.y, state.pointer.x * 0.16, 0.035);
    world.current.rotation.x = THREE.MathUtils.lerp(world.current.rotation.x, .12 + state.pointer.y * 0.08, 0.035);
    world.current.position.x = THREE.MathUtils.lerp(world.current.position.x, state.pointer.x * .18, .035);
  });

  return (
    <group ref={world} rotation={[.12, -.08, -.08]} position={[0, -.05, 0]} scale={.64}>
      <mesh>
        <tubeGeometry args={[curve, 180, .5, 24, false]} />
        <meshStandardMaterial color="#e4e4de" roughness={.5} metalness={.04} />
      </mesh>
      <mesh position={[0, 0, .51]}>
        <tubeGeometry args={[curve, 180, .028, 12, false]} />
        <meshBasicMaterial color="#3157ff" />
      </mesh>
      <group position={carPosition} scale={.9}><Car /></group>
      {[.12, .62, .87].map((value, index) => {
        const point = curve.getPoint(value);
        return <mesh key={value} position={point} scale={1 + index * .35}><sphereGeometry args={[.07,20,20]} /><meshBasicMaterial color="#3157ff" transparent opacity={.8 - index * .18} /></mesh>;
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8.8], fov: 42 }} dpr={[1, 1.5]}>
      <ambientLight intensity={2.2} />
      <directionalLight position={[4, 6, 5]} intensity={3.4} color="#ffffff" />
      <directionalLight position={[-4, -2, 4]} intensity={1.7} color="#7895ff" />
      <HeroWorld />
    </Canvas>
  );
}
