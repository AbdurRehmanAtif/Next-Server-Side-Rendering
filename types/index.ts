import { NextResponse } from "next/server";

export interface AlertData {
    success: boolean;
    type?: 'success' | 'error' | 'warning';
    error?: string;
    title: string;
    message: string;

}

export interface AlertProps {
    isAlert: boolean;
    data: AlertData;
    state?: React.Dispatch<React.SetStateAction<AlertProps>> | null;
}

export enum CurrencyType {
    USA = '$',
    AUSTRALIA = 'A$',
    UK = '£',
    PAKISTAN = 'Rs',
    INDIA = '₹'
}

export interface ProductSliderData {

    mainImage: string;
    hoverImage: string;
    title: string;
    price: number;
    buttonText: string;
    currency: CurrencyType;
    subtitle: string;
    detail: string;
    rating?: number;
}

export interface ProductSliderMeta {
}

export interface ProductSliderConfig {
    slidesPerView: number;
    spaceBetween: number;
    customCursor?: boolean;
    meta?: ProductSliderMeta;
}


export interface BundleSliderData {

    mainImage: string;
    hoverImage: string;
    title: string;
    price: number;
    buttonText: string;
    currency: CurrencyType;
    subtitle: string;
    detail: string;
    rating?: number;
    imageSizes: {
        [key: string]: string; // Key-value pairs for different image sizes
    };
}

export interface BundleSliderMeta {


}

export interface BundleSliderConfig {

    slidesPerView: number;
    spaceBetween: number;
    customCursor?: boolean;
    meta?: ProductSliderMeta;

}




export interface TiktokSliderData {

    mainImage: string;
    hoverImage: string;
    title: string;
    price: number;
    buttonText: string;
    currency: CurrencyType;
    subtitle: string;
    detail: string;
    rating?: number;
}

export interface TiktokSliderMeta {
}

export interface TiktokSliderConfig {
    slidesPerView: number;
    spaceBetween: number;
    customCursor?: boolean;
    meta?: TiktokSliderMeta;
}