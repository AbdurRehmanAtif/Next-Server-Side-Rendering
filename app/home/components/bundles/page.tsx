import { motion, useInView, useScroll } from "framer-motion"

import BundleSlider from "./bundleSlider";
import { useEffect, useRef, useState } from "react";


export default function Bundles() {

    const container = useRef(null)
    const child = useRef(null)
    const isInView = useInView(child)

    return (


        <div className="rounded-2xl pb-20 pt-20">

            <motion.div
                initial={{ opacity: 0, y: 40 }} // Initial opacity set to 0 and slight upward y translation
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 1 }} // Animation duration
                ref={child}
            >
                <div className="text-center justify-center">
                    <small className="text-orange-400 font-semibold pb-0">✼ Luxury Exprience ✼ </small>
                    <h1 className="font-bold text-black">
                        Accurate Colours Benefit Creators
                    </h1>

                    <h4 className="">BenQ empowers creative professionals with AQCOLOR technology to help inspire ideas and make projects come to life.</h4>
                    <button className=' text-black p-2 top-4 rounded-3xl w-[250px] border-black border-2 mt-4'>MEET ALL BUNDLES</button>
                </div>
            </motion.div >



            <div className="overflow-hidden pb-[300px] pt-20 ">
                <BundleSlider />
            </div>
        </div >
    )
}