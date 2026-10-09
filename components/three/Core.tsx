'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Spiral({ count, still }: { count: number; still: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const ang = t * Math.PI * 8;
      const r = 1.2 + t * 3.8;
      const y = (t - 0.5) * 6;
      a[i*3] = Math.cos(ang) * r;
      a[i*3+1] = y + (Math.random() - 0.5) * 0.3;
      a[i*3+2] = Math.sin(ang) * r;
    }
    return a;
  }, [count]);
  const colors = useMemo(() => {
    const c = new Float32Array(count * 3);
    const a = new THREE.Color('#00E5FF'), b = new THREE.Color('#8B5CF6');
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const col = a.clone().lerp(b, t);
      c[i*3] = col.r; c[i*3+1] = col.g; c[i*3+2] = col.b;
    }
    return c;
  }, [count]);
  useFrame((_, dt) => { if (ref.current && !still) ref.current.rotation.y += dt * 0.15; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function Scene({ count, still }: { count: number; still: boolean }) {
  const tilt = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((s, dt) => {
    const k = still ? 0 : dt;
    if (spin.current) { spin.current.rotation.y += k * 0.25; spin.current.rotation.x += k * 0.08; }
    if (knot.current) { knot.current.rotation.x += k * 0.4; knot.current.rotation.z += k * 0.3; }
    if (r1.current) r1.current.rotation.x += k * 0.5;
    if (r2.current) r2.current.rotation.y -= k * 0.4;
    if (r3.current) r3.current.rotation.z += k * 0.35;
    if (tilt.current) {
      tilt.current.rotation.y += (s.pointer.x * 0.6 - tilt.current.rotation.y) * 0.05;
      tilt.current.rotation.x += (-s.pointer.y * 0.4 - tilt.current.rotation.x) * 0.05;
    }
    s.camera.position.x += (s.pointer.x * 1.2 - s.camera.position.x) * 0.04;
    s.camera.position.y += (-s.pointer.y * 0.8 - s.camera.position.y) * 0.04;
    s.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5,4,5]} intensity={70} color="#00E5FF" />
      <pointLight position={[-5,-3,3]} intensity={60} color="#8B5CF6" />
      <pointLight position={[0,0,-6]} intensity={40} color="#00D9A6" />
      <group ref={tilt}>
        <group ref={spin}>
          <mesh ref={knot}>
            <torusKnotGeometry args={[1.1, 0.32, 128, 24, 2, 3]} />
            <meshStandardMaterial color="#0b0f16" metalness={0.95} roughness={0.2} emissive="#8B5CF6" emissiveIntensity={0.4} />
          </mesh>
          <mesh scale={1.9}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.18} />
          </mesh>
          <mesh ref={r1} rotation={[1.2, 0, 0]}>
            <torusGeometry args={[2.6, 0.012, 8, 120]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
          <mesh ref={r2} rotation={[0.3, 0, 0.9]}>
            <torusGeometry args={[3.1, 0.01, 8, 120]} />
            <meshBasicMaterial color="#8B5CF6" />
          </mesh>
          <mesh ref={r3} rotation={[0.6, 0.4, 0]}>
            <torusGeometry args={[3.6, 0.008, 8, 140]} />
            <meshBasicMaterial color="#00D9A6" />
          </mesh>
        </group>
        <Spiral count={count} still={still} />
      </group>
    </>
  );
}

export default function Core() {
  const box = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(true);
  const [cfg] = useState(() => ({
    mobile: typeof window !== 'undefined' && window.innerWidth < 768,
    still: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  }));
  useEffect(() => {
    let inView = true;
    const upd = () => setVis(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; upd(); });
    if (box.current) io.observe(box.current);
    document.addEventListener('visibilitychange', upd);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', upd); };
  }, []);
  return (
    <div ref={box} style={{ position: 'absolute', inset: 0 }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }} dpr={[1, cfg.mobile ? 1.25 : 2]} gl={{ antialias: !cfg.mobile }} frameloop={vis ? 'always' : 'never'} aria-hidden>
        <Scene count={cfg.mobile ? 800 : 2600} still={cfg.still} />
      </Canvas>
    </div>
  );
}