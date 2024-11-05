import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./square.png",
  fullDecal: "./threejs.png",
  logoPosition: { x: 0, y: 0, z: -0.09 },
});

export default state;
