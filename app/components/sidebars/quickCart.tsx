"use client"
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { drawers, useMenuContext } from '../../../context/MenuContext';
import { XMarkIcon } from "@heroicons/react/24/outline";
import Fonts from '@/models/fonts/Fonts';

const QuickCart = () => {

    const menuState = useMenuContext();

    if (typeof window !== 'undefined' && window.document) {
        
        if (menuState.isSliderToggle[drawers.cart]) {

            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }

    const Header = () => {
        return (
            <header className='z-50 sticky top-0 bg-white shadow-sm'>
                <div className='h-24 flex justify-center items-center border-b-[1px] p-4 w-full'>
                    <h1 className={`block ${Fonts.sidebarHeaderText()} mr-auto ml-4  text-gray-900`}>Your Cart</h1>
                    <motion.button className='ml-auto mr-6 h-10 w-10'>
                        <XMarkIcon onClick={() => { menuState.toggleDrawer(drawers.cart) }} className="h-10 w-10 mt-[1px] hover:bg-gray-300 cursor-pointer rounded-full p-1" aria-hidden="true" />
                    </motion.button>
                </div>
            </header>
        );
    };

    return (
        <>
            <AnimatePresence mode="popLayout" >
                {menuState.isSliderToggle[drawers.cart] && (
                    <>
                        <motion.div
                            className={`fixed  bg-black opacity-50 inset-0`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div
                            className="sidebar fixed inset-y-0 right-0
                            bg-gray-100 max-w-md w-full z-50 h-full overflow-y-auto pb-[400px]"
                            initial={{ x: 500 }}
                            animate={{ x: 0 }}
                            exit={{ x: 500 }}
                            transition={{ duration: 0.2, ease: 'linear' }}>
                            <Header />
                        </motion.div>
                    </>
                )}
            </AnimatePresence >

        </>
    );
};

export default QuickCart;
