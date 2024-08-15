import React, { useEffect } from "react";
import { NavBarLink , NavBarDropDown, NavBarIcon} from "./NavBarLink";
import { Collapse, Dropdown, initTWE } from "tw-elements";
import logo from '../images/logo.png'

const Navbar = () => {
    useEffect(() => {
        initTWE({ Collapse, Dropdown})
    });

    return (
        <>
        <nav
        id="animated-navbar"
        className="bg-white lg:bg-transparent flex-no-wrap fixed top-0 z-10 flex w-full items-center justify-between py-2 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">

            <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-twe-collapse-init
            data-twe-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation">

            <span className="[&>svg]:w-7">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7">
                <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd" />
                </svg>
            </span>
            </button>


            <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-twe-collapse-item>

            <a
                className="mb-4 me-5 ms-2 mt-3 flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-900 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:mb-0 lg:mt-1 lg:px-2"
                href="https://asjscott.github.io/#">
                Alec Scott  
                <img
                src={logo}
                style={{height: "25px"}}
                alt="Logo"
                loading="lazy" />
             </a>

            <ul
                className="list-style-none me-auto flex flex-col ps-0 lg:flex-row"
                data-twe-navbar-nav-ref>
                
                <li
                className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0"
                data-twe-nav-item-ref
                data-twe-dropdown-ref>

                <a
                    className="flex items-center text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
                    href="https://asjscott.github.io/#projects"
                    type="button"
                    id="dropdownMenuButton2"
                    data-twe-dropdown-toggle-ref
                    aria-expanded="false">
                    Projects
                    <span className="ms-1 [&>svg]:w-5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd" />
                    </svg>
                    </span>
                </a>
                <ul
                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block dark:bg-surface-dark"
                    aria-labelledby="dropdownMenuButton1"
                    data-twe-dropdown-menu-ref>
                    <NavBarDropDown active to={"https://asjscott.github.io/#projects"}>View projects section</NavBarDropDown>
                    <NavBarDropDown disabled>Football score predictor</NavBarDropDown>
                    <NavBarDropDown active link={'/'}>React projects</NavBarDropDown>
                    <NavBarDropDown disabled>Trading Bot</NavBarDropDown>
                </ul>
                </li>
                <NavBarLink link="/calculator">Calculator</NavBarLink>
                <NavBarLink link="/pomodoro">Pomodoro</NavBarLink>
                <NavBarLink link="/drum_machine">Drum Machine</NavBarLink>
                <NavBarLink link="form">React Hook Form</NavBarLink>
            </ul>
            </div>


            <div id="navbar-icons" className="mobile-only:py-2 ps-2 lg:mb-0 lg:pe-1 lg:ps-0 relative flex items-center">
                <NavBarIcon link="https://www.linkedin.com/in/alec-scott-499670280/" logo="linkedin"></NavBarIcon>
                <NavBarIcon link="https://www.github.com/asjscott" logo="github"></NavBarIcon>
            </div>
        </div>
        </nav>
        </>
    )
}

export default Navbar