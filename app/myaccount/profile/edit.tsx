import React, { useState } from 'react'
import { Form, Formik } from 'formik';
import FFormInput from '@/lib/FSForms/FFormInput';
import Loading from '@/app/(components)/widgets/loaders/loading';
import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@/app/(components)/ui/button"
import { CardFooter } from "@/app/(components)/ui/card"
import { Components } from '../container';
import { useAuth } from '@/context/AuthProvider';
import User from '@/models/User';
import ProfileService from '@/service/ProfileService';
import { ApiError } from 'next/dist/server/api-utils';
import { Auth, Profile } from '@/app/auth/login/route';
import { ApiResponse } from '@/service/http/NextApi';
import CustomError from '@/service/CustomError';
import Alert from '@/app/(components)/widgets/alerts/Alert';


export default function EditProfile({ handleComponentMode }: any) {


    const auth = useAuth()
    const user = auth.user
    const [alert, setAlertStateAndData] = useState<any>({
        isAlert: false,
        data: { type: '', title: '', message: '' }
    });

    const fields = [
        {
            label: "First Name",
            type: "text",
            name: "firstName",
            id: "firstName",
            value: user ? user.firstName : null,
            autoComplete: "off",
            disabled: false,
            style: "",
        }, {
            label: "Last Name",
            type: "text",
            name: "lastName",
            id: "lastName",
            value: user ? user.lastName : null,
            autoComplete: "off",
            disabled: false,
            style: "",
        }
        , {
            label: "Date of Birth",
            type: "date",
            name: "dob",
            id: "dob",
            value: "123123-03-12",
            maxDate: new Date().toISOString().split('T')[0],
            autoComplete: "off",
            disabled: false,
            style: "col-span-2",
        }
        , {
            label: "Mobile",
            type: "number",
            name: "mobile",
            id: "mobile",
            max: 9999999999,
            value: user ? user.mobile : null,
            autoComplete: "off",
            disabled: false,
            style: "col-span-2",
        }
    ]

    // Define initial form values based on user data
    const initialValues = {
        firstName: user ? user.firstName : '',
        lastName: user ? user.lastName : '',
        dob: "2024-03-12",
        mobile: user ? user.mobile : ''
    };

    const validate = (values: Profile) => {

        const errors: Profile = {};

        if (!values.firstName) {
            errors.firstName = "First name cannot be empty";
        }
        const p: Profile = {}
        values = p;
        return errors;
    };

    const onSubmit = async (values: Profile) => {

        const token = auth.auth.getToken()
        setAlertStateAndData({ isAlert: false, })
        
        if (token) {
            try {
                const profile: ApiResponse<Profile> = await ProfileService.saveProfile<Profile>(values, token);
                if (profile.body) {
                    let newUser = new User()
                    const obj: Auth = { email: user.email!, role: user.role! }
                    newUser.parseAuth(obj)
                    newUser.parseProfile(profile.body.data)
                    auth.updateContextUser(newUser)
                    setAlertStateAndData({ isAlert: true, data: { type: 'success', title: "Profile Information Updated", message: profile.body.message } })
                }
            } catch (error: any) {
                setAlertStateAndData({ isAlert: true, data: { type: 'error', title: error.error, message: error.message } })

            }
        }

    };
    return (
        <>
            {alert.isAlert && <div className='pb-1'><Alert isAlert={alert.isAlert} data={alert.data} state={setAlertStateAndData} /></div>}

            {auth.user.isStateUpdated ?
                <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                    {({ isSubmitting }) => (
                        <Form className="grid grid-cols-2 gap-4">
                            {fields.map((options, index) => (
                                (() => {
                                    return <FFormInput options={options} key={index} />
                                })()
                            ))}
                            <CardFooter className="border-t  py-4 col-span-2">
                                <div className="flex items-end">
                                    <Button className="m-1" onClick={() => { handleComponentMode(Components.DETAILS) }}>Cancel</Button>

                                    {isSubmitting ?
                                        <Loading />
                                        : <Button className="m-1">Save</Button>
                                    }
                                </div>
                            </CardFooter>
                        </Form>
                    )}
                </Formik>

                : ""
            }
        </>
    )
}

