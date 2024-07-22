"use client"
import { useEffect } from "react";
import ProductSlider from "./components/products/slider";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  useAnimation
} from "framer-motion";
import Bundles from "./components/bundles/page";
import TiktokSlider from "./tiktok/page";
import Products from "./components/products/page";



export default function Page() {

  const { scrollYProgress } = useScroll();
  // Adjust the transformation for scale based on scrollYProgress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]); // Scale from 1 to 0.9 as scrollYProgress goes from 0 to 1

  const controls = useAnimation();

  return (
    <>
      <motion.div className="flex justify-between p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-center ">
          <h1 className="font-bold text-black">Elyra <span className="ml-[-10px] font-[30px] text-blue-700">.</span></h1>
        </div>

        <div className="flex items-center justify-end md:order-last lg:md:order-last xlg:md:order-last">
          <div className="block text-left">
            <small className="text-orange-400 font-semibold">Luxury Exprience</small>
            <h3 className="font-medium">Experience the pinnacle of luxury.</h3>
            <h3 className="font-medium text-textGray mt-[-10px]">Mac can do it.</h3>
          </div>
        </div>
      </motion.div >

      <motion.div className="w-full rounded-xl h-[60vh] md:h-[80vh] lg:h-[80vh] xlg:h-[80vh] p-0 m-0"
        style={{
          backgroundColor: 'lightblue',
          scale: scale, // Apply transformed scale value
          transition: 'transform 0.2s ease-out', // Optional: Smooth transition effect
        }}
      >
      </motion.div>


      <Bundles />
      <Products />








      {/* <motion.div className=""
        initial={{ opacity: 0, y: 20 }} // Initial opacity set to 0 and slight upward y translation
        animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y translation 0
        transition={{ duration: 1 }} // Animation duration
      >
        <div className="text-center justify-center">
          <small className="text-orange-400 font-semibold pb-0">✼ Luxury Exprience ✼ </small>
          <h1 className="font-bold text-black">
            Accurate Colours Benefit Creators
          </h1>
          <h4 className="">BenQ empowers creative professionals with AQCOLOR technology to help inspire ideas and make projects come to life.</h4>
          <button className=' text-black p-2 top-3 rounded-3xl w-[250px] border-black border-2 mt-4'>MEET ALL BUNDLES</button>
        </div>
      </motion.div >

      <section className="">
        <div className="p-10">
          <ProductSlider />
        </div>
      </section> */}

      {/* 
      <motion.div className="bg-red-200 rounded-3xl w-full h-[60vh] md:h-[80vh] lg:h-[80vh] xlg:h-[80vh] p-0 m-0"
        style={{
          backgroundColor: 'lightblue',
          scale: scale, // Apply transformed scale value
          transition: 'transform 0.2s ease-out', // Optional: Smooth transition effect
        }}

      >

      </motion.div> */}


      {/* <motion.div className="flex flex-col md:flex-row justify-between p-12 pt-4 pb-4"
        initial={{ opacity: 0, y: 20 }} // Initial opacity set to 0 and slight upward y translation
        animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y translation 0
        transition={{ duration: 1 }} // Animation duration
      >
        <div className="block w-2/3">
          <small className="text-orange-400 font-semibold">✼ tiktok trends ✼ </small>
          <h2 className="font-bold text-black">You + elyra</h2>
          <h4 className="font-medium text-textGray">Up to <span className="text-black underline">15% discount </span> on selected bundles</h4>
          <h4 className="font-medium text-">The ones you love, rely on, and always come back to.</h4>
        </div>

      </motion.div >

      <section className="">
        <div className="p-10">

          <BundleSlider />
        </div>
      </section> */}
    </>
  )
}