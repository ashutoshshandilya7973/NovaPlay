import React from "react";
import { Input } from "./ui/input";
import logo from "../assets/logo.jpg";
import { Search } from "lucide-react";
import { useState } from "react";
const Navbar = ({ navItem ,customRef,open,setOpen}) => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-2.5 mx-10">
        <div className="">
          <img src={logo} alt="" className="w-12 h-10 rounded-md" />
        </div>
        <div className="relative w-80">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <Input
            placeholder="Search the video"
            className="pl-8 rounded-none w-full"
          />
        </div>

        <div
           ref={customRef}
          onClick={() => setOpen((prev) => !prev)}
          className="w-8 h-8 rounded-full border-black border-2 cursor-pointer relative flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
        >
          {/* Popover Menu */}
          {open && (
            <div
              
              onClick={(e) => e.stopPropagation()}
              className="absolute w-56 top-10 right-0 bg-white shadow-lg rounded-xl p-2 border border-gray-200 animate-in fade-in-0 zoom-in-95"
            >
              {navItem.map((item, index) => (
                <div
                  key={index}
                  onClick={item?.fn}
                  className="flex items-center p-2 text-[15px] font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-0.5 text-gray-900 border-b-2"></div>
    </div>
  );
};

export default Navbar;
