"use client"
import React, { useState } from "react";
import { Formik, Form } from 'formik';
import Alert from "@/app/components/widgets/alerts/Alert";
import Fonts from "@/models/fonts/Fonts";
import FFormInput from "@/lib/FSForms/FFormInput";
import Loading from "@/app/components/widgets/loaders/loading";
import { useAuth } from "@/context/AuthProvider";
import User from "@/models/User";
import { drawers, useMenuContext } from "@/context/MenuContext";

interface loginCredentials {
    email?: string;
    password?: string;
}

export default function LoginComponent() {

    const auth = useAuth();
    const menuState = useMenuContext();


    const [alert, setAlertStateAndData] = useState<any>({
        isAlert: false,
        data: { type: '', title: '', message: '' }
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const validate = (values: loginCredentials) => {
        const errors: loginCredentials = {};

        if (!values.email) {
            errors.email = "Email address is required.";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email address.";
        }

        if (!values.password) {
            errors.password = "Password is required.";
        }

        return errors;
    };

    const onSubmit = async (values: any) => {

        setAlertStateAndData({ isAlert: false, })

        try {
            const response = await fetch('/components/auth/login', {
                method: "POST",
                body: JSON.stringify({ email: values.email, password: values.password }),
                cache: "no-store"
            })

            const results = await response.json();
            const user = new User()

            if (results.auth) {
                // Update email with data from authentication response
                user.parseAuth(results.auth);
                user.parseProfile(results.profile);
                auth.updateContextUser(user)
                auth.setIsAuthenticated(true)
              
            } else {
                setAlertStateAndData({ isAlert: true, data: { type: "error", title: results.error, message: results.message } })
            }

        } catch (error) {
            setAlertStateAndData({ isAlert: true, data: { type: 'error', title: error.error, message: error.message } })
        }
    }

    const fields = [
        {
            label: "Email address",
            type: "email",
            name: "email",
            id: "email",
            autoComplete: "off",
            disabled: false,
            style: "",
        }, {

            label: "Password",
            type: "password",
            name: "password",
            id: "password",
            autoComplete: "off",
            disabled: false,
            style: "",
        }
    ]

    return (
        <>
            <div className="bg-white pb-8 pt-6">
                <div className="p-4 flex">
                    <h1 className={`block pl-4 ${Fonts.regular()}`}>New to Elyra online? <a className={`pl-1 underline hover:text-textDark cursor-pointer text-md ${Fonts.mediumBold()}`}>Sign up here</a><span className="ml-1 mr-1 text-[20px]">&#128525;</span></h1>
                </div>
                <div className="p-2 ml-4 mr-4 " >

                    {alert.isAlert && <Alert isAlert={alert.isAlert} data={alert.data} state={setAlertStateAndData} />}
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                        {({ isSubmitting }) => (
                            <Form className="space-y-2 mt-1">
                                {fields.map((options, index) => (
                                    (() => {
                                        // Add a disabled property to the options object
                                        options.disabled = isSubmitting && options.type !== "checkbox";
                                        if (options.type !== "checkbox") {
                                            return <FFormInput options={options} key={index} />;
                                        } else {
                                            return null; // Return null for non-checkbox types
                                        }
                                    })()
                                ))}

                                <a className={`block pt-2 pb-4 ml-1 backdrop:${Fonts.regular()} underline hover:text-textDark cursor-pointer`} >Forgotten your password?</a>
                                <div className="mt-10">
                                    {isSubmitting ? (
                                        <Loading />
                                    ) : (
                                        <button type="submit" className={`min-h-[55px] bg-textDark
                         text-white w-full border rounded-lg  ${Fonts.regular()} cursor-pointer hover:opacity-90
                    hover: outline hover:rin g -2 transition-all  d uration-100 ease-in-out hover:ring-inset hover:ring-offset-2 hover:border-dashed hover:border-4`}>
                                            Submit
                                        </button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}