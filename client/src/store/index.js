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
  textContent: "Teks Anda di sini", // Tambahkan konten teks
  textFontFamily: "Arial", // Tambahkan font family
  textFontSize: 40, // Tambahkan ukuran font
  textFontStyle: "", // Tambahkan gaya font (bold, italic)
  textFill: "#000000", // Tambahkan warna teks
  textTexture: null, // Menyimpan tekstur teks yang dihasilkan
  showControl: false,
  modelActive: "shirt",
  textDataUrl: null,
});

export default state;
