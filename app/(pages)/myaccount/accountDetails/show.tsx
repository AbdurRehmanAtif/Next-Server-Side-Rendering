import Fonts from '@/models/fonts/Fonts'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Button } from '@/app/components/ui/button';
async function fetchUserProfile() {

    const response = await fetch('http://localhost:3000/api/user/details', {
        method: "GET",
        cache: 'no-store'
    });
    if (response.ok) {
        return response.json();
    } else {
        return {}
    }


}

type userProfile = {
    data: {
        firstName?: string;
        lastName?: string;
        dob?: string;
        mobile?: string
    }
}

export default async function ShowPersonalAccountDetails() {

    // const user: userProfile = await fetchUserProfile();

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='p-2 pl-0'>
                    <h1 className={`${Fonts.regularbold()}`}>Full Name</h1>
                    <label className={`${Fonts.regular()}`} > </label>
                </div>
                <div className='p-2 pl-0'>
                    <h1 className={`${Fonts.regularbold()}`}>Date of Birth</h1>
                    <label className={`${Fonts.regular()}`} ></label>
                </div>
                <div className='p-2 pl-0'>
                    <h1 className={`${Fonts.regularbold()}`}>Mobile</h1>
                    <label className={`${Fonts.regular()}`} ></label>
                </div>
            </div>

            <CardFooter className="border-t  py-4 col-span-2">
                <div className="flex items-end">
                    <Button className="m-1">Cancel</Button>
                    <Button className="m-1">Save</Button>
                </div>
            </CardFooter>
        </>

    )
}
