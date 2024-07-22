"use cleint";
import { useMenuContext } from "@/context/MenuContext";
import { HeartIcon, UserIcon, SearchIcon, ShoppingCartIcon, BarChart3, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobilePrimary from "../sidebars/MobilePrimary";
import Profile from "../sidebars/Profile";
import QuickCart from "../sidebars/quickCart";
import Wishlist from "../sidebars/Wishlist";
import { drawers, drawerState } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthProvider";
import { Suspense, use, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion"
import { stat } from "fs";
import User from "@/models/User";
import useWindowResize, { Viewport } from "@/utils/useWindowResize";
import { ShoppingBagIcon, Bars3Icon } from "@heroicons/react/24/outline";

const Header = () => {

    const menuState = useMenuContext()
    const auth = useAuth()
    const [isOpen, toggleNav] = useState(false)
    const window = useWindowResize()
    const headerRef = useRef<HTMLDivElement>(null)
    // var rect = null;
    // if (headerRef.current) {
    //     rect = headerRef.current!.getBoundingClientRect();
    // }



    const [menuHeight, setMenuHeight] = useState<string>("0px")

    const classifyMenuHeight = (viewport: Viewport) => {
        switch (viewport) {
            case Viewport.MOBILE:
                setMenuHeight(`${window.windowSize.height - 64 - 64 - 5}px`);
                break;
            case Viewport.TABLET:
                setMenuHeight(`70vh`);
                break;
            case Viewport.SMALL_DESKTOP:
                setMenuHeight('60vh')
                break;
            case Viewport.LARGE_DESKTOP:
                // Handle large desktop viewport height
                //72
                setMenuHeight('65vh')
                break;
            case Viewport.EXTRA_LARGE_DESKTOP:
                // Handle extra large desktop viewport height
                //72
                setMenuHeight('70vh')
                break;
            default:

                setMenuHeight('100vh')
                break;
        }
    };

    useEffect(() => {
        if (window.viewport) {
            classifyMenuHeight(window.viewport)
        }
    }, [window.windowSize.height, window.viewport, window.windowSize.width])

    const toggleMenu = () => {
        if (window.viewport != Viewport.MOBILE) {
            toggleNav(false)
        }
    }



    return (
        <>
            <motion.div className="z-10 w-full"
                initial={{ opacity: 0, y: -20 }} // Initial opacity set to 0 and slight upward y translation
                animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y translation 0
                transition={{ duration: 2 }} // Animation duration

                ref={headerRef}>
                <div className="bg-lightBackground rounded-tr-xl rounded-tl-xl pt-0">
                    <div className="Primary-menu flex items-center justify-between mx-auto
                 rounded-xl md:p-4 lg:p-4 xlg:p-4 p-4 pt-2 pb-2">

                        <Bars3Icon className="md:hidden lg:hidden xlg:hidden flex text-textGray w-[30px]"
                            onClick={() => {
                                toggleNav(pv => !pv)
                            }}
                        />
                        <div className="cursor-pointer hidden md:flex lg:flex xlg:flex left-side  items-center space-x-8">
                            <h4 className="font-bold text-textGray"
                                onClick={() => {
                                    toggleNav(pv => !pv)
                                }}>SHOP
                            </h4>
                            <h4 className="font-bold text-textGray"
                                onClick={toggleMenu}> ABOUT
                            </h4>
                            <h4 className="font-bold text-textGray"
                                onClick={toggleMenu}>SEARCH
                            </h4>
                        </div>

                        <Link href="/" className="relative flex items-center justify-center flex-grow ml-14 lg:ml-0 xlg:ml-0 md:ml-0">
                            <h1 className={`text-5xl text-textGray font-bold italic`}>Elyra.</h1>
                        </Link>
                        <div className="right-side flex items-center space-x-2">
                            <QuickCart />
                            <Profile />
                            {auth.isAppReady ? <AccountBox /> : <SkeletonCard />}
                            {/* {menuItem("Lists &", "Wishlist", drawers.wishlist)} */}
                            {cart(67.9)}
                        </div>

                    </div>
                </div>


                <motion.div
                    className="bg-lightBackground absolute w-full z-10 rounded-br-lg rounded-bl-lg overflow-x-auto"
                    initial={isOpen ? { height: '0px' } : {}}
                    animate={{
                        height: isOpen ? `${menuHeight}` : '0px'
                    }}
                    transition={{ duration: 0.5 }}
                    onMouseLeave={toggleMenu}
                >
                    <div className={`${isOpen ? 'visible' : 'hidden'} p-8`}>
{/* 
                        <h1 className="p-1">Fatima Love ❤️ </h1>
                        <h1 className="p-1">Fatima Love ❤️ </h1>

                        <h1 className="p-1">Fatima Love ❤️ </h1>

                        <h1 className="p-1">Fatima Love ❤️ </h1>

                        <h1 className="p-1">Fatima Love ❤️ </h1>

                        <h1 className="p-1">Fatima Love ❤️ </h1> */}

                    </div>
                </motion.div >
            </motion.div >
        </>
    );
    // function menuItem(heading: string, subHeading: string, type: drawers): React.JSX.Element {

    //     return (

    //         <div className='flex justify-center items-center md:ml-4 md:mr-2' onClick={() => { menuState.toggleDrawer(type) }}>

    //             <div className='flex justify-center items-center border bg-gray-100 hover:border-gray-900 
    //             cursor-pointer h-10 mr-2 w-10 rounded-full mt-2 '>
    //                 {type === 'wishlist' ? (
    //                     <HeartIcon className="h-5 w-5" aria-hidden="true" />
    //                 ) : (
    //                     <UserIcon className="h-5 w-5" aria-hidden="true" />
    //                 )}
    //             </div>

    //             <div className='hidden md:block text-left cursor-pointer'>
    //                 <h5 className="font-bold">{heading}</h5>
    //                 <h5>{subHeading}</h5>
    //             </div>
    //         </div>

    //     )
    // }
    function cart(total: number): React.JSX.Element {


        return (
            <div onClick={() => { menuState.toggleDrawer(drawers.cart) }} className='cursor-pointer'>


                <div className="relative mt-3 lg:hidden md:hidden xlg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.3 19.3" width="24" height="24" className="text-textGray ">
                        <path className="h-18 w-18 text-textGray" style={{ fill: "#67645E" }} d="M20.4,0.2c-0.5-0.1-1.1,0.2-1.2,0.7l-2.9,11.2h-7l-2.5-12H1.1c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.1l2.5,12  h10.2l3.3-12.8C21.3,0.8,20.9,0.3,20.4,0.2z M10.1,17.6c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5  C9.5,16.1,10.1,16.8,10.1,17.6z M16.6,19.1c0.8,0,1.5-0.7,1.5-1.5s-0.7-1.5-1.5-1.5c-0.8,0-1.5,0.7-1.5,1.5S15.8,19.1,16.6,19.1z"></path>
                    </svg>
                    <small className="text-textGray text-center absolute  flex justify-center items-center  left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full top-[5px] ml-[2px] text-[12px]">0</small>
                </div>


                <div className='justify-center items-center hidden md:flex lg:flex xlg:flex ml-4'>
                    <h5 className="font-bold text-textGray">CART</h5>
                    <h5 className="text-textGray">(2)</h5>
                </div>

            </div>
        );
    }

    function browser(): React.JSX.Element {

        return (
            <div className='md:hidden flex justify-center items-center cursor-pointer rounded-full border
             bg-gray-100 hover:border-gray-900 h-10 mr-2 mt-2 md:ml-4 w-[120px]'>
                <div className='flex justify-center items-center'>
                    <BarChart3 className="h-6 w-6 ml-4" aria-hidden="true" />
                </div>
                <div className='text-left pr-4 cursor-pointer ml-2'>
                    <h1>
                        Browser
                    </h1>
                </div>
            </div>
        );
    }
}


export function AccountBox(): React.JSX.Element {

    const user = useAuth().user

    const menuState = useMenuContext()
    let heading = "Login or Signup"
    let subHeading = "My Account"
    let icon = <UserIcon className="h-5 w-5 text-textGray" aria-hidden="true"
    />

    if (user.firstName !== undefined) {

        icon = (
            <div className={`h-5 w-5 flex justify-center items-center font-bold  text-textGray`} aria-hidden="true">
                {user.firstName.substring(0, 2).toUpperCase()}
            </div>
        );

        heading = user.lastName !== undefined ? `Hi ${user.firstName} ${user.lastName}` : `Hi ${user.firstName} `
    }

    return (

        <div className='flex justify-center items-center md:ml-4 md:mr-2' onClick={() => { menuState.toggleDrawer(drawers.profile) }}>
            <div className={` ${user.firstName != undefined ? "bg-darkBackground" : "bg-gray-100"} flex justify-center items-center border bg-gray-100 hover:border-gray-900 
            cursor-pointer h-10 pr-0 mr-0 lg:mr-2 md:mr-2 w-10 rounded-full mt-2`}>
                {icon}
            </div>
            <div className='hidden md:block text-left cursor-pointer'>

                <h5 className="font-bold text-textGray">{heading}</h5>
                <h5 className="text-textGray">{subHeading}</h5>
            </div>
        </div>

    )
}

export function SkeletonCard() {
    return (
        <div className="flex justify-center items-center">
            <Skeleton className=" h-10 mr-2 w-10 rounded-full mt-2" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </div>
    )
}

export default Header;