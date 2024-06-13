'use client'
import React, { useState } from 'react';
import { XMarkIcon, ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from 'framer-motion';
import fonts from '@/style/fonts/fonts';
import MobileMenuData from './data/mobileMenuData';
import { useMenuContext } from '../../../context/MenuContext';



interface SubMenuData {
    text: string;
    submenu: any[]; // Define the type of submenu as needed
}

const MobilePrimary = () => {

    const menuState = useMenuContext();
    const toggleSlider = () => {
        menuState.setSliderToggle(prevState => ({
            ...prevState,
            mobile: !prevState,
        }));
    };


    // const [isAnimating, setIsAnimating] = useState(false); // Local state for animation
    const [isSubcategory, setIsSubcategory] = useState(false); // Local state for animation
    const [subMenuData, setSubMenuData] = useState<SubMenuData | undefined>(undefined);

    const toggleSubcategory = (text: string, submenu: any[]) => {
        setIsSubcategory(!isSubcategory);
        setSubMenuData({
            text: text,
            submenu: submenu
        });
    };

    return (
        <>
            <AnimatePresence mode="popLayout" >
                {menuState.isSliderToggle.mobile && (
                    <>
                        <motion.div
                            className={`fixed inset-0 bg-black opacity-50 z-10`}

                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div
                            className="sidebar fixed inset-0 overflow-y-auto flex z-20"
                            initial={{ x: -500 }}
                            animate={{ x: 0 }}
                            exit={{ x: -500 }}
                            transition={{ duration: 0.2, ease: 'linear' }}
                        >
                            <div onClick={toggleSlider}
                                className="fixed inset-y-0 left-0 w-full max-w-sm md:max-w-lg bg-white shadow-lg">
                                <button className='p-6'>close me Mobile</button>
                            </div>
                        </motion.div>
                    </>
                )}
                {/* {isSubcategory ? subCategoryMenu() : menuHeader()} */}
            </AnimatePresence >
        </>
    );



    function subCategoryMenu() {

        return (
            <>
                <div>

                    {topHeader(subMenuData?.text ?? '', true)}

                </div>

                {subMenuData?.submenu.map((item, index) => (
                    category(item.text, false, [])
                ))}
            </>
        )
    }


    function menuHeader() {
        return (
            <>
                {topHeader("Browse products", false)}
                <div className='flex pt-6'>
                    <h1 className="flex text-lg ml-6 pr-0 mr-0 border-b-[1px] border-black cursor-pointer">Sign in or join

                    </h1>

                </div>
                <div className='flex mt-6 h-60 bg-yellow-50'>
                    <h1 className="ml-6 mt-8">Trending</h1>
                </div>

                <div className='mt-2 block w-full'>

                    {MobileMenuData.map((item, index) => (
                        category(item.text, item.isSubmenu, item.submenuOptions)
                    ))}

                </div>

            </>
        )
    }


    function topHeader(title: string, showSubCategoryBackButton: Boolean) {

        return (
            <div className='h-16 flex justify-center items-center border-b-[1px] pt-2 pb-2'>
                {
                    showSubCategoryBackButton &&
                    <motion.button
                        className='h-10 w-10 mr-2 ml-3'
                        layout
                        onClick={() => toggleSubcategory("", [])}
                    >
                        <ChevronLeftIcon className="h-9 w-9 hover:bg-gray-300 cursor-pointer rounded-full p-1" aria-hidden="true" />
                    </motion.button>

                }
                <h1 className={`block ${fonts.boldText()} text-[24px] mr-auto ml-4`}>{title}</h1>
                <motion.button
                    className='ml-auto mr-6 h-10 w-10'
                    layout onClick={handleToggle}>
                    <XMarkIcon className="h-10 w-10 mt-[1px] hover:bg-gray-300 cursor-pointer rounded-full p-1" aria-hidden="true" />
                </motion.button>
            </div>
        )
    }


    function category(text: string, isSubmenu: boolean, submenu: []) {
        return (
            <div className='flex mt-1 cursor-pointer' onClick={isSubmenu ? () => toggleSubcategory(text, submenu) : undefined}>
                <button className='p-2 pl-4 block'>{text}</button>
                {isSubmenu && <ChevronRightIcon className='h-8 w-6 mt-1 ml-auto mr-4' />}
            </div>
        );
    }





};
export default MobilePrimary