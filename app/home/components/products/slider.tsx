import { CurrencyType, ProductSliderData, ProductSliderConfig } from "@/types"
import Slider from "../../../(components)/ProductSlider/page"

export default function ProductSlider() {

    const data: ProductSliderData[] = [
        {
            mainImage: "/temp/productSlider/mobile.webp",
            hoverImage: "/temp/productSlider/mobile.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },
        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Produc",
            buttonText: "BUY LIP TREATMENT",
            price: 50,
            currency: CurrencyType.USA,
            subtitle: "Subtitle 2",
            detail: "Details about Product 2",
        },
        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },
        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },
        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },

        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },
        {
            mainImage: "/temp/productSlider/lip.webp",
            hoverImage: "/temp/productSlider/lip2.webp",
            title: "Blush + Tint",
            buttonText: "BUY LIP TREATMENT",
            price: 40,
            currency: CurrencyType.AUSTRALIA,
            subtitle: "PEPTIDE LIP TREATMENT",
            detail: "The nourishing lip layer",
        },

    ];


    const config: ProductSliderConfig = {
        slidesPerView: 3,
        spaceBetween: 30,
        customCursor: false,
    };

    return (
        <>
            <Slider configurations={config} dataSource={data} />
        </>
    )

}