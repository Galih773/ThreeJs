import { useSnapshot } from "valtio";
import { SketchPicker } from "react-color";
import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="pt-4">
      <SketchPicker
        color={snap.color}
        disableAlpha
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
