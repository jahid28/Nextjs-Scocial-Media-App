"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { GiStoneSphere } from "react-icons/gi";
import LoadingBar from "react-top-loading-bar";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import { Jwt } from "jsonwebtoken";

import React, { useState, useRef } from "react";

const page = () => {
  
  const router=useRouter()
  const { data: session } = useSession();

if (session) {
  console.log('google is ',session)
    router.replace("/Home");
    // return null; // Prevent rendering while redirecting
  }

  if(Cookies.get('email')!=undefined){
    console.log('yes')
    router.replace("/Home");

  }
  else{
    console.log('no')
  }

  const { register, handleSubmit } = useForm();

  const ref = useRef(null);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function login() {
    ref.current.continuousStart();

    const response = await fetch("/api/normal_user", {
      method: "PUT",
      body: JSON.stringify({ email, pass }),
    });

    const data = await response.json();
    // console.log("data is ", data);
    if(data.msg=="incorrect"){
      toast.error("Details are incorrect.",{
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      })
    }
    else if(data.msg=="correct"){
      toast.success("LogIn successful",{
        position: toast.POSITION.TOP_CENTER,
        theme: "colored"
      })
      Cookies.set("email", email, { expires: 7 })

      router.replace("/Home")

    }

    ref.current.complete();

    // if (response.ok) {
    //   ref.current.complete()
    // }
  }
  // const  data  = useSession();
  // const router = useRouter();

  return (
    <>
    <div className="flex mt-8 justify-center">
    <p className="">
<GiStoneSphere className="text-5xl text-red-600"/>
    </p>
      <h1 style={{"font-family":" 'Whisper', cursive"}} className="text-4xl font-bold">SocialSphere</h1>
    </div>
      
      
      <LoadingBar color="#5CDB95" ref={ref} />


      <div className="grid place-items-center w-[100vw] h-[80vh]">
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-24 mx-auto flex">
            <div className=" bg-white rounded-lg p-8 flex flex-col md:ml-auto w-[30vw] mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-sky-900 text-3xl mb-5 font-medium title-font">
                Login to continue
              </h2>

              <form onSubmit={handleSubmit(login)}>
                <div className="relative mb-4">
                  <label
                    for="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="relative mb-4">
                  <label
                    for="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    required
                    onChange={(event) => setPass(event.target.value)}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button className="text-white w-full bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg">
                  Submit
                </button>
              </form>
              <br />
              <p className="text-lg text-center">OR</p>
              <br />

              <button
                onClick={() => {
                  signIn("google");
                }}
                className="text-white justify-center flex bg-emerald-500 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-700 rounded text-lg"
              >
                <p className="mt-1.5 mr-4">
                  <FaGoogle />
                </p>
                Login through Google
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
