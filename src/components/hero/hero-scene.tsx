import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, Lightformer } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

function MainOrb({ mouse, scrollY }: { mouse: React.MutableRefObject<{ x: number; y: number }>; scrollY: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Damped mouse rotation
    const targetY = mouse.current.x * 0.45;
    const targetX = -mouse.current.y * 0.35;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.06;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.06;
    // Idle drift
    ref.current.position.y = Math.sin(t * 0.4) * 0.08 - scrollY.current * 0.0015;
    const s = Math.max(0.55, 1 - scrollY.current * 0.0007);
    ref.current.scale.setScalar(1.55 * s);
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.3;
      innerRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshTransmissionMaterial
          backside
          samples={6}
          thickness={1.2}
          chromaticAberration={0.06}
          anisotropy={0.4}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          ior={1.4}
          roughness={0.04}
          color="#ffffff"
          transmission={1}
          attenuationDistance={1.4}
          attenuationColor="#dde6ff"
        />
      </mesh>
      {/* Inner emissive core */}
      <mesh ref={innerRef} scale={0.45}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color="#c7d2fe" emissive="#a5b4fc" emissiveIntensity={0.6} roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Shard({ angle, radius, y, scale, speed, mouse }: { angle: number; radius: number; y: number; scale: number; speed: number; mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.3 * speed + angle;
    ref.current.position.x = Math.cos(t) * radius + mouse.current.x * 0.3;
    ref.current.position.z = Math.sin(t) * radius * 0.6;
    ref.current.position.y = y + Math.sin(t * 1.6) * 0.15;
    ref.current.rotation.x = t * 0.4;
    ref.current.rotation.y = t * 0.5;
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
      <mesh ref={ref} scale={scale}>
        <octahedronGeometry args={[0.5, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={3}
          thickness={0.5}
          chromaticAberration={0.1}
          ior={1.35}
          roughness={0.1}
          transmission={1}
          color="#ffffff"
          attenuationColor="#e8d8ff"
          attenuationDistance={0.8}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1.5;
    }
    return arr;
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#a8b8ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function StudioRig() {
  return (
    <Environment resolution={512} frames={1} background={false}>
      <mesh scale={100}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" side={THREE.BackSide} />
      </mesh>
      <Lightformer form="ring"   intensity={6}   color="#c7d2fe" position={[4, 3, 4]}   scale={[8, 8, 1]} />
      <Lightformer form="ring"   intensity={5}   color="#fbcfe8" position={[-4, -3, 4]} scale={[7, 7, 1]} />
      <Lightformer form="rect"   intensity={4}   color="#a5f3fc" position={[0, 5, 0]}   scale={[10, 2, 1]} rotation={[Math.PI / 2, 0, 0]} />
      <Lightformer form="rect"   intensity={3.5} color="#fff0c8" position={[0, -5, 0]}  scale={[10, 2, 1]} rotation={[-Math.PI / 2, 0, 0]} />
      <Lightformer form="circle" intensity={4}   color="#e8d0ff" position={[-5, 0, -3]} scale={[6, 6, 1]} />
    </Environment>
  );
}

export function HeroScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, isMobile ? 1.3 : 1.7]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.6} />
      <StudioRig />
      <group position={[isMobile ? 0 : 2.2, 0, 0]}>
        <MainOrb mouse={mouse} scrollY={scrollY} />
        {!isMobile && (
          <>
            <Shard angle={0}            radius={2.4} y={0.4}  scale={0.55} speed={1}   mouse={mouse} />
            <Shard angle={Math.PI * 0.5} radius={2.6} y={-0.5} scale={0.4}  speed={1.3} mouse={mouse} />
            <Shard angle={Math.PI}       radius={2.2} y={0.8}  scale={0.35} speed={0.8} mouse={mouse} />
            <Shard angle={Math.PI * 1.4} radius={2.8} y={-0.3} scale={0.45} speed={1.1} mouse={mouse} />
            <Shard angle={Math.PI * 1.8} radius={2.3} y={0.6}  scale={0.32} speed={1.5} mouse={mouse} />
          </>
        )}
      </group>
      <Particles />
    </Canvas>
  );
}

export default HeroScene;
