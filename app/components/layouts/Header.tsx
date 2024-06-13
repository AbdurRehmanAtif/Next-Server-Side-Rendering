"use cleint";
import { useMenuContext } from "@/context/MenuContext";
import Fonts from "@/models/fonts/Fonts";
import { HeartIcon, UserIcon, SearchIcon, ShoppingCartIcon, BarChart3, Sliders } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobilePrimary from "../sidebars/MobilePrimary";
import Profile from "../sidebars/Profile";
import QuickCart from "../sidebars/quickCart";
import Wishlist from "../sidebars/Wishlist";
import { drawers, drawerState } from "@/context/MenuContext";
import { useAuth } from "@/context/AuthProvider";
import { Suspense, use, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { stat } from "fs";
import User from "@/models/User";

const Header = () => {

    const menuState = useMenuContext()
    const auth = useAuth()
    { console.log("is updated? ", auth.isAppReady) }


    // const [user, setUser] = useState<User>(new User());

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const userData = await useAuth().auth.getUser();
    //         setUser(userData);
    //     };

    //     fetchUser();
    // }, []);
    // const [user] = useState<User>(auth.auth.getUser())

    // useEffect(() => {
    //     setIsLoggedIn(authState.isLoggedIn)
    // }, []);
    // const toggleDrawer = (type: string) => {
    //     console.log('toggleSlider called with type:', type);
    //     console.log(menuState.isSliderToggle[0])
    //     menuState.setSliderToggle(prevState => ({
    //         ...prevState,
    //         [0]: true,
    //     }));
    // };


    // const toggleSlider = () => {
    //     menuState.setSliderToggle(prevState => ({
    //         ...prevState,
    //         mobile: !prevState,
    //     }));
    // };

    return (


        <div className="flex items-center p-2 max-w-full mx-auto pt-4 pb-4" >
            {/* <MobilePrimary /> */}
            <QuickCart />
            <Profile />


            <Link href="/">
                {/* <Image
                    className="rounded-lg"
                    src="https://links.papareact.com/b3z"
                    width={40}
                    height={40}
                    alt="logo"
                /> */}
            </Link>
            <h1 className={` pl-2 pr-2 ${Fonts.largePlayfairDisplay()} font-THIN text-4xl`}>ELYRA</h1>
            {/* Search */}
            {/* SearchIcon */}

            <div className="flex-1" >

                <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
                    <SearchIcon className="h-4 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent flex-1 outline-none"
                    />
                </form>
            </div>

            <div className="flex items-center space-x-4 px-6 float-right">
                {auth.isAppReady ? <AccountBox /> : <SkeletonCard />}
                {menuItem("Lists &", "Wishlist", drawers.wishlist)}
                {cart(67.9)}
            </div>
        </div >
    );
    function menuItem(heading: string, subHeading: string, type: drawers): React.JSX.Element {

        return (

            <div className='flex justify-center items-center md:ml-4 md:mr-2' onClick={() => { menuState.toggleDrawer(type) }}>
                <div className='flex justify-center items-center border bg-gray-100 hover:border-gray-900 
                cursor-pointer h-10 mr-2 w-10 rounded-full mt-2 '>
                    {type === 'wishlist' ? (
                        <HeartIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <UserIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                </div>

                <div className='hidden md:block text-left cursor-pointer'>
                    {/* Show on larger screens (sm and up) */}
                    <h3 className={`${Fonts.regularbold()}`}>
                        {heading}
                    </h3>
                    <label className={`${Fonts.small()}`}>
                        {subHeading}
                    </label>
                </div>
            </div>

        )
    }
    function cart(total: number): React.JSX.Element {
        // Format the total as a currency with two decimal places
        const formattedTotal = total.toFixed(2);

        return (
            <div onClick={() => { menuState.toggleDrawer(drawers.cart) }} className='flex justify-center items-center cursor-pointer rounded-full border
             bg-gray-100 hover:border-gray-900 h-10 mr-2 w-10 mt-2 md:ml-4 md:w-[100px]'>
                <div className='flex justify-center items-center'>
                    <ShoppingCartIcon className="h-5 w-5 md:ml-4" aria-hidden="true" />
                </div>
                <div className='hidden  md:block text-left pr-4 cursor-pointer md:ml-2'>
                    <h1 className={`${Fonts.mediumBold()}`}>
                        ${formattedTotal}
                    </h1>
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
                    <h1 className={`${Fonts.mediumBold()}`}>
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
    let icon = <UserIcon className="h-5 w-5" aria-hidden="true" />

    if (user.firstName !== undefined) {

        icon = (
            <div className={`h-5 w-5 flex justify-center items-center font-bold ${Fonts.regular()} text-gray-100`} aria-hidden="true">
                {user.firstName.substring(0, 2).toUpperCase()}
            </div>
        );

        heading = user.lastName !== undefined ? `Hi ${user.firstName} ${user.lastName}` : `Hi ${user.firstName} `
    }

    return (

        <div className='flex justify-center items-center md:ml-4 md:mr-2' onClick={() => { menuState.toggleDrawer(drawers.profile) }}>
            <div className={` ${user.firstName != undefined ? "bg-gray-800" : "bg-gray-100"} flex justify-center items-center border bg-gray-100 hover:border-gray-900 
            cursor-pointer h-10 mr-2 w-10 rounded-full mt-2`}>
                {icon}
            </div>

            <div className='hidden md:block text-left cursor-pointer'>
                {/* Show on larger screens (sm and up) */}
                <h3 className={`${Fonts.regular()}`}>
                    {heading}
                </h3>
                <label className={`${Fonts.regularbold()}`}>
                    {subHeading}
                </label>
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