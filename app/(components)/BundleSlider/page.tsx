"use client"
import React, { FC, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import Stars from '@/app/(components)/ui/stars';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { BundleSliderData, ProductSliderConfig, ProductSliderData } from '@/types';

interface PageProps {
    configurations: ProductSliderConfig;
    dataSource: BundleSliderData[];
}
interface ProductCardProp {
    data: BundleSliderData;
    index: number;
}


const Page: FC<PageProps> = ({ configurations, dataSource }) => {



    return (
        <>
            <Swiper

                slidesPerView={4.3} // Show 3 slides per view by default
                spaceBetween={30} // Space between slides
                grabCursor={true} // Enable grab cursor on hover
                slidesOffsetBefore={0}

                pagination={{
                    clickable: true,
                    el: '.swiper-pagination-outside',


                }}
                modules={[Pagination]}
                className="flex h-full w-full relative p-10 "

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
                        slidesPerView: 3.2, // Show 3 slides on screens from 1024px and above
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

    const child = useRef(null)
    const isInView = useInView(child, { once: true })

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

                className="rounded-2xl drop-shadow-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={index}
                initial={{ opacity: 0, y: index * 20 }} // Initial opacity set to 0 and slight upward y translation
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: index * 20 }}
                transition={{ duration: 0.5 * (index + 1) }}
                ref={child}
            >
                {index !== 0 && (
                    <>
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
                                alt="Product Image"
                                layout="responsive"
                                width={2000} // Adjust width based on your image aspect ratio
                                height={1161} // Adjust height based on your image aspect ratio
                                className="rounded-xl "
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                srcSet={
                                    Object.entries(data.imageSizes)
                                        .map(([size, url]) => `${url} ${size}`)
                                        .join(',')
                                }
                                // sizes attribute for responsive behavior based on viewport width
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 300px"
                            />
                        </div>

                        <motion.div className="absolute top-0 bottom-0 left-0 right-0 bg-opacity-[15%]">
                            <motion.div className="block justify-start text-left pt-4" >
                                <small className='text-left text-green-600 text-pretty p-4 pb-0 pt-4'>New!</small>
                                <h1 className="font-extrabold text-left p-4 pt-0 mt-[-10px] text-pretty text-textGray">{data.title}</h1>
                            </motion.div>

                            <div className={`${isHovered && !isSmallScreen ? 'hidden' : ""} absolute top-3 right-5 rounded-full bg-gray-200 flex flex-col justify-center items-center text-center`} style={{ width: "70px", height: "70px", border: "10px solid gray", fontSize: "0.8em", padding: "0" }}>
                                <h3 className="font-extrabold pt-0 pr-0" style={{ fontSize: "1.4em" }}>10 <span className="p-0 ml-[-5px] font-[16px] text-[14px]">%</span></h3>
                                <h1 className="font-extrabold mt-[-10px]" style={{ fontSize: "0.7em" }}>OFF</h1>
                            </div>

                            <motion.div className="absolute bottom-0 p-4 w-full backdrop-blur-sm">
                                <div className={`${isHovered && !isSmallScreen ? 'hidden' : ""} flex items-center justify-between w-full`}>
                                    <div className="block ml-0 pl-0">
                                        <Stars />
                                        <h5 className={`text-left text-textGray font-bold`}>{data.subtitle}</h5>
                                        <label className={`text-left block text-textGray`}>{data.detail}</label>
                                    </div>
                                    <div className="ml-auto mr-0 ">
                                        <div className="flex">
                                            <span className="text-lg font-bold text-black">$49.99</span>
                                            <span className="text-lg font-bold text-textGray line-through ml-2">$59.99</span>
                                        </div>
                                    </div>
                                </div>

                                <button className={`${isHovered && !isSmallScreen ? 'block ' : 'hidden'} hover:before:bg-textGray cursor-pointer border border-white relative p-2 mt-2 w-full rounded-xl animate-bounceUp overflow-hidden bg-white px-3 text-textGray shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-textGray before:transition-all before:duration-500 hover:text-gray-100 hover:shadow-textGray hover:before:left-0 hover:before:w-full`}>
                                    <label className='font-normal cursor-pointer relative'>{data.buttonText}<small className='pr-2 pl-2'>-</small><span className='font-bold cursor-pointer'>{data.currency}{data.price}</span></label>
                                </button>

                                <button className={`${isSmallScreen ? 'block' : 'hidden'} p-[3px] mt-2 w-full border border-1 border-textGray rounded-xl hover:bg-white cursor-pointer`}>
                                    <label className='text-textGray font-normal cursor-pointer'>{data.buttonText}<small className='pr-2 pl-2'>-</small><span className='font-bold cursor-pointer'>{data.currency}{data.price}</span></label>
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}

                {/* Condition for when index is not 0 */}
                {index === 0 && (


                    <div className='rounded-2xl border-2 '>
                        <div className='bg-gray-100 h-full w-full rounded-2xl'>
                            <div className='absolute top-0 bottom-0 left-0 right-0 bg-black opacity-25 m-1 rounded-2xl'>

                            </div>
                            <div className='p-6 text-left absolute z-10'>
                                <small className='font-semibold text-white'>Emyra Bundle +</small>
                                <h1 className='text-white font-bold'>We're BLUSHING the world of rhode.</h1>
                            </div>
                            <Image
                                src="/temp/productSlider/blush.webp"
                                alt="Main Image"
                                height={1000}
                                width={1000}
                                className='rounded-2xl'
                            />
                            <button className='absolute bottom-4 text-gray-200 p-2 left-4 rounded-3xl w-[250px] border-gray-200 border-2'>MEET ALL BUNDLES</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </>

    )
}
export default Page;