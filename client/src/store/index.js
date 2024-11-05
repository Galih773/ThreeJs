import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./threejs.png",
  fullDecal: "./threejs.png",
  decalPosition: [0, 0.04, 0.15],
  isDecalSelected: false,
});

export default state;
