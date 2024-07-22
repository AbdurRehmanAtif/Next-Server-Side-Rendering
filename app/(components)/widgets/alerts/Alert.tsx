import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AlertProps } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
interface errorData {
  title: string,
  message: string;
  success: boolean;
}
const initEmptyAlert: errorData = {
  title: "",
  message: "",
  success: false
}
const Alert: React.FC<AlertProps> = ({ isAlert, data, state }) => {

  let borderColor = 'border-[#dc3548]'; // Default to red for error and 'others'
  let backgroundColor = 'bg-[#dc3548]';

  if (data.type === 'success') {
    borderColor = 'border-[#4BB543]'; // Green for success
    backgroundColor = 'bg-[#4BB543]';
  } else if (data.type === 'warning') {
    borderColor = 'border-[#007bff]'; // Blue for others
    backgroundColor = 'bg-[#007bff]';
  }

  const handleClose = () => {
    if (state) {
      state({ isAlert: false, data: initEmptyAlert });
    }
  };

  return isAlert ? (
    <>
      <div
        className={`relative flex items-center mt-4 mb-4 border-2 rounded-md bg-white  ${borderColor}`}
      >
        {/* Your content goes here */}
        {/* Left side with red background and icon */}

        <div className={`absolute h-full flex justify-center items-center pl-2 pr-2 ${backgroundColor}`}>
          <AnimatePresence>
            <motion.div className='shake flex items-center text-center'
              id="elementToShake"
              animate={{
                rotate: [0, -10, 10, -10, 10, 0], // Keyframes for the rotation animation
              }}
              transition={{
                duration: 0.5, // Duration of each keyframe
                ease: 'easeInOut', // Easing function for the animation
                loop: Infinity, // Loop the animation infinitely
              }}
            >
              <svg
                className="flex-shrink-0 w-6 h-6 items-center text-center"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
            </motion.div>
          </AnimatePresence>
        </div>


        {/* Right side with error message, error code, and details */}
        <div className="flex-grow ml-10 p-2">
          <div className='flex justify-between items-center text-center'>
            <div className="text-black-700 font-bold">{data.title}</div>
            <div><XMarkIcon onClick={handleClose} className='h-6 hover:text-gray-700 cursor-pointer' /></div>
          </div>
          <div className="text-gray-900">{data.message}</div>
        </div>
      </div>
    </>
  ) : null;
};

export default Alert;