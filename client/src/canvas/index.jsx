/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Environment, Center, CameraControls } from "@react-three/drei";
// import { motion } from "framer-motion-3d"; // Import dari framer-motion-3d

import Shirt from "./Shirt";
import { useSnapshot } from "valtio";
import state from "../store";
import { useEffect, useRef } from "react";
// import Backdrop from "./Backdrop";
// import CameraRig from "./CameraRig";

const CanvasModel = () => {
  const snap = useSnapshot(state);
  const cameraControlsRef = useRef();

  // Atur posisi kamera saat komponen pertama kali dimuat
  useEffect(() => {
    const adjustCameraPosition = () => {
      // Deteksi ukuran layar
      const isBreakpoint = window.innerWidth <= 1260;
      const isMobile = window.innerWidth <= 600;

      // Tentukan posisi kamera berdasarkan ukuran layar
      let targetPosition = [-0.4, 0, 2];
      if (snap.intro) {
        if (isBreakpoint) targetPosition = [0, 0, 2];
        if (isMobile) targetPosition = [0, 0.2, 2.5];
      } else {
        if (isMobile) targetPosition = [0, 0, 2.5];
        else targetPosition = [0, 0, 2];
      }

      // Atur posisi kamera menggunakan CameraControls
      if (cameraControlsRef.current) {
        cameraControlsRef.current.setPosition(...targetPosition, true); // Animasi ke posisi target
        cameraControlsRef.current.setTarget(0, 0, 0, true); // Fokus ke tengah model
      }
    };

    setTimeout(() => {
      adjustCameraPosition();
    }, 100);
    // Tambahkan event listener untuk perubahan ukuran layar
    window.addEventListener("resize", adjustCameraPosition);

    // Bersihkan listener ketika komponen di-unmount
    return () => window.removeEventListener("resize", adjustCameraPosition);
  }, [snap.intro]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 2], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5 * Math.PI} />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

      {/* <CameraRig> */}
      {/* <Backdrop /> */}
      {/* <motion.group
        initial={{ x: snap.intro ? 1 : 0 }}
        animate={{ x: snap.intro ? 0.5 : 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
      > */}
      <Center>
        <Shirt />
      </Center>
      {/* </motion.group> */}
      {/* </CameraRig> */}
      {/* Menggunakan CameraControls dengan ref untuk kontrol manual */}
      <CameraControls
        ref={cameraControlsRef}
        makeDefault
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={(Math.PI * 5) / 6}
        minDistance={2}
        maxDistance={10}
        dollyToCursor={true}
      />
    </Canvas>
  );
};

export default CanvasModel;
