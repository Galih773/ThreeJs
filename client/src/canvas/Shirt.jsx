/* eslint-disable react/no-unknown-property */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, PivotControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState, useRef } from "react";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const [pos, setXYZ] = useState([0, 0, 0.09]);
  const [rot, setRot] = useState([0, 0, 0]);
  const [scl, setScl] = useState([0.15, 0.15, 0.15]);

  const [textPos, setTextPos] = useState([0, 0, 0.06]);
  const [textRot, setTextRot] = useState([0, 0, 0]);
  const [textScl, setTextScl] = useState([0.15, 0.15, 0.15]);

  const [textTexture, setTextTexture] = useState(null);

  const meshRef = useRef(); // Create a ref for the mesh

  const logoTexture = useTexture(snap.logoDecal);

  useEffect(() => {
    if (snap.textDataUrl) {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin("anonymous");
      loader.load(snap.textDataUrl, (texture) => {
        texture.needsUpdate = true;
        setTextTexture(texture);
      });
    }
  }, [snap.textDataUrl]);

  useEffect(() => {
    if (textTexture) {
      setTextPos([0, 0, 0.15]);
      setTextRot([0, 0, 0]);
      setTextScl([0.15, 0.15, 0.15]);
    }
  }, [textTexture]);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  return (
    <group key={JSON.stringify(snap)}>
      <mesh
        ref={meshRef}
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

        {snap.isLogoTexture && (
          <Decal
            position={pos}
            rotation={rot}
            scale={scl}
            map={logoTexture}
            mesh={meshRef.current} // Pass the mesh reference
            material-depthTest={true}
          />
        )}

        {textTexture && (
          <>
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
                    setTextPos([position.x, position.y, position.z + 0.07]);
                    setTextRot([rotation.x, rotation.y, rotation.z]);
                    setTextScl([
                      0.15 * scale.x,
                      0.15 * scale.y,
                      0.15 * scale.z,
                    ]);
                  }}
                />
              )}
            </group>

            {snap.isText && (
              <Decal
                position={textPos}
                rotation={textRot}
                scale={textScl}
                map={textTexture}
                mesh={meshRef.current} // Pass the mesh reference
                depthTest={false}
                transparent={true}
                opacity={1}
                material-depthWrite={false}
              />
            )}
          </>
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
