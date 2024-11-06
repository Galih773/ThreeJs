import { useState } from "react";
import CustomButton from "./CustomButton";
import ColorPicker from "./ColorPicker";
import FilePicker from "./FilePicker";
import { reader } from "../config/helpers";
import { DecalTypes } from "../config/constants";
import state from "../store";
import { IoMdColorFill } from "react-icons/io";
import { FaImage } from "react-icons/fa";
import { MdOutlineTextFields } from "react-icons/md";
import TextEditor from "./TextEditor";

const CustomizerBox = () => {
  const [activeEditorTab, setActiveEditorTab] = useState("colorpicker");
  const [file, setFile] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "textpicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;
  };

  const readFile = (type, selectedFile) => {
    reader(selectedFile).then((result) => {
      handleDecals(type, result);
    });
  };

  return (
    <div className="glassmorphism p-5 rounded-4 min-w-[500px] min-h-[350px] h-full flex flex-col">
      <div className="flex gap-3 items-center">
        <CustomButton
          icon={<IoMdColorFill />}
          type={activeEditorTab === "colorpicker" ? "filled" : "outline"}
          title="Add Colors"
          customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          handleClick={() => setActiveEditorTab("colorpicker")}
        />
        <CustomButton
          icon={<FaImage />}
          type={activeEditorTab === "filepicker" ? "filled" : "outline"}
          title="Add Image"
          customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          handleClick={() => setActiveEditorTab("filepicker")}
        />
        <CustomButton
          icon={<MdOutlineTextFields />}
          type={activeEditorTab === "textpicker" ? "filled" : "outline"}
          title="Add Text"
          customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          handleClick={() => setActiveEditorTab("textpicker")}
        />
      </div>
      <div className="flex flex-1 flex-col">{generateTabContent()}</div>
      {/* <TextEditor /> */}
    </div>
  );
};

export default CustomizerBox;
