/* eslint-disable react/prop-types */
import CustomButton from "./CustomButton";
import { useSnapshot } from "valtio";
import state from "../store";
import { getContrastingColor } from "../config/helpers";
import { MdDelete } from "react-icons/md";
import TextEditor from "./TextEditor";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

const FilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state);

  const [activeControl, setActiveControl] = useState(state.showControl);

  const generateStyle = (type) => {
    return {
      backgroundColor: snap.color,
      color: getContrastingColor(snap.color),
    };
  };

  const handleOnchange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    readFile("logo", selectedFile);
    state.isLogoTexture = true;
  };

  const handleResetFile = () => {
    setFile("");
    state.isLogoTexture = false;
    state.isFullTexture = false;
  };

  const handleShowControl = () => {
    state.showControl = !state.showControl;
    setActiveControl(state.showControl);
  };

  return (
    <>
      <div
        style={generateStyle()}
        className="rounded-md p-2 text-xs my-4 text-truncate flex items-center justify-between"
      >
        {file === "" ? "No file selected" : file.name}
        {file !== "" && (
          <>
            <MdDelete
              onClick={() => handleResetFile()}
              className="h-4 w-4 cursor-pointer"
            />
          </>
        )}
      </div>
      <div className="flex-1 flex justify-center items-center flex-col min-h-full">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => handleOnchange(e)}
        />
        <label
          htmlFor="file-upload"
          className="filepicker-label mt-4"
          style={generateStyle()}
        >
          Upload File
        </label>
      </div>
      <div>
        <CustomButton
          icon={<IoIosSettings />}
          type={activeControl ? "filled" : "outline"}
          customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          handleClick={() => handleShowControl()}
        />
      </div>
    </>
  );
};

export default FilePicker;
