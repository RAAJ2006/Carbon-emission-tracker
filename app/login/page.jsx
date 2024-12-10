"use client"
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

import { useRouter } from 'next/navigation';

const Page = () => {
  const {data:session}=useSession()
  const router=useRouter()
  useEffect(()=>{
    if(session){
      router.push("/dashboard")
    }
  },[session])
  return (
    <div className="flex justify-center items-center mt-40">
    
      <button className="flex items-center shadow-[inset_0_0_0_2px_#616467] text-black pl-6 pr-6 py-3 rounded-lg tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200" onClick={()=>{signIn("github")}}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="Github logo"
          className="w-15 h-11 mr-5 rounded-lg " // Adjust size as needed
        />
        Sign in with GitHub
      </button>
      
    </div>
  );
};

export default Page;

