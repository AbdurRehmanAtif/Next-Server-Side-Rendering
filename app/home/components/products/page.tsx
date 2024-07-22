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
import ProductSlider from "./slider";


export default function Products() {

    return (
        <div className="rounded-2xl pb-20 ">

            <motion.div className="flex flex-col md:flex-row justify-between p-4 lg:p-10"
                initial={{ opacity: 0, y: 20 }} // Initial opacity set to 0 and slight upward y translation
                animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y translation 0
                transition={{ duration: 1 }} // Animation duration
            >
                <div className="w-full flex items-center justify-start md:order-last lg:md:order-last xlg:md:order-last">
                    <div className="block text-left p-2">
                        <small className="text-orange-400 font-semibold">✼ Luxury Exprience ✼ </small>
                        <div className="flex ">
                            <h2 className="font-medium text-black"><span className="font-medium text-textGray">Bundles. </span>  Essentials that pair perfectly with your favourite devices.</h2>
                        </div>

                        <h4 className="font-medium text-textGray">The ones you love, rely on, and always come back to.</h4>
                    </div>
                    <button className='hidden lg:block lg:m-auto lg:mr-0   text-black p-2 top-3 rounded-3xl w-[250px] border-black border-2'>MEET ALL BUNDLES</button>
                </div>

            </motion.div>
            <div className="overflow-hidden pb-[300px] p-6 pt-0 lg:p-8">
                <ProductSlider />
            </div>
        </div>
    )
}