"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import React, { useEffect, useState } from "react";
import { GiStoneSphere } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Cookies from "js-cookie";
import Image from "next/image";
const page = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [pic, setPic] = useState("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=");
  const { data: session } = useSession();

  if (session) {
    console.log("bbbbb is ", session);
   let email = session.user.email;
    
   async function getPic(){
      const response = await fetch("/api/getProfilePic", {
        method: "PATCH",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      // setPic(data)
      console.log('data is ',data)
    }
    getPic()
    
    // return null; // Prevent rendering while redirecting
  }
  
  if (Cookies.get("email") != undefined) {
    let email = Cookies.get("email");
    async function getPic(){
      const response = await fetch("/api/getProfilePic", {
        method: "PUT",
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      // setPic(data)
      console.log('data is ',data)
    }
    getPic()
  }


  // useEffect(() => {
  //   const getNotes = async () => {
  //     try {
  //       const response = await fetch("/api/getProfilePic", {
  //         method: "PUT",
  //         body: JSON.stringify({ email }),
  //       });
  //       const data = await response.json();
  //       console.log('data is ',data)
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   };
  //   getNotes();
  // }, [session]);

  function querySubmit(event) {
    event.preventDefault();
    console.log("q si ", query);
  }

  return (
    <div>
      <header class="text-gray-600 body-font bg-emerald-400">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <div
            className="flex justify-center cursor-pointer"
            onClick={() => {
              router.replace("/Home");
            }}
          >
            <p className="">
              <GiStoneSphere className="text-3xl text-red-600" />
            </p>
            <h1
              style={{ "font-family": " 'Whisper', cursive" }}
              className="text-2xl font-bold"
            >
              SocialSphere
            </h1>
          </div>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <form onSubmit={querySubmit}>
              <input
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search"
                className="w-[80%] bg-white rounded-lg border border-emerald-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-base outline-none text-gray-700 px-1 mr-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              <button>
                <FaSearch />
              </button>
            </form>
            <a class="mr-5 hover:text-gray-900">Fourth Link</a>
          <img src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" alt="" />
          {/* <Image width={100} height={100} src={"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}></Image> */}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default page;
