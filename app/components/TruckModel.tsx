'use client';

import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

type TruckModelProps = React.ComponentProps<'group'> & {
  finish?: 'cobalt' | 'paper';
};

const MODEL_PATH = './models/wepilot-heavy-truck.glb';

function tuneMaterial(material: THREE.Material, finish: TruckModelProps['finish']) {
  const source = material as THREE.MeshStandardMaterial;
  const tuned = source.clone();
  const name = source.name.toLowerCase();

  tuned.roughness = 0.38;
  tuned.metalness = 0.08;

  if (name.includes('tire')) {
    tuned.color.set('#08090c');
    tuned.roughness = 0.84;
  } else if (name.includes('seat')) {
    tuned.color.set('#16171b');
    tuned.roughness = 0.72;
  } else if (name.includes('mirror') || name.includes('grey')) {
    tuned.color.set('#697079');
    tuned.metalness = 0.58;
    tuned.roughness = 0.22;
  } else if (name.includes('light_front')) {
    tuned.color.set('#e8efff');
    tuned.emissive = new THREE.Color('#b9cbff');
    tuned.emissiveIntensity = 1.35;
  } else if (name.includes('light_back')) {
    tuned.color.set('#ff5e62');
    tuned.emissive = new THREE.Color('#ff2738');
    tuned.emissiveIntensity = 0.75;
  } else if (name.includes('backcovering')) {
    tuned.color.set(finish === 'paper' ? '#dfe4f2' : '#4059b5');
    tuned.roughness = 0.65;
  } else if (name.includes('body2')) {
    tuned.color.set(finish === 'paper' ? '#dfe4f2' : '#17245a');
    tuned.metalness = 0.12;
    tuned.roughness = 0.4;
  } else {
    tuned.color.set(finish === 'paper' ? '#edf0f7' : '#2847bb');
    tuned.metalness = 0.16;
    tuned.roughness = 0.32;
  }

  return tuned;
}

export default function TruckModel({ finish = 'cobalt', ...props }: TruckModelProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const truck = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.material = Array.isArray(object.material)
        ? object.material.map((material) => tuneMaterial(material, finish))
        : tuneMaterial(object.material, finish);
    });

    return clone;
  }, [finish, scene]);

  return (
    <group {...props}>
      <primitive object={truck} position={[-0.515, 0.002, -0.126]} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
