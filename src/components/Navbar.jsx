import React, { con, useState } from "react";
import { Transition } from "@headlessui/react";
import { FiLogOut } from "react-icons/fi";
import user from "../assets/user.png";
import Toggle from "./Toggle";
import { useNavigate, NavLink } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        const confirmation = window.confirm("Are you sure?");
        if (confirmation) {
            localStorage.clear();
            navigate('login')
        }
    }

    const activeLink = "bg-gray-700 nav_desktop_item";
    const normalLink = "nav_desktop_item";

    return (
        <nav className='bg-slate-100 dark:bg-gray-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='md:block flex justify-between py-1'>
                    <div className='flex items-center justify-between'>
                        <div className='flex-shrink-0'>
                            <img
                                className='h-8 w-8'
                                src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                                alt='Workflow'
                            />
                        </div>
                        <div className='hidden md:block'>
                            <div className='ml-10 flex items-center space-x-4'>
                                <ul className="flex">
                                    <li>
                                        <NavLink to='/loads'
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                                            Yuklar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/clients'
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}> 
                                            Mijozlar
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/employee'
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}> 
                                            Ishchilar
                                        </NavLink>
                                    </li>
                                    <li className="">
                                        <NavLink to='/products'
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}> 
                                            Mahsulotlar
                                        </NavLink>
                                    </li>
                                    <li className="">
                                        <NavLink to='/market'
                                            className={({ isActive }) => (isActive ? activeLink : normalLink)}> 
                                            Bozor
                                        </NavLink>
                                    </li>
                                </ul>

                                <div className="group">
                                    <div>
                                        <img className='h-6 w-6' src={user} alt={"asd"} />
                                    </div>
                                    <div className="hidden group-hover:block absolute z-50 bg-slate-800  rounded-md border">
                                        <a
                                            href='#'
                                            className='text-black dark:text-gray-300 nav_desktop_item'
                                        >
                                            Mening sahifam
                                        </a>

                                        <button
                                            onClick={handleLogout}
                                            className=' text-red-400 w-full nav_desktop_item'
                                        >
                                            <FiLogOut />Chiqish
                                        </button>
                                    </div>
                                </div>

                                <a
                                    className='text-black dark:text-gray-300 nav_desktop_item'
                                >
                                    <Toggle />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='-mr-2 flex md:hidden'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type='button'
                            className='burger_menu'
                            aria-controls='mobile-menu'
                            aria-expanded='false'
                        >
                            <span className='sr-only'>Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M4 6h16M4 12h16M4 18h16'
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className='block h-6 w-6'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                    aria-hidden='true'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M6 18L18 6M6 6l12 12'
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>
            <Transition
                show={isOpen}
                enter='transition ease-out duration-100 transform'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='transition ease-in duration-75 transform'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
            >
                {(ref) => (
                    <div className='md:hidden bg-slate-200 dark:bg-gray-800' id='mobile-menu'>
                        <div ref={ref} className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                            <a
                                href='#'
                                className='inline-flex hover:text-white text-black dark:text-gray-300 nav_item'
                            >
                                <img className='h-6 w-6' src={user} /> My Profile
                            </a>

                            <a
                                href='#'
                                className='flex border w-1/5 border-red-400 text-red-400 nav_item'
                            >
                                <FiLogOut /> Log Out
                            </a>

                            <a
                                href='#'
                                className='text-gray-300 inline-block hover:text-white nav_item'
                            >
                                <Toggle />
                            </a>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
}

export default Navbar;
