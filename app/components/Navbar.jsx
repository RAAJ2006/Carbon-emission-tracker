"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Redirect based on session status
  useEffect(() => {
    if (session) {
      if (router.pathname === '/login') {
        router.push('/dashboard');
      }
    } else {
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [session, router]);

  return (
    <nav className='bg-slate-900 cursor-pointer -0 px-8 py-4 mx-10 mt-10 mb-6 flex flex-row justify-between rounded-lg hover:shadow-[0px_0px_16px_#111216] transform hover:scale-105 transition duration-300 ease-in-out'>
      <div className='flex flex-row gap-3'>
        <div className='font-sans text-gray-200 flex gap-5 justify-center items-center'>
          {session ? (
            <>
              Signed in as {session.user.email}
              <img
                src={session.user.image || "https://media.giphy.com/media/X2PpSf1bklVVeazQ3l/giphy.gif"}
                alt="User avatar"
                className="w-12 h-12 rounded-full border-2"
              />
            </>
          ) : (
            <>
              Carbon Emission Tracker
              <img
                src="https://media.giphy.com/media/X2PpSf1bklVVeazQ3l/giphy.gif"
                alt="Loading animation"
                className="w-12 h-12 rounded-full border-2"
              />
            </>
          )}
        </div>
      </div>
      <div className='flex items-center'>
        {session ? (
          <div className='flex flex-row gap-7'>
            <div className="relative inline-block text-left mr-24 items-center" ref={dropdownRef}>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='font-sans text-white  pt-2'
              >
                <div className='flex flex-row gap-1'>
                Our Services
                <img
                  src="https://www.svgrepo.com/show/325433/nav-arrow-down.svg"
                  alt="Arrow Down Icon"
                  className="w-11 h-6 rounded-full mb-3 bg-transparent "
                /></div>
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 w-96 origin-top-right rounded-md shadow-lg bg-black dark:text-neutral-200 ring-1 ring-black ring-opacity-5">
                  <div className="py-1 flex flex-col">
                    <a
                      onClick={() => router.push("/emissions/electricalemission")}
                      className='py-2 px-3 text-white hover:bg-[#616467] hover:text-white cursor-pointer'
                    >
                      Carbon Emission from Power Usage (USA, Canada, Europe)
                    </a>
                    <a
                      onClick={() => router.push("/emissions/vehicle-emission")}
                      className='py-2 px-3 text-white hover:bg-[#616467] hover:text-white cursor-pointer'
                    >
                      Carbon Emission from Vehicles
                    </a>
                    <a
                      onClick={() => router.push("/emissions/fossil-fuel-emission")}
                      className='py-2 px-3 text-white hover:bg-[#616467] hover:text-white cursor-pointer'
                    >
                      Fossil Fuel Emissions
                    </a>
                    <a
                      onClick={() => router.push("/emissions/flight")}
                      className='py-2 px-3 text-white hover:bg-[#616467] hover:text-white cursor-pointer'
                    >
                      Carbon Emission due to Airplanes
                    </a>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => router.push('/dashboard')} className='font-sans text-white'>
              Dashboard
            </button>
            <button
              onClick={() => signOut()}
              className='text-white font-sans'
            >
              Sign out
            </button>
          </div>
        ) : (
          <ul className='flex gap-6'>
            <li className='font-sans text-gray-200'>
              <Link href="/">Home</Link>
            </li>
            <li className='font-sans text-gray-300'>
              <Link href="/about">About Us</Link>
            </li>
            <li className='font-sans text-gray-200'>
              <button
                onClick={() => router.push("/login")}
                className='text-gray-200 font-sans'
              >
                Sign in
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

