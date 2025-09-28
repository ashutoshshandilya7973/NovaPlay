import React, { useEffect, useRef,useState } from "react";
import useScreenSize from "../../hooks/useScreenSize";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import UseAuthHooks from "../../hooks/useAuthHooks";
import { useNavigate } from "react-router";
const MainLayout = ({ children }) => {
  const { isMobile } = useScreenSize();
  const { signOut } = UseAuthHooks();
    const [open, setOpen] = useState(false);
  
  const navigate=useNavigate()

  async function signOutUser() {
    const { message, error,success } = await signOut();
    if(success){
      console.log(message)
      navigate('/')
    }else{
      alert("error occurs while signout")
    }

  }
  const navref=useRef()

  //this is for the navbar side popup open and close
  useEffect(()=>{
    function clickPopUp(e){
          if (navref.current && !navref.current.contains(e.target)) {
           setOpen(false);
    }
    }
    window.addEventListener("click",clickPopUp)
    return ()=>{
        window.removeEventListener("click",clickPopUp)
    }
  },[])

  //this is for the navar last components 
  const navItem = [{ title: "Signout", fn: signOutUser }];
  return (
    <div className="">
      <Navbar navItem={navItem} customRef={navref} open={open} setOpen={setOpen}/>

      {!isMobile && <SideBar />}
      <div className="">{children}</div>
    </div>
  );
};

export default MainLayout;
