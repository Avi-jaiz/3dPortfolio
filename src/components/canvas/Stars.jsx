import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Sphere } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (prop) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });
  console.log("sphere", sphere);
  useFrame(() => {
    ref.current.rotation.x -= 5 / 10000;
    ref.current.rotation.y -= 5 / 10000;

    console.log("ref.current.rotation.x", ref.current.rotation.x);
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...prop}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.0025}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}></Suspense>
        <Stars />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
