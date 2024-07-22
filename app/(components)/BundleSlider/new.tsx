"use client"
import React, { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Stars from '@/app/(components)/ui/stars';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { BundleSliderData, BundleSliderConfig, BundleSliderMeta } from '@/types';
import { Star } from 'lucide-react';

interface PageProps {
    configurations: BundleSliderConfig;
    dataSource: BundleSliderData[];
}
interface BundleCardProp {
    data: BundleSliderData;
    index: number;
}


const Page: FC<PageProps> = ({ configurations, dataSource }) => {


    return (
        <>
            <Swiper


                spaceBetween={25} // Space between slides
                grabCursor={true} // Enable grab cursor on hover
                slidesOffsetBefore={0}// Extra padding before the first slide
                slidesOffsetAfter={0}  // Extra padding after the last slide

                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-outside',
                }}
                modules={[Pagination]}
                className="flex h-full relative "
                breakpoints={{
                    400: {
                        slidesPerView: 1.2, // Show 1 slide on screens from 400px and below

                    },
                    // 500: {
                    //     slidesPerView: 2, // Show 1 slide on screens from 640px and below
                    //     spaceBetween: 10, // R
                    // },
                    640: {
                        slidesPerView: 1.5, // Show 1 slide on screens from 640px and below
                        spaceBetween: 10, // Reduce space between slides for smaller screens
                    },
                    768: {
                        slidesPerView: 1.5, // Show 2.5 slides on screens from 768px to 1023px


                    },
                    1024: {
                        slidesPerView: 2.7, // Show 3 slides on screens from 1024px and above


                    },
                    1280: {
                        slidesPerView: 3.4, // Show 3 slides on screens from 1024px and above
                    },

                    1536: {
                        slidesPerView: 3.7, // Show 3 slides on screens from 1024px and above
                    }
                }}
            >
                {
                    dataSource.map((product, index) => (
                        <SwiperSlide className=' overflow-hidden flex-shrink  cursor-pointer rounded-2xl border border-gray-400'>
                            <ProductCard data={product} index={index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper >

            <div className="swiper-pagination-outside text-center m-2 h-10 w-10" />

        </>
    );
}

const ProductCard: React.FC<BundleCardProp> = ({ data, index }) => {





    const [isHovered, setIsHovered] = useState(false);
    let isSmallScreen = null;

    // if (typeof window !== 'undefined') {
    //     if (window) {
    //         isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    //     }

    // }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };


    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <motion.div
                className="realative p-0 "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}


            >

                <div className='h-[450px] md:h-[500px] xl:h-[600px] bg-gray-100'>

                    {/* <div className='absolute top-0 p-2 bg-black w-full'>
                        <h4 className='font-bold text-white'>NATURAL PERFECTION + CONCEALER</h4>
                    </div> */}
                    <div className='p-6 bg- w-full text-left'>
                        <small className='text-green-500 font-medium text-[12px] p-0'>New!</small>
                        <h3 className='font-extrabold text-black text-left font-serif'>NATURAL PERFECTION</h3>
                        <small className='font-normal text-gray-700 text-left'>This duo consists of our Matte Cream Lipstick and Ultra Cover Lip Gloss.</small>
                        <div className="flex text-left justify-left">
                            <div className="flex">
                                <span className="text-lg font-bold text-black">$49.99</span>
                                <span className="text-lg font-bold text-textGray line-through ml-2">$59.99</span>
                            </div>
                        </div>
                        <div className='w-full h-[300px] text-left flex justify-ce'>
                            <Image
                                className=''
                                src="/temp/productSlider/concelar.avif"
                                alt="/temp/productSlider/concelar.avif"
                                width={300}
                                height={300}
                            />
                        </div>
                    </div>

                    {/* <div className="absolute top-10 left-0 right-0 bottom-[40%] ">
                        <Image
                            className='object-fill'
                            src="/temp/productSlider/concelar.avif"
                            alt="/temp/productSlider/concelar.avif"
                            layout="fill"
                        /> */}


                    {/* <div className='absolute top-2 left-2 bg-white rounded-3xl w-[50px] pl-2 pr-2 pt-0 pb-0 text-center justify-center flex'>
                            <small className='text-green-500 font-medium text-[12px]'>New!</small>
                        </div> */}
                    {/* <div
                            className="absolute top-2 bottom-5  right-2 rounded-full bg-gray-200 flex flex-col justify-center items-center text-center"
                            style={{
                                width: "80px", // Adjust width as needed
                                height: "80px", // Adjust height as needed
                                border: "10px solid #b46a46",
                                fontSize: "0.8em", // Adjust font size as needed
                                padding: "0" // Ensure no padding
                            }}
                        >
                            <h3 className="font-extrabold pt-0 pr-0" style={{ fontSize: "1.8em" }}>10 <span className="p-0 ml-[-5px] font-[16px] text-[14px]">%</span></h3>
                            <h1 className="font-extrabold mt-[-10px]" style={{ fontSize: "1.1em" }}>OFF</h1>
                        </div> */}

                    {/* </div> */}



                    <div className='relative top-[60%]  text-left p-3 '>
                        <div className='flex'>
                            <div className="flex-1 pr-4">
                                <small className='p-0 text-green-600 block text-[13px] mt-[10px]'>
                                    New</small>

                            </div>
                            <div className="flex text-center justify-center">
                                <div className="flex">
                                    <span className="text-lg font-bold text-black">$49.99</span>
                                    <span className="text-lg font-bold text-textGray line-through ml-2">$59.99</span>
                                </div>
                            </div>
                        </div>

                        <ul className='flex text-center space-x-1 pt-2 pb-2'>
                            <li className='bg-[#e9a576] border-[#e9a576] rounded-[100%] w-4 h-4 border-4'></li>
                            <li className='bg-[#b46a46] border-[#b46a46] rounded-[100%] w-4 h-4 border-4'></li>
                            <li className='bg-[#c2734a] border-[#c2734a] rounded-[100%] w-4 h-4 border-4'></li>
                            <li className='bg-[#7e432a] border-[#7e432a] rounded-[100%] w-4 h-4 border-4'></li>
                            <li className='bg-[#eab183] border-[#eab183] rounded-[100%] w-4 h-4 border-4'></li>
                            <li className='bg-[#783b1f] border-[#783b1f] rounded-[100%] w-4 h-4 border-4'></li>
                        </ul>





                        <button className={`block hover:before:bg-textGray cursor-pointer border 
                       border-white relative p-2 mt-2 w-full rounded-xl  animate-bounceUp
                       overflow-hidden bg-black px-3 text-white
                       shadow-2xl transition-all before:absolute 
                       before:bottom-0 before:left-0 before:top-0
                       before:z-0 before:h-full before:w-0 
                       before:bg-textGray before:transition-all 
                       before:duration-500 hover:text-gray-100
                       hover:shadow-textGray hover:before:left-0 
                       hover:before:w-full`}>
                            <label className='font-normal cursor-pointer relative ' >{data.buttonText}<small className='pr-2 pl-2'>-</small>
                                <span className='font-bold cursor-pointer'>{data.currency}{data.price}</span>
                            </label>
                        </button>

                    </div>


                </div>


                {/* linear-gradient(to right, #000 50%, transparent 50%) 100% 1; */}

            </motion.div >
        </>
    )
}
export default Page;