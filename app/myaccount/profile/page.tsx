"use client"
import { SkeletonCard } from '@/app/(components)/layouts/Header';
import { useAuth } from '@/context/AuthProvider';
import raact, { useState } from 'react';
import { ProfileSkeleton } from '../page';


// async function getData(): Promise<ApiResponse<Profile> | undefined> {
//     try {
//         const header = cookies().get("token")?.value
//         if (header) {
//             return ProfileService.fetchProfileByToken<Profile>(header)
//         }
//     } catch (err) {
//         return undefined;
//     }
// }

export default function ShowProfile() {


    const auth = useAuth()

    return (
        <>
            {
                auth.isAppReady ?

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='p-2 pl-0'>
                            <h1 className={``}>Full Name</h1>
                            <label className={``}>{auth.user.firstName} {auth.user.lastName}</label>
                        </div>
                        <div className='p-2 pl-0'>
                            <h1 className={``}>Date of Birth</h1>
                            <label className={``}>{auth.user.dob}</label>
                        </div>
                        <div className='p-2 pl-0'>
                            <h1 className={``}>Mobile</h1>
                            <label className={``}>{auth.user.mobile}</label>
                        </div>
                    </div>

                    : <ProfileSkeleton />
            }
        </>

    )
}
