import { Roboto, Playfair_Display, Montserrat, Open_Sans } from "next/font/google";


export const roboto = Roboto(
    {
        weight: "700",
        subsets: ["latin"]
    });

export const playfairDisplay = Playfair_Display(
    {
        weight: "variable",
        variable: "--playfair-font",
        style: ["normal"],
        subsets: ["latin"],
        preload: true
    });
    
export const montserrat = Montserrat({
    weight: "variable",
    variable: "--montserrat-font",
    subsets: ["latin"],
    preload: true
});

export const OpenSans = Open_Sans({
    weight: "variable",
    variable: "--openSans-font",
    subsets: ["latin"],
    preload: true
});

