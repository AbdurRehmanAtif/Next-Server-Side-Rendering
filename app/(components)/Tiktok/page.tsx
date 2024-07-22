"use client"
import React, { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { TiktokSliderData, TiktokSliderConfig, TiktokSliderMeta } from '@/types';

interface PageProps {
    configurations: TiktokSliderConfig;
    dataSource: TiktokSliderMeta[];
}
interface TiktokCardProp {
    data: TiktokSliderData;
    index: number;
}


const Page: FC<PageProps> = ({ configurations, dataSource }) => {


    return (
        <>
            <Swiper

                slidesPerView={5} // Show 3 slides per view by default
                spaceBetween={10} // Space between slides
                grabCursor={true} // Enable grab cursor on hover
                slidesOffsetBefore={-50}// Extra padding before the first slide
                slidesOffsetAfter={0}  // Extra padding after the last slide
                centeredSlides={true}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-outside',
                }}
                modules={[Pagination]}
                className="flex h-full w-screen relative"
                breakpoints={{
                    400: {
                        slidesPerView: 1.4, // Show 1 slide on screens from 400px and below
                        spaceBetween: 10, // Reduce space between slides for smaller screens
                        width: 500
                    },
                    640: {
                        slidesPerView: 1.4, // Show 1 slide on screens from 640px and below
                        spaceBetween: 10, // Reduce space between slides for smaller screens
                        width: 550,
                        height: 600

                    },
                    768: {
                        slidesPerView: 1.7, // Show 2.5 slides on screens from 768px to 1023px
                        spaceBetween: 10, // Adjust space between slides as needed
                        width: 600
                    },
                    1024: {
                        slidesPerView: 2, // Show 3 slides on screens from 1024px and above
                        spaceBetween: 15, // Adjust space between slides as needed
                        width: 700
                    },
                }}

            >
                {
                    dataSource.map((product, index) => (
                        <SwiperSlide className='relative cursor-pointer'>
                            <ProductCard data={product} index={index} />
                        </SwiperSlide>
                    ))
                }
            </Swiper >

            <div className="swiper-pagination-outside text-center m-2 h-10 w-10" />

        </>
    );
}

const ProductCard: React.FC<TiktokCardProp> = ({ data, index }) => {

    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseEnter = () => {
        setIsHovered(true);
    };


    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <motion.div
                className=" bg-gray-300 rounded-2xl "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
            >




                <div className='min-h-[480px] md:min-h-[550px] lg:min-h-[580px] rounded-xl '>
                    {/* autoPlay loop muted playsInline    */}
                    <video className={`absolute rounded-2xl top-0
                 bottom-0 min-h-full object-cover w-full h-full overflow-hidden`}
                        height={1000}
                        width={1000}
                        src="https://player.vimeo.com/progressive_redirect/playback/956597446/rendition/720p/file.mp4?loc=external&signature=8d94b39b1d1c1cf6a66f8d5b2cae17b45f608cc58f4eef9c0a6543974676da6f"
                    ></video>
                </div>

                <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-[15%] bg-gray-100">
                   
                </motion.div>



            </motion.div>
        </>
    )
}
export default Page;