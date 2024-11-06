/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import state from "../store";
import { useEffect, useState } from "react";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");
  const [pos, setXYZ] = useState([0, 0, 0.09]);
  const [rot, setRot] = useState([0, 0, 0]);
  const [scl, setScl] = useState([0.15, 0.15, 0.15]);

  // State untuk decal teks (posisi, rotasi, skala)
  const [textPos, setTextPos] = useState([0, 0, 0.06]);
  const [textRot, setTextRot] = useState([0, 0, 0]);
  const [textScl, setTextScl] = useState([1, 1, 1]);

  // Local state for the text texture
  const [textTexture, setTextTexture] = useState(null);

  // Load the text texture whenever the data URL changes
  useEffect(() => {
    console.log(snap.textDataUrl);
    if (snap.textDataUrl) {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(snap.textDataUrl, (texture) => {
        texture.needsUpdate = true;
        setTextTexture(texture);
      });
    }
  }, [snap.textDataUrl]);

  // const logoTexture = useTexture(snap.logoDecal);
  // const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const logoTexture = useTexture(snap.logoDecal);

  useEffect(() => {
    console.log(textPos);
  }, [textPos]);

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-aoMapIntensity={1}
        dispose={null}
      >
        <group position={[0, 0, 0.15]}>
          {snap.showControl && (
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
                setXYZ([position.x, position.y, position.z + 0.1]);
                setRot([rotation.x, rotation.y, rotation.z]);
                setScl([0.15 * scale.x, 0.15 * scale.y, 0.15 * scale.z]);
              }}
            />
          )}
        </group>
        <Decal
          position={pos}
          rotation={rot}
          scale={scl}
          map={useTexture(snap.logoDecal)}
          material-depthTest={true}
        />

        {textTexture && (
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
                  console.log("had", position.z);
                  setTextPos([position.x, position.y, position.z + 0.07]);
                  setTextRot([rotation.x, rotation.y, rotation.z]);
                  setTextScl([0.15 * scale.x, 0.15 * scale.y, 0.15 * scale.z]);
                }}
              />
            </group>

            <Decal
              position={textPos}
              rotation={textRot}
              scale={textScl}
              map={textTexture}
              depthTest={true}
              depthWrite={true}
              material-depthTest={true}
            />
          </>
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
