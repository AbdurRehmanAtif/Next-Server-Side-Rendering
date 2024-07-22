import React from "react";
import Image from "next/image";

export default function AccountDetailsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 items-center bg-pageHeader">
                <div className="lg:col-span-1 col-span-3">
                    <Image
                        src="https://tartecosmetics.com/on/demandware.static/-/Library-Sites-TarteSharedLibrary/default/dw4dd6c0df/images/2023/landing-page/my-account/loyalty-account-banner--holiday-2023.jpg"
                        alt="Dynamic Image"
                        width={500} // Default width
                        height={300} // Default height
                        className="w-full"
                    />
                </div>
                <div className="lg:text-left lg:col-span-2 col-span-3">
                    <div className='pl-20'>
                        <h1 className={` ml-[-3px]`}>GET PAID IN MAKEUP</h1>
                        <h1 >Join tarte™ perks today</h1>
                        <button className={`block py-2 px-4 mt-4
             text-center text-white bg-black border border-transparent hover:border-black
             hover:text-black hover:bg-transparent transition duration-300 ease-in-out`}>
                            LEARN MORE
                        </button>
                    </div>
                </div>
            </div>

            {children}
        </>
    )
}