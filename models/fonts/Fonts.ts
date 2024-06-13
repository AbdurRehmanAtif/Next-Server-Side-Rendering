import { playfairDisplay, OpenSans } from "@/lib/font";
class Fonts {


    small(): string {
        return `smallText ${OpenSans.variable}`;
    }
    
    regular(): string {
        return `regularText ${OpenSans.variable}`;
    }
    regularbold(): string {
        return `regualrBoldText ${OpenSans.variable}`;
    }
    medium() {
        return `mediumText ${OpenSans.variable}`
    }
    mediumBold() {
        return `mediumBoldText ${OpenSans.variable}`
    }
    large() {
        return `largeText ${OpenSans.variable}`
    }
    largeBold() {
        return `largeBoldText ${OpenSans.variable}`
    }
    list() {
        return `listText ${OpenSans.variable}`;
    }








    sidebarHeaderText(): string {
        return `big_headings_text_01 ${OpenSans.variable}`;
    }

    // -----------------





    designedHeading(): string {
        return `design_heading_h1 ${playfairDisplay.variable}`
    }

    mediumPlayfairDisplay() {
        return `mediumPlayfairDisplay ${playfairDisplay.variable}`
    }
    largePlayfairDisplay() {
        return `largePlayfairDisplay ${playfairDisplay.variable}`
    }
    xlargePlayfairDisplay() {
        return `xlargePlayfairDisplay ${playfairDisplay.variable}`
    }


}


export default new Fonts();