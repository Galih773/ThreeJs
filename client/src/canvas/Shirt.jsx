/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import state from "../store";
import { useState } from "react";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const [pos, setXYZ] = useState([0, 0, 0.09]);
  const [rot, setRot] = useState([0, 0, 0]);
  const [scl, setScl] = useState([0.15, 0.15, 0.15]);

  // State untuk decal teks (posisi, rotasi, skala)
  const [textPos, setTextPos] = useState([0, 0, 0.1]);
  const [textRot, setTextRot] = useState([0, 0, 0]);
  const [textScl, setTextScl] = useState([0.15, 0.15, 0.15]);

  // const logoTexture = useTexture(snap.logoDecal);
  // const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  // const stateString = JSON.stringify(snap);

  return (
    <>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-aoMapIntensity={1}
        dispose={null}
      >
        <group position={[0, 0, 0.15]}>
          <PivotControls
            scale={0.1}
            activeAxes={[true, true, true]}
            onDrag={(local) => {
              const position = new THREE.Vector3();
              const scale = new THREE.Vector3();
              const quaternion = new THREE.Quaternion();
              local.decompose(position, quaternion, scale);
              const rotation = new THREE.Euler().setFromQuaternion(quaternion);
              setXYZ([position.x, position.y, position.z + 0.1]);
              setRot([rotation.x, rotation.y, rotation.z]);
              setScl([0.15 * scale.x, 0.15 * scale.y, 0.15 * scale.z]);
            }}
          />
        </group>
        <Decal
          position={pos}
          rotation={rot}
          scale={scl}
          map={useTexture(snap.logoDecal)}
          material-depthTest={true}
        />

        {snap.textTexture && (
          <>
            <group position={[0, 0, 0.15]}>
              <PivotControls
                scale={0.1}
                activeAxes={[true, true, true]}
                onDrag={(local) => {
                  const position = new THREE.Vector3();
                  const scale = new THREE.Vector3();
                  const quaternion = new THREE.Quaternion();
                  local.decompose(position, quaternion, scale);
                  const rotation = new THREE.Euler().setFromQuaternion(
                    quaternion
                  );

                  setTextPos([position.x, position.y, position.z]);
                  setTextRot([rotation.x, rotation.y, rotation.z]);
                  setTextScl([0.15 * scale.x, 0.15 * scale.y, 0.15 * scale.z]);
                }}
              />
            </group>

            <Decal
              position={textPos}
              rotation={textRot}
              scale={textScl}
              map={snap.textTexture}
              depthTest={true}
              depthWrite={false}
            />
          </>
        )}
      </mesh>
    </>
  );
};

export default Shirt;
