import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import useWindowSize from "../../Hooks/useWindowSizeHook";

const Computers = () => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const size = useWindowSize();

  return (
    <mesh>
      <hemisphereLight intensity={1.8} groundColor={"black"} />
      <pointLight intensity={1.5} />

      <primitive
        object={computer.scene}
        scale={size.width < 500 ? 0.5 : 0.75}
        rotation={[-0.001, -0.2, -0.01]}
        position={[0, -3.25, -1.5]}
      />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
    </mesh>
  );
};

const computerCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableRotate={true}
        />
        <Computers />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default computerCanvas;
