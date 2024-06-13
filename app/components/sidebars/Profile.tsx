import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { drawers, useMenuContext } from '../../../context/MenuContext';
import { useAuth } from '../../../context/AuthProvider';
import Fonts from '@/models/fonts/Fonts';
// import LoginComponent from '../auth/Login';
import { XMarkIcon, ArrowLeftStartOnRectangleIcon, ClipboardDocumentListIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon, ShoppingBagIcon, CurrencyDollarIcon, HeartIcon, UserIcon, TruckIcon } from "@heroicons/react/24/solid";
import LoginComponent from '@/app/components/auth/login/page';
import Link from 'next/link';
import { useRouter } from 'next/router';
import User from '@/models/User';
import Auth from '@/models/Auth';


const Profile = () => {

  const menuState = useMenuContext();
  const auth = useAuth();


  // const toggleSlider = () => {
  //   menuState.setSliderToggle(prevState => ({
  //     ...prevState,
  //     profile: !prevState,
  //   }));
  // };

  // if (menuState.isSliderToggle[drawers.profile]) {
  //   document.body.classList.add('overflow-hidden');
  // } else {
  //   document.body.classList.remove('overflow-hidden');
  // }


  const Header = ({ title }: { title: string }) => {
    return (
      <header className='z-50 sticky top-0 bg-white shadow-sm' >
        <div className='h-24 flex justify-center items-center border-b-[1px] p-4 w-full '>
          <h1 className={`block mr-auto ml-4 pb-4 pt-4
           text-gray-900 
           antialiased hover:subpixel-antialiased 
           line-clamp-none
          ${Fonts.largeBold()} text-3xl`}>
            {title}
          </h1>

          <motion.button className='ml-auto mr-6 h-10 w-10'>
            <XMarkIcon onClick={() => { menuState.toggleDrawer([drawers.profile]) }} className="h-10 w-10 mt-[1px] hover:bg-gray-300 cursor-pointer rounded-full p-1" aria-hidden="true" />
          </motion.button>
        </div>
      </header>
    );
  };

  const Footer = () => {

    return (
      <footer className="py-4 absolute bottom-0 w-full border bg-white " >
        <div className="container mx-auto">
          <div className='flex items-center  p-2 hover:bg-gray-200 rounded-md cursor-pointer ml-0 '
            onClick={() => {
              auth.logout()
              menuState.toggleDrawer(drawers.profile)
            }}>

            <ArrowLeftStartOnRectangleIcon className="h-6 w-6 transform rotate-180" aria-hidden="true" />
            <h1 className={`block ${Fonts.regularbold()} mr-auto ml-2  text-gray-900`}
            >Logout</h1>
          </div>
        </div>
      </footer >
    )
  }

  return (
    <>
      <div className='"overflow-hidden overflow-x-hidden overflow-y-hidden'>
        <AnimatePresence mode="popLayout" >
          {menuState.isSliderToggle.profile && (
            <>
              <motion.div
                className={`fixed  bg-black opacity-50 inset-0 `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0.5 }}
                onClick={() => { menuState.toggleDrawer(drawers.profile) }}
                transition={{ duration: 0.3 }}
              ></motion.div>

              <motion.div
                className="sidebar fixed inset-y-0 right-0
               bg-gray-100 max-w-md w-full z-50 h-full overflow-x-hidden overflow-y-auto pb-[400px]"
                initial={{ x: 500 }}
                animate={{ x: 0 }}
                exit={{ x: 500 }}
                transition={{ duration: 0.2, ease: 'linear' }}
              >

                {auth.isAuthenticated ?
                  <>
                    <Header title={`Hello, ${auth.user.firstName}`} />
                    <div className='bg-white pt-6 pb-6'>
                      <div className='p-4'>
                        <h1 className={`block mr-auto ml-4 pb-2 ${Fonts.mediumBold()}`}>My Orders</h1>
                        <label className={`block mr-auto ml-4 pb-4 pt-0 ${Fonts.small()}`}>You currently have no orders to display.
                          <Link className={`ml-2 underline text-hyperLinks ${Fonts.small()} font-semibold`} href="/" onClick={() => { menuState.toggleDrawer([drawers.profile]) }}>
                            Go Shopping
                          </Link></label>

                      </div>
                    </div>
                    <div className='p-4'>
                      <h1 className={`block mr-auto ml-4 pb-4 ${Fonts.mediumBold()}`}>Quick links</h1>
                      <div className='columns-2 p-4 gap-[10px]'>

                        <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                          <div className='flex items-center text-center p-2 pt-4 pb-4 shadow-sm hover:shadow-lg'>
                            <ClipboardDocumentIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                            <small className={`${Fonts.list()}`}>Lists</small>
                          </div>
                        </div>

                        <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                          <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                            <CurrencyDollarIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                            <small className={`${Fonts.list()}`}>My specials & offers</small>
                          </div>
                        </div>

                        <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                          <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                            <ShoppingBagIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                            <small className={`${Fonts.list()}`}>Buy again</small>
                          </div>
                        </div>

                        <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                          <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                            <HeartIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                            <small className={`text-gray-900 ${Fonts.list()}`}>Saved wishlist</small>
                          </div>
                        </div>






                      </div>
                    </div>

                    <div className='p-4'>
                      <h1 className={`block mr-auto ml-4 pb-4 ${Fonts.mediumBold()}`}>My Account</h1>
                      <div className="container mx-auto p-2">

                        <Link href="/myaccount" onClick={() => { menuState.toggleDrawer([drawers.profile]) }}>
                          <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                            <UserIcon className="h-5 w-5 " aria-hidden="true" />
                            <h1 className={`block ${Fonts.regular()} mr-auto ml-2  text-gray-900`}>

                              Account details

                            </h1>
                          </div>

                        </Link>

                        <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                          <ClipboardDocumentListIcon className="h-5 w-5" aria-hidden="true" />
                          <h1 className={`block ${Fonts.regular()} mr-auto ml-2  text-gray-900`}
                          >My orders</h1>
                        </div>
                        <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                          <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
                          <h1 className={`block ${Fonts.regular()} mr-auto ml-2  text-gray-900`}
                          >Payment methods</h1>
                        </div>
                        <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                          <TruckIcon className="h-5 w-5 " aria-hidden="true" />
                          <h1 className={`block ${Fonts.regular()} mr-auto ml-2  text-gray-900`}
                          >Delivery</h1>
                        </div>
                        <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'
                          onClick={() => {
                            auth.logout()
                            menuState.toggleDrawer(drawers.profile)
                          }}>
                          <ArrowLeftStartOnRectangleIcon className="h-5 w-5 transform rotate-180" aria-hidden="true" />
                          <h1 className={`block ${Fonts.regular()} mr-auto ml-2  text-gray-900`}
                          >Logout</h1>
                        </div>
                      </div>
                    </div>




                    {/* <Footer /> */}
                  </> : <>
                    <Header title="Log in or Sign up" />
                    <LoginComponent />
                  </>}


              </motion.div>
            </>
          )}
        </AnimatePresence >

      </div>
    </>

  );




};

export default Profile;
