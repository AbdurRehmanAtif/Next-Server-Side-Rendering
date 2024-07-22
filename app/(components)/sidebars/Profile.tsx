import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { drawers, useMenuContext } from '../../../context/MenuContext';
import { useAuth } from '../../../context/AuthProvider';
import { XMarkIcon, ArrowLeftStartOnRectangleIcon, ClipboardDocumentListIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { ClipboardDocumentIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid";
import LoginComponent from '@/app/auth/login/page';
import Link from 'next/link';
import { ShoppingBagIcon, CurrencyDollarIcon, TruckIcon } from "@heroicons/react/24/outline";

interface Features {

  title: string;
  details: string;
  icons: JSX.Element;

}


const Profile = () => {

  const menuState = useMenuContext();
  const auth = useAuth();
  const features: Features[] = [
    // {
    //   "title": "My orders",
    //   "details": "View orders and track my delivery",
    //   "icons": <ShoppingBagIcon className="h-6 w-6 transform" aria-hidden="true" />
    // },
    // {
    //   "title": "My specials and offers",
    //   "details": "Anything I've bought before, on special",
    //   "icons": <CurrencyDollarIcon className="h-6 w-6 transform rotate-180" aria-hidden="true" />
    // },
    // {
    //   "title": "Lists & Wishlist",
    //   "details": "Stay organized and keep track of important things.",
    //   "icons": <HeartIcon className="h-6 w-6" aria-hidden="true" />
    // },
    // {
    //   "title": "Shipping & Order Tracking",
    //   "details": "Track orders and shipments",
    //   "icons": <TruckIcon className="h-6 w-6" aria-hidden="true" />
    // },
  ]


  const Header = ({ title }: { title: string }) => {
    return (
      <header className='z-10 sticky top-0 bg-white shadow-sm ' >
        <div className='h-24 flex justify-center items-center border-b-[1px] p-4 w-full '>
          <div className={`block mr-auto ml-4 pb-4 pt-4
           text-gray-900 
           antialiased hover:subpixel-antialiased 
           line-clamp-none heading1`}>
            {title}
          </div>

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
            <h1 className={`block mr-auto ml-2`}
            >Logout</h1>
          </div>
        </div>
      </footer >
    )
  }

  const LoginPromotion = () => {
    return (
      <>
        <div className="p-4">
          <h4 className="pl-3 font-bold ">Log in to get the most out of your shop</h4>
          {
            features.map(feature => (
              <div className='pt-8 pl-3'>
                <div className='flex items-center text-center'>
                  {feature.icons}
                  <h5 className='ml-3 font-bold text-gray-700'>{feature.title}</h5>
                </div>
                <div className='pt-1'>
                  <small className='text-gray-700'>{feature.details}</small>
                </div>
              </div>

            ))
          }
        </div>

      </>
    )

  }

  return (
    <>
      <div className=''>
        <div className=''>
          <AnimatePresence mode="popLayout" >
            {menuState.isSliderToggle.profile && (
              <>
                <motion.div
                  className={`fixed 
                   bg-gray-900 inset-0 z-10 `}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0.5 }}
                  onClick={() => { menuState.toggleDrawer(drawers.profile) }}
                  transition={{ duration: 0.3 }}
                ></motion.div>

                <motion.div
                  className="sidebar fixed inset-y-0 right-0
               bg-gray-100 max-w-md w-full z-50 h-full overflow-x-hidden overflow-y-auto pb-14"
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
                          <h1 className={`block mr-auto ml-4 pb-2`}>My Orders</h1>
                          <label className={`block mr-auto ml-4 pb-4 pt-0`}>You currently have no orders to display.
                            <Link className={`ml-2 underline text-hyperLinks font-semibold`} href="/" onClick={() => { menuState.toggleDrawer([drawers.profile]) }}>
                              Go Shopping
                            </Link></label>

                        </div>
                      </div>
                      <div className='p-4'>
                        <h1 className={`block mr-auto ml-4 pb-4`}>Quick links</h1>
                        <div className='columns-2 p-4 gap-[10px]'>

                          <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                            <div className='flex items-center text-center p-2 pt-4 pb-4 shadow-sm hover:shadow-lg'>
                              <ClipboardDocumentIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                              <small className={``}>Lists</small>
                            </div>
                          </div>

                          <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                            <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                              <CurrencyDollarIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                              <small className={``}>My specials & offers</small>
                            </div>
                          </div>

                          <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                            <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                              <ShoppingBagIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                              <small className={``}>Buy again</small>
                            </div>
                          </div>

                          <div className='w-full rounded-lg cursor-pointer bg-white mb-2'>
                            <div className='flex items-center text-center p-2 pt-4 pb-4  shadow-sm hover:shadow-lg'>
                              <HeartIcon className=' mr-2 h-5 w-5 text-grayIcon' />
                              <small className={`text-gray-900`}>Saved wishlist</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='p-4'>
                        <h1 className={`block mr-auto ml-4 pb-4 `}>My Account</h1>
                        <div className="container mx-auto p-2">

                          <Link href="/myaccount" onClick={() => { menuState.toggleDrawer([drawers.profile]) }}>
                            <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                              <UserIcon className="h-5 w-5 " aria-hidden="true" />
                              <h1 className={`block  mr-auto ml-2  text-gray-900`}>
                                Account details
                              </h1>
                            </div>

                          </Link>

                          <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                            <ClipboardDocumentListIcon className="h-5 w-5" aria-hidden="true" />
                            <h1 className={`block  mr-auto ml-2  text-gray-900`}
                            >My orders</h1>
                          </div>
                          <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                            <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
                            <h1 className={`block  mr-auto ml-2  text-gray-900`}
                            >Payment methods</h1>
                          </div>
                          <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'>
                            <TruckIcon className="h-5 w-5 " aria-hidden="true" />
                            <h1 className={`block  mr-auto ml-2  text-gray-900`}
                            >Delivery</h1>
                          </div>
                          <div className='flex items-center p-3 hover:bg-gray-200 rounded-md cursor-pointer'
                            onClick={() => {
                              auth.logout()
                              menuState.toggleDrawer(drawers.profile)
                            }}>
                            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 transform rotate-180" aria-hidden="true" />
                            <h1 className={`block  mr-auto ml-2  text-gray-900`}
                            >Logout</h1>
                          </div>
                        </div>
                      </div>


                      {/* <Footer /> */}
                    </> : <>
                      <Header title="Log in or Sign up" />
                      <LoginComponent />
                      <LoginPromotion />
                    </>}
                </motion.div>
              </>
            )}
          </AnimatePresence >
        </div>
      </div>
    </>



  );






};

export default Profile;
