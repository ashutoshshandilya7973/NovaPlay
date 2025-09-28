import React from "react";
import { navbar } from "../constant/navbar";
import { icons } from "../constant/icons";

const SideBar = () => {
  return (
    <div className="flex items-start">
      <div className="w-[15%] flex flex-col gap-2 justify-center items-center mt-2.5 ">
        {navbar.map((nav, idx) => {
          const Icon = icons[nav.icons]; // Get the component by string key
          return (
            <div
              key={idx}
              className="w-[80%] flex items-center gap-5 border-2 border-gray-500 px-5 py-1.5 cursor-pointer"
            >
              <Icon />
              <span>{nav.name}</span>
            </div>
          );
        })}
      </div>
      <div className="w-[1px] h-screen text-gray-400 border-1 border-gray-300"></div>
    </div>
  );
};

export default SideBar;
