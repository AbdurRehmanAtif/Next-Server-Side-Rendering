"use client"
import React, { useState } from 'react'
import ShowProfile from '../profile/page';
import Link from "next/link"
import { ShieldCheckIcon, ShoppingBagIcon, CurrencyDollarIcon, HeartIcon, UserIcon, TruckIcon } from "@heroicons/react/24/solid";
import Orders from '@/app/myaccount/csr/orders';
import PaymentMethods from '@/app/myaccount/csr/paymentMethods';
import Security from '@/app/myaccount/csr/security';
import Shipping from '@/app/myaccount/csr/shipping';
import Wishlist from '@/app/myaccount/csr/wishlist';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/(components)/ui/card"
import EditProfile from '../profile/edit';

export enum Components {
    DETAILS = 'DETAILS',
    SECURITY = 'SECURITY',
    PAYMENT_METHODS = 'PAYMENT_METHODS',
    ORDERS = 'ORDERS',
    SHIPPING = 'SHIPPING',
    WISHLIST = 'WISHLIST',
}

interface ComponentTitleData {
    title: string;
    sbHeading: string;
}

type Section = {
    componentType: Components;
    data: ComponentTitleData;
}

const SectionWithData: Section[] = [
    {
        componentType: Components.DETAILS,
        data: {
            title: "Account Details",
            sbHeading: "View or edit your personal details and update your password settings."
        }
    },
    {
        componentType: Components.SECURITY,
        data: {
            title: "Change password",
            sbHeading: "Change your login password"
        }
    },
    {
        componentType: Components.PAYMENT_METHODS,
        data: {
            title: "Payment Methods",
            sbHeading: "View or update your payment methods and check your transaction history."
        }
    },
    {
        componentType: Components.ORDERS,
        data: {
            title: "My Orders",
            sbHeading: "View your order history and track your most recent orders."
        }
    },
    {
        componentType: Components.SHIPPING,
        data: {
            title: "My Shipping",
            sbHeading: "View your shipping address and choose shipping method."
        }
    },
    {
        componentType: Components.WISHLIST,
        data: {
            title: "My Wishlist",
            sbHeading: "View your wishlist and saved for future products."
        }
    },

];

interface ComponentStates {
    [Components.DETAILS]: boolean;
    [Components.ORDERS]: boolean;
    [Components.PAYMENT_METHODS]: boolean;
    [Components.SECURITY]: boolean;
    [Components.SHIPPING]: boolean;
    [Components.WISHLIST]: boolean;
}


// Initialize the component states with all values set to false
const initialState: ComponentStates = {
    [Components.DETAILS]: false,
    [Components.ORDERS]: false,
    [Components.PAYMENT_METHODS]: false,
    [Components.SECURITY]: true,
    [Components.SHIPPING]: false,
    [Components.WISHLIST]: false,
};

export default function ProfileContainer() {

    // const SRCArray = React.Children.toArray(children);

    const [selectedComponent, setSelectedComponent] = useState<Components>(Components.DETAILS);
    const selectedSection = SectionWithData.find(section => section.componentType === selectedComponent);
    // edit button to work
    const [componentEdit, setComponentEdit] = useState<ComponentStates>(initialState);

    const setSelection = (type: Components) => {
        setSelectedComponent(type)
    }

    function handleComponentMode(component: Components) {
        // Check the current state of the component
        const currentComponentState = componentEdit[component];
        // Set the updated state to the opposite value of the current state
        const updatedStates: ComponentStates = {
            ...componentEdit,
            [component]: !currentComponentState,
        };
        // Update the component states
        setComponentEdit(updatedStates);
    }

    return (
        <>

            <div className="flex min-h-screen w-full flex-col">
                <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40  md:gap-8 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1>My Account</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className={`grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0`}>
                            <Link href="" onClick={() => { setSelection(Components.DETAILS) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.DETAILS ? 'text-primary' : 'text-muted-foreground'}`}>
                                <UserIcon className="h-4 w-4" />
                                Personal Details
                            </Link>

                            <Link href="#" onClick={() => { setSelection(Components.SECURITY) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.SECURITY ? 'text-primary' : 'text-muted-foreground'}`}>
                                <ShieldCheckIcon className="h-4 w-4" />
                                Security
                            </Link>

                            <Link href="#" onClick={() => { setSelection(Components.ORDERS) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.ORDERS ? 'text-primary' : 'text-muted-foreground'}`}>
                                <ShoppingBagIcon className="h-4 w-4" />
                                Orders
                            </Link>

                            <Link href="#" onClick={() => { setSelection(Components.PAYMENT_METHODS) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.PAYMENT_METHODS ? 'text-primary' : 'text-muted-foreground'}`}>
                                <CurrencyDollarIcon className="h-4 w-4" />
                                Payment methods
                            </Link>

                            <Link href="#" onClick={() => { setSelection(Components.SHIPPING) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.SHIPPING ? 'text-primary' : 'text-muted-foreground'}`}>
                                <TruckIcon className="h-4 w-4" />
                                Delivery
                            </Link>

                            <Link href="#" onClick={() => { setSelection(Components.WISHLIST) }} className={` flex items-center gap-3 rounded-lg py-2 transition-all ${selectedComponent === Components.WISHLIST ? 'text-primary' : 'text-muted-foreground'}`}>
                                <HeartIcon className="h-4 w-4" />
                                Saved wishlist
                            </Link>
                        </nav>
                        <div className="grid gap-10 m-4">
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader >

                                    <div className='flex items-center justify-between min-h-[25px]'>
                                        <CardTitle className={``}>{selectedSection?.data.title}</CardTitle>
                                        {componentEdit[selectedSection!.componentType] ? ""
                                            : <button className={``} onClick={() => (handleComponentMode(selectedSection?.componentType as Components))}>Edit</button>}
                                    </div>
                                    <h1 className={``}>
                                        {selectedSection?.data.sbHeading}
                                        <hr className='mt-2 pb-4' ></hr>
                                    </h1>

                                    {selectedComponent === Components.DETAILS && (componentEdit[Components.DETAILS] ? <EditProfile handleComponentMode={handleComponentMode} /> : <ShowProfile />)}
                                    {selectedComponent === Components.ORDERS ? <Orders /> : ""}
                                    {selectedComponent === Components.PAYMENT_METHODS ? <PaymentMethods /> : ""}
                                    {selectedComponent === Components.SECURITY && <Security />}
                                    {selectedComponent === Components.SHIPPING && componentEdit[Components.SHIPPING] ? <Shipping /> : ""}
                                    {selectedComponent === Components.WISHLIST && componentEdit[Components.WISHLIST] ? <Wishlist /> : ""}
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}
