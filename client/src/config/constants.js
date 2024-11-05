import { swatch, fileIcon, logoShirt, stylishShirt } from "../assets";
import { RiTShirtAirFill } from "react-icons/ri";
import { IoShirt } from "react-icons/io5";
import { color } from "framer-motion";

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: IoShirt,
    color: "text-blue-500",
  },
  {
    name: "stylishShirt",
    icon: RiTShirtAirFill,
    color: "text-orange-500",
  },
];

export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
