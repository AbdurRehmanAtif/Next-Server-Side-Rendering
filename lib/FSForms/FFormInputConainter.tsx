import React from 'react';

const FFormInputConainter: React.FC<any> = ({ toggleFloatingLabel, containerDivRef, handleBlur, options, isFocused, children }) => {
    return (
        <>

            <div className={`${options?.style}  `}>
                <div className={`relative transition-all duration-100 ease-in-out hover:pl-1 hover:font-bold  rounded-lg border border-gray-300 hover:border-gray-900 cursor-text text-center bg-gray-100 h-[55px] flex items-center
                `}
                    onClick={toggleFloatingLabel}
                    ref={containerDivRef}
                    onFocus={toggleFloatingLabel}
                    onBlur={handleBlur}>
                    <label className={`absolute ml-2 text-left w-full transition-all duration-100 cursor-text text-gray-600 ${isFocused || options?.value ? 'text-[12px] text-gray-400 -translate-y-3' : 'text-base'}`}
                        onClick={toggleFloatingLabel}> {options?.label} </label>
                    {children}
                </div>
            </div>
        </>
    );
};

export default FFormInputConainter;
