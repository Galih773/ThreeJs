import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { IoDownload } from "react-icons/io5";
import { HiMiniSquare3Stack3D } from "react-icons/hi2";
import { IoShirt } from "react-icons/io5";
import { FaHatCowboy } from "react-icons/fa";
import { IoBag } from "react-icons/io5";

import {
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
  CustomizerBox,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeProductModal, setActiveProductModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const editorTabRef = useRef(null);

  // Closes the tab if clicked out
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editorTabRef.current &&
        !editorTabRef.current.contains(event.target)
      ) {
        setActiveEditorTab("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // show tab content depending on the activeTab, or close it if clicked again
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  // Handles click on tab: opens tab or closes it if clicked again
  const handleTabClick = (tabName) => {
    setActiveEditorTab((prevTab) => (prevTab === tabName ? "" : tabName)); // Toggle tab
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => ({
      ...prevState,
      [tabName]: !prevState[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const handleIntro = () => {
    state.intro = true;
    state.showControl = false;
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Go back button */}
          <motion.div
            className="absolute z-10 top-5 right-48"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => handleIntro()}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="absolute z-10 right-48 top-1/2 transform -translate-y-1/2"
            {...fadeAnimation}
          >
            <CustomizerBox />
          </motion.div>

          {/* filter tabs */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

            <button
              className="download-btn"
              onClick={() => {
                state.showControl = false;
                setTimeout(() => downloadCanvasToImage(), 100);
              }}
            >
              <IoDownload className="w-3/5 h-3/5 object-contain text-green-500" />
            </button>
          </motion.div>

          {/* modal 3d models */}
          <motion.div
            className="modalproduct-container"
            {...slideAnimation("down")}
          >
            <button
              className={
                !activeProductModal ? "download-btn" : "download-btn-active"
              }
              onClick={() => {
                setActiveProductModal(!activeProductModal);
              }}
            >
              <HiMiniSquare3Stack3D className="w-3/5 h-3/5 object-contain text-green-500" />
            </button>
          </motion.div>
          {activeProductModal && (
            <motion.div
              className="product-container"
              {...slideAnimation("left")}
            >
              <button
                className="download-btn"
                onClick={() => {
                  state.modelActive = "shirt";
                }}
              >
                <IoShirt className="w-3/5 h-3/5 object-contain text-white" />
              </button>
              <button
                className="download-btn"
                onClick={() => {
                  state.modelActive = "coming-soon";
                }}
              >
                <FaHatCowboy className="w-3/5 h-3/5 object-contain text-white" />
              </button>
              <button
                className="download-btn"
                onClick={() => {
                  state.modelActive = "coming-soon";
                }}
              >
                <IoBag className="w-3/5 h-3/5 object-contain text-white" />
              </button>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
