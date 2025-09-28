import { useState } from "react";
import axios from "axios";


const UseAuthHooks = () => {
  async function signIn(data1) {
    try {
      const data = await axios.post("http://localhost:3002/api/v1/users/login", data1, {
        withCredentials: true
      })
      
      
      window.localStorage.setItem("accessToken",data?.data?.data?.accessToken)
      return { data: data?.data, success: true }
    } catch (error) {
      console.log("error occured while signin")
      return { success: false, message: error?.message }
    }

  }

  async function signUp(data1) {
    try {
      const data = await axios.post("http://localhost:3002/api/v1/users/register", data1, {
        withCredentials: true
      })
      return { success: true, data: data?.data }
    } catch (error) {
      console.log("error occured while signup");
      return { success: false, message: error?.message }
    }


  }
  async function signOut(data1) {
    try {
      const data = await axios.post("http://localhost:3002/api/v1/users/logout", data1, {
        withCredentials: true
      })
      return { message: data?.message,success:true }

    } catch (error) {
      return { error: error,success:false }
    }
  }
  return { signIn, signUp,signOut }

}
export default UseAuthHooks