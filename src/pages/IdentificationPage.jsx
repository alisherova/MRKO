import React from "react";
import {  Outlet } from "react-router-dom";
import IdentificationBg from "../assets/download.jpg"; 

function IdentificationPage() {
  return (
    <div className='flex h-screen '>
      <div className='w-6/12 md:block hidden'>
        <img className='h-screen' src={IdentificationBg} alt='bg' />
      </div>
      <Outlet /> 
    </div>
  );
}

export default IdentificationPage;
