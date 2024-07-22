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
import { ProductSliderConfig, ProductSliderData } from '@/types';

interface PageProps {
    configurations: ProductSliderConfig;
    dataSource: ProductSliderData[];
}
interface ProductCardProp {
    data: ProductSliderData;
    index: number;
}


const Page: FC<PageProps> = ({ configurations, dataSource }) => {


    return (
        <>
            <Swiper

                slidesPerView={3} // Show 3 slides per view by default
                spaceBetween={30} // Space between slides
                grabCursor={true} // Enable grab cursor on hover
                slidesOffsetBefore={0}

                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-outside',


                }}
                modules={[Pagination]}
                className="flex h-full w-full relative"

                breakpoints={{
                    400: {
                        slidesPerView: 1.15, // Show 1 slide on screens from 400px and below
                        spaceBetween: 10, // Reduce space between slides for smaller screens
                    },
                    640: {
                        slidesPerView: 1, // Show 1 slide on screens from 640px and below
                        spaceBetween: 10, // Reduce space between slides for smaller screens
                    },
                    768: {
                        slidesPerView: 2.5, // Show 2.5 slides on screens from 768px to 1023px
                        spaceBetween: 30, // Adjust space between slides as needed
                    },
                    1024: {
                        slidesPerView: 3, // Show 3 slides on screens from 1024px and above
                        spaceBetween: 30, // Adjust space between slides as needed
                    },
                }}>
                {
                    dataSource.map((product, index) => (
                        <SwiperSlide className='relative flex-shrink-0  cursor-pointer rounded-xl'>
                            <ProductCard data={product} index={index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper >

            <div className="swiper-pagination-outside text-center m-2 h-10 w-10" />

        </>
    );
}

const ProductCard: React.FC<ProductCardProp> = ({ data, index }) => {

    const [isHovered, setIsHovered] = useState(false);
    let isSmallScreen = null;

    if (typeof window !== 'undefined') {
        if (window) {
            isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
        }

    }
    const handleMouseEnter = () => {
        setIsHovered(true);
    };


    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <motion.div
                className=""
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
            >

                <div className={`inset-0 transition-opacity duration-700 object-cover ease-in-out ${isHovered && !isSmallScreen ? 'opacity-1' : 'opacity-0'}`}>
                    <Image
                        src={data.hoverImage}
                        alt="Hover Image"
                        height={1000}
                        width={1000}
                        className='rounded-xl'
                    />
                </div>


                <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isHovered && !isSmallScreen ? 'opacity-0' : 'opacity-1'}`}>
                    <Image
                        src={data.mainImage}
                        alt="Main Image"
                        height={1000}
                        width={1000}
                        className='rounded-xl'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </div>

                <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-[15%] bg-gray-100">
                    <motion.div className="block">
                        <h2 className="font-extrabold text-left p-4 text-pretty text-textGray">{data.title}</h2>
                    </motion.div>
                    <motion.div className="absolute bottom-0 p-4 w-full">

                        <div className={`${isHovered && !isSmallScreen ? 'hidden' : ""} flex items-center justify-between w-full`}>
                            <div className="block ml-0 pl-0 ">
                                <Stars />
                                <h5 className={`text-left  text-textGray font-bold`}>{data.subtitle}</h5>
                                <label className={`text-left block  text-textGray`}>{data.detail}</label>
                            </div>
                            <div className="ml-auto mr-0">
                                <h5 className={`font-bold right-0  text-textGray`}>{data.currency}{data.price}</h5>
                            </div>
                        </div>


                        <button className={`${isHovered && !isSmallScreen ? 'block ' : "hidden"} hover:before:bg-textGray cursor-pointer border 
                       border-white relative p-2 mt-2 w-full rounded-xl  animate-bounceUp
                       overflow-hidden bg-white px-3 text-textGray
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

                        {/* Add to cart Button */}
                        <button className={`${isSmallScreen ? 'block' : 'hidden'} p-[3px] mt-2 w-full border border-1 border-textGray rounded-xl hover:bg-white cursor-pointer`}>
                            <label className='text-textGray font-normal cursor-pointer'>{data.buttonText}<small className='pr-2 pl-2'>-</small>
                                <span className='font-bold cursor-pointer'>{data.currency}{data.price}</span>
                            </label>
                        </button>

                    </motion.div>
                </motion.div>



            </motion.div>
        </>
    )
}
export default Page;