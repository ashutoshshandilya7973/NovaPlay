import { useEffect, useMemo, useState } from "react";

function useScreenSize(){
    const [screenSize,setScreenSize]=useState(window.innerWidth)
    useEffect(()=>{
         const handleSize=()=>{
            setScreenSize(window.innerWidth)
         }
        window.addEventListener("resize",handleSize)

        return ()=>{
            window.removeEventListener("resize",handleSize)
        }

    },[])

    const isMobile=useMemo(()=>{
        if(screenSize<640) return true
        return false;
    },[screenSize])

    return {isMobile}
}
export default useScreenSize