/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
// import { motion } from "framer-motion-3d"; // Import dari framer-motion-3d

import Shirt from "./Shirt";

const CanvasModel = () => {
  return (
    <Canvas
      shadows
      orthographic
      camera={{ position: [0, 10, 100], zoom: 1000 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.5 * Math.PI} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <Shirt />
      <OrbitControls makeDefault />
    </Canvas>
  );
};

export default CanvasModel;
