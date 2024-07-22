"use client"
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { drawers, useMenuContext } from '../../../context/MenuContext';
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon, ShoppingBagIcon, CurrencyDollarIcon, HeartIcon, UserIcon, TruckIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { Link, Plus } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '../ui/progress';



const QuickCart = () => {

    const menuState = useMenuContext();

    if (typeof window !== 'undefined' && window.document) {

        if (menuState.isSliderToggle[drawers.cart]) {

            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    const Header = ({ title }: { title: string }) => {
        return (
            <header className='z-10 sticky top-0  shadow-md ' >
                <div className='h-24 flex justify-center items-center border-b-[1px] p-4 w-full '>
                    <div className={`block mr-auto ml-4 pb-4 pt-4
               text-gray-900 
               antialiased hover:subpixel-antialiased 
               line-clamp-none heading1`}>
                        {title}
                    </div>

                    <motion.button className='ml-auto mr-6 h-10 w-10'>
                        <XMarkIcon onClick={() => { menuState.toggleDrawer([drawers.cart]) }} className="h-10 w-10 mt-[1px] hover:bg-gray-300 cursor-pointer rounded-full p-1" aria-hidden="true" />
                    </motion.button>
                </div>
            </header>
        );
    };

    return (
        <>
            <div className=''>
                <div className=''>
                    <AnimatePresence mode="popLayout" >
                        {menuState.isSliderToggle.cart && (
                            <>
                                <motion.div
                                    className={`fixed 
                    inset-0 z-10 bg-gray-700`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.7 }}
                                    exit={{ opacity: 0.5 }}
                                    onClick={() => { menuState.toggleDrawer(drawers.cart) }}
                                    transition={{ duration: 0.3 }}
                                ></motion.div>

                                <motion.div
                                    className="sidebar bg-white fixed inset-y-0 right-0 max-w-2xl w-full z-50 h-full overflow-x-hidden overflow-y-auto pb-14"
                                    initial={{ x: 700 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: 700 }}
                                    transition={{ duration: 0.3, ease: 'linear' }}
                                >
                                    <Header title="Shopping Bag" />


                                    <div className="block text-left p-6">

                                        {/* <h4 className='font-bold pb-2'>Free Shipping</h4>
                                        <div className='flex pb-6'>
                                            <label className='text-hyperLinks hover:underline hover:cursor-pointer pr-1'>Signin</label>
                                            <label className='text-textGray'>to see if you have any saved items</label>
                                        </div> */}
                                        <div className='p-0 w-full flex'>
                                            <h4 className='font-bold pb-2 text-orange-400'>✼ Free Shipping ✼</h4>

                                            <small className='text-black m-auto mr-1'>Items (4)</small>
                                        </div>
                                        <Progress className="mt-2 mb-2 h-[20px]" value={33} />
                                        <label className='text-gray-800 font-semibold'>add $45.00 more for </label>
                                        <label className='text-black font-bold underline'>Free</label>
                                        <label className='text-gray-800 font-semibold'> shipping</label>
                                    </div>


                                    <motion.div className='relative  border-t-2'

                                    >
                                        <ul className='pt-0  max-h-[500px]  overflow-auto'>
                                            {/* Example of rendering cart items */}
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                cartItem()

                                            ))}
                                        </ul>



                                    </motion.div>
                                    <div className='absolute bottom-0 w-full h-36 p-4 bg-gray-200 rounded-xl rounded-b-none'>
                                        <div className='flex items-center justify-between'>
                                            <h4 className='font-bold'>Subtotal</h4>
                                            <h4 className='font-bold'>$566.00</h4>
                                        </div>
                                        <label className='text-gray-500 block'>*shipping, taxes, and discounts calculated at checkout.</label>

                                        <button className='mt-4 p-2 w-full border bg-gray-500 text-white rounded-xl hover:bg-white hover:text-gray-500 cursor-pointer'>
                                            <span className='font-normal'>Checkout <small className='px-2'>-</small> <span className='font-bold'>$566</span></span>
                                        </button>
                                    </div>


                                    {/* <div className='p-8'>
                                        <h4 className='font-bold pb-2'>Your Bag is empty.</h4>
                                        <div className='flex pb-6'>
                                            <label className='text-hyperLinks hover:underline hover:cursor-pointer pr-1'>Signin</label>
                                            <label className='text-textGray'>to see if you have any saved items</label>
                                        </div>

                                        <h4 className='font-bold pb-2'>My Profile</h4>

                                        <ul className='pr-2'>
                                            <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li>

                                            <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li> <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li>
                                            <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li> <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li> <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li> <li className='flex items-center pb-2'>
                                                <UserIcon className="h-4 w-4 mr-2" />
                                                <small className='text-textGray'>Personal Details</small>
                                            </li>

                                        </ul>
                                    </div> */}

                                </motion.div>
                            </>
                        )}
                    </AnimatePresence >
                </div>
            </div >



        </>
    );


    function cartItem() {
        return (
            <li className='p-1 w-full border-b-2' >
                <div className='w-full h-full p-2 flex text-center content-center'>
                    <Image
                        src="/temp/cart/rhode.jpeg"
                        alt="Main Image"
                        height={60}
                        width={100}
                        className='object-cover shadow-none'
                    />
                    <div className='flex w-full'>
                        <div className='block m-auto ml-0 text-left mt-0 pl-2'>
                            <motion.label className='text-black font-semibold'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 3 }} 

                            >POCKET BLUSH PIGGY</motion.label><br />
                            <small className='text-textGray'>Pink</small>
                            <div className='block pb-2'>
                                <div className='w-[120px] mt-4 rounded-3xl border border-gray-400 block'>
                                    <div className='flex items-center justify-center p-1'>
                                        <MinusCircleIcon className='w-6 h-6 m-auto ml-1 text-textGray cursor-pointer hover:text-black' />
                                        <h3 className='text-textGray text-[18px] font-semibold'>4</h3>
                                        <PlusCircleIcon className='w-6 h-6 m-auto mr-1 text-textGray cursor-pointer hover:text-black' />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='relative m-auto mr-2 h-full'>
                            <h5 className='text-black font-semi'>$45.88</h5><br></br>
                            <TrashIcon className='w-5 h-5 absolute bottom-4 right-1' />
                            {/* <small className='w-8 h-8 text-gray-600  absolute bottom-0 right-4 text-[14px] hover:text-gray-800 hover:font-bold cursor-pointer transition'>Remove</small>
                        */}
                        </div>
                    </div>
                </div>
            </li>
        )
    }
};


export default QuickCart;
