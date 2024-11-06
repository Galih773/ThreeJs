import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: "./square.png",
  // fullDecal: "./threejs.png",
  // logoPosition: { x: 0, y: 0, z: 0.09 },
  // logoScale: {
  //   width: 0.15,
  //   height: 0.15,
  // },
  // logoRotation: 0,
  textContent: "Your Text Here",
  textFontFamily: "Arial",
  textFontSize: 100,
  textFontStyle: "",
  textFill: "#000000",
  textDataUrl: null,
});

export default state;
