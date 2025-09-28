import React, { useEffect, useState } from "react";
import {Card,CardHeader,CardContent,CardTitle,CardFooter} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import  useAuthHooks  from "../hooks/useAuthHooks";
import { useNavigate } from "react-router";
const AuthComponent = ({ value }) => {
  const [authState, setAuthState] = useState(value);
  const {register,handleSubmit,reset,formState: { errors } } = useForm();
  const { signIn,signUp } = useAuthHooks();
  const navigate=useNavigate()
  async function onSubmit(data1){
       if(authState==="signup"){
          const {success,message,data}=await signUp(data1)
          if(success){
             reset()
             setAuthState("login")
          }else{
             alert("error while signup",message);

          }
       }else{
          const {success,message,data}=await signIn(data1)
          if(success){
            reset()
            navigate("/home")
          }else{
            alert("error while login",message)
          }
       }
  }

 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className=" w-[90%] md:w-[30%] m-auto mt-20">
        <CardHeader>
          <CardTitle className="flex flex-col gap-2">
            <div className="text-center text-2xl">
              {authState === "login" ? "Welcome back" : "Create your account"}
            </div>
            <p className="text-center">
              {authState === "login"
                ? "Sign in to your account to continue"
                : "Join the community and start watching"}
            </p>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-2.5 mt-5">
          {authState !== "login" ? (
            <div className="flex flex-col gap-2.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Enter your Full name"
                
              />
            </div>
          ) : (
            ""
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: true })}
            placeholder="Enter your password"
          />
          <Link className="text-purple-700 text-[14px]">Forget password?</Link>
        </CardContent>
        <CardFooter className="flex-col gap-2.5">
          <Button
            className="w-full bg-purple-700 hover:bg-purple-500"
            type="submit"
          >
            {authState === "login" ? "Sign In" : "Create Account"}
          </Button>
          <div className="">
            {authState === "login" ? (
              <div className="">
                <p>
                  Dont have an account?
                  <span
                    className="text-purple-700 cursor-pointer"
                    onClick={() => setAuthState("signup")}
                  >
                    {" "}
                    Sign up
                  </span>
                </p>
              </div>
            ) : (
              <div className="">
                <p>
                  Already have an account?
                  <span
                    className="text-purple-700 cursor-pointer"
                    onClick={() => setAuthState("login")}
                  >
                    {" "}
                    Sign In
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default AuthComponent;
