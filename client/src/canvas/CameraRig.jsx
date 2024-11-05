/* eslint-disable react/prop-types */
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";
import { useRef, useState } from "react";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  // State untuk kontrol drag
  const [isDragging, setIsDragging] = useState(false);
  const [previousMousePosition, setPreviousMousePosition] = useState({
    x: 0,
    y: 0,
  });

  // Batasan rotasi pada sumbu X (untuk gerakan atas dan bawah)
  const MAX_ROTATION_X = Math.PI / 6; // Contoh: sekitar 30 derajat ke atas atau ke bawah
  const MIN_ROTATION_X = -Math.PI / 6; // Contoh: sekitar 30 derajat ke bawah

  const handlePointerDown = (event) => {
    setIsDragging(true);
    setPreviousMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;
      setPreviousMousePosition({ x: event.clientX, y: event.clientY });

      // Rotasi grup di sumbu Y (horizontal)
      if (group.current) {
        group.current.rotation.y += deltaX * 0.01; // Kecepatan rotasi horizontal

        // Rotasi grup di sumbu X (vertikal) - Sesuaikan arah rotasi agar tidak terbalik
        group.current.rotation.x += deltaY * 0.01; // Perhatikan perubahan dari `-` menjadi `+`

        // Batasi rotasi di sumbu X agar tidak lebih dari batas tertentu
        group.current.rotation.x = Math.max(
          MIN_ROTATION_X,
          Math.min(MAX_ROTATION_X, group.current.rotation.x)
        );
      }
    }
  };

  // Menggunakan useFrame untuk mengupdate posisi kamera dan rotasi grup
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the camera based on screen size
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    // set camera position smoothly
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);
  });

  return (
    <group
      ref={group}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {children}
    </group>
  );
};

export default CameraRig;
