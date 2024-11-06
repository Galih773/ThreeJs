// TextEditor.js
import { useRef, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import { useSnapshot } from "valtio";
import state from "../store";
import * as THREE from "three";
import { useDebouncedCallback } from "use-debounce";

const TextEditor = () => {
  const stageRef = useRef(null);
  const snap = useSnapshot(state);

  const debouncedUpdateTexture = useDebouncedCallback((uri) => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(uri, (texture) => {
      texture.needsUpdate = true;
      state.textTexture = texture;
    });
  }, 300);

  // // Perbarui tekstur teks setiap kali properti teks berubah
  // useEffect(() => {
  //   const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
  //   debouncedUpdateTexture(uri);
  // }, [snap.textContent, snap.textFontSize, snap.textFontFamily, snap.textFontStyle, snap.textFill, debouncedUpdateTexture.callback, debouncedUpdateTexture]);

  // // Handle perubahan properti teks
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   state[name] = value;
  // };

  // // Toggle gaya teks (bold, italic)
  // const toggleStyle = (style) => {
  //   if (state.textFontStyle.includes(style)) {
  //     state.textFontStyle = state.textFontStyle.replace(style, "").trim();
  //   } else {
  //     state.textFontStyle = `${state.textFontStyle} ${style}`.trim();
  //   }
  // };

  return (
    <div>
      hja
      {/* Kontrol untuk properti teks */}
      {/* <div>
        <input
          type="text"
          name="textContent"
          value={snap.textContent}
          onChange={handleChange}
          placeholder="Masukkan teks"
        />
        <input
          type="color"
          name="textFill"
          value={snap.textFill}
          onChange={handleChange}
        />
        <select
          name="textFontFamily"
          value={snap.textFontFamily}
          onChange={handleChange}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          
        </select>
        <button onClick={() => toggleStyle("bold")}>
          {snap.textFontStyle.includes("bold") ? "Normal" : "Tebal"}
        </button>
        <button onClick={() => toggleStyle("italic")}>
          {snap.textFontStyle.includes("italic") ? "Normal" : "Miring"}
        </button>
        
      </div> */}
      {/* Konva Stage */}
      {/* <Stage width={500} height={500} ref={stageRef}>
        <Layer>
          <Text
            text={snap.textContent}
            fontSize={snap.textFontSize}
            fontFamily={snap.textFontFamily}
            fontStyle={snap.textFontStyle}
            fill={snap.textFill}
            x={250}
            y={250}
            offsetX={250}
            offsetY={250}
            draggable
            onDragEnd={(e) => {
              // Perbarui posisi jika diperlukan
              state.textX = e.target.x();
              state.textY = e.target.y();
            }}
            // Handle transform jika diperlukan
          />
        </Layer>
      </Stage> */}
    </div>
  );
};

export default TextEditor;
