// TextEditor.js
import { useRef, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import { useSnapshot } from "valtio";
import state from "../store";
import { useDebouncedCallback } from "use-debounce";
import { FaBold } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { FaItalic } from "react-icons/fa";

const TextEditor = () => {
  const stageRef = useRef(null);
  const snap = useSnapshot(state);

  // Debounced function to update data URL
  const debouncedUpdateDataUrl = useDebouncedCallback(() => {
    if (stageRef.current) {
      const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
      state.textDataUrl = uri;
    }
  }, 300);

  // Update data URL whenever text properties change
  useEffect(() => {
    console.log(snap);
    debouncedUpdateDataUrl();
  }, [
    snap.textContent,
    snap.textFontSize,
    snap.textFontFamily,
    snap.textFontStyle,
    snap.textFill,
  ]);

  // Handle text property changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    state[name] = value;
  };

  // Toggle text styles (bold, italic)
  const toggleStyle = (style) => {
    if (snap.textFontStyle.includes(style)) {
      state.textFontStyle = snap.textFontStyle.replace(style, "").trim();
    } else {
      state.textFontStyle = `${snap.textFontStyle} ${style}`.trim();
    }
  };

  // Ukuran canvas tetap
  const canvasWidth = 500;
  const canvasHeight = 500;

  // Hitung faktor skala
  const maxTextWidth = canvasWidth * 0.9; // Berikan sedikit padding

  // Buat objek Text sementara untuk mengukur
  const tempText = new window.Konva.Text({
    text: snap.textContent,
    fontSize: snap.textFontSize,
    fontFamily: snap.textFontFamily,
    fontStyle: snap.textFontStyle,
  });
  const textWidth = tempText.width();
  const textHeight = tempText.height();

  // Sesuaikan skala jika teks melebihi canvas
  const scale = Math.min(
    maxTextWidth / textWidth || 1,
    canvasHeight / textHeight || 1,
    1
  );

  return (
    <div className="mt-4">
      {/* Controls for text properties */}
      <div className="flex gap-4 flex-col flex-start">
        <input
          type="text"
          name="textContent"
          value={snap.textContent}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <select
          name="textFontFamily"
          value={snap.textFontFamily}
          onChange={handleChange}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* Add more font options if needed */}
        </select>
        <div className="flex gap-2 items-center mb-8">
          <input
            type="color"
            name="textFill"
            value={snap.textFill}
            onChange={handleChange}
          />
          <div>
            <CustomButton
              icon={<FaBold />}
              type={snap.textFontStyle.includes("bold") ? "filled" : "outline"}
              title={snap.textFontStyle.includes("bold") ? "Normal" : "Bold"}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => toggleStyle("bold")}
            />
          </div>
          <div>
            <CustomButton
              icon={<FaItalic />}
              type={
                snap.textFontStyle.includes("italic") ? "filled" : "outline"
              }
              title={
                snap.textFontStyle.includes("italic") ? "Normal" : "Italic"
              }
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => toggleStyle("italic")}
            />
          </div>
        </div>
        {/* Add other controls if needed */}
      </div>
      {/* Konva Stage */}
      <Stage
        width={450}
        height={350}
        ref={stageRef}
        className="glassmorphism p-2 rounded-md"
      >
        <Layer>
          <Text
            text={snap.textContent}
            fontSize={snap.textFontSize}
            fontFamily={snap.textFontFamily}
            fontStyle={snap.textFontStyle}
            fill={snap.textFill}
            // x={canvasWidth / 2}
            // y={canvasHeight / 2}
            // offsetX={canvasWidth / 2}
            // offsetY={canvasHeight / 2}
            align="center"
            verticalAlign="middle"
            scaleX={scale}
            scaleY={scale}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default TextEditor;
