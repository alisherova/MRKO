import React, { useContext, useRef, useEffect } from 'react'
import { v4 } from "uuid"; 
import { MainCtx } from '../contexts/MainContext'; 

function Details({ form, selectoption}) {
  const { isDetailed, setIsDetailed, details } = useContext(MainCtx); 
  const detailsRef = useRef() 

  useEffect(() => {
    const clickOutsideContent = (e) => {
      if (e.target === detailsRef.current) {
        setIsDetailed(false);
      }
    };
    window.addEventListener("click", clickOutsideContent);
    return () => {
      window.removeEventListener("click", clickOutsideContent);
    };
  }, []);

  return ( 
    <div ref={detailsRef} className={isDetailed ? 'block modal active fixed top-0 left-0 z-10 w-full h-screen overflow-auto' : 'hidden'}> 
        <div className="relative mt-60 flex flex-col justify-center overflow-hidden w-full p-6 my-8 m-auto bg-slate-200 text-black  rounded-md ring-2 ring-indigo-600 lg:max-w-xl">
        <div className='flex justify-end'>
        <span onClick={() => setIsDetailed(false)} className="px-3.5 cursor-pointer w-10 text-3xl text-gray-500 hover:text-black">
            &times;
          </span>
        </div>
          <ul className=''>
            {form.map(item => {    
              return (
                <li className='mb-4 text-lg' key={v4()}>
                  <p><span className='font-semibold'>{item.title}</span>: {details[item.id] + ''}</p>
                </li>
              )
            })
            }
            {selectoption && <li><p><span className='font-semibold'>Status</span>: {details.status + ''}</p></li>}
          </ul>
        </div> 
    </div>
  )
}

export default Details