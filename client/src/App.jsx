import { useSnapshot } from "valtio";
import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import { motion } from "framer-motion";
import state from "./store";
import { lightenColor } from "./config/helpers";

function App() {
  const snap = useSnapshot(state);
  const backgroundColor = lightenColor(snap.color, 0.25);

  return (
    <main className="app transition-all ease-in" style={{ backgroundColor }}>
      <Home />

      <motion.div
        initial={{
          x: snap.intro ? 300 : 0, // Posisi awal, kalau `intro` true maka di kanan, kalau false di tengah
        }}
        animate={{
          x: snap.intro ? 300 : -325, // Posisi akhir saat `intro` berubah
        }}
        transition={{
          type: "spring",
          stiffness: 60, // Mengatur kekenyalan animasi
          damping: 15, // Mengatur tingkat peredaman animasi
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="w-full h-full"
      >
        <Canvas />
      </motion.div>

      <Customizer />
    </main>
  );
}

export default App;
