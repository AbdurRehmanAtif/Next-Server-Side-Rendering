import React from 'react'
import { Form, Formik } from 'formik';
import FFormInput from '@/lib/FSForms/FFormInput';
import Loading from '@/app/components/widgets/loaders/loading';
import { PencilIcon } from "@heroicons/react/24/solid";
import { Button } from "@/app/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Components } from '../container';

export default function EditPersonalAccountDetails({ handleComponentMode }: any) {


    const fields = [
        {
            label: "First Name",
            type: "text",
            name: "firstName",
            id: "firstName",
            value: "Hello",
            autoComplete: "off",
            disabled: false,
            style: "",
        }, {
            label: "Last Name",
            type: "text",
            name: "lastName",
            id: "lastName",
            value: "Atif",
            autoComplete: "off",
            disabled: false,
            style: "",
        }
        , {
            label: "Date of Birth",
            type: "date",
            name: "dob",
            id: "dob",
            value: "25/08/2018",
            autoComplete: "off",
            disabled: false,
            style: "col-span-2",
        }
        , {
            label: "Mobile",
            type: "number",
            name: "mobile",
            id: "mobile",
            value: "",
            autoComplete: "off",
            disabled: false,
            style: "col-span-2",
        }
    ]

    const initialValues = {
        firstName: "a",
        lastName: "a",
        dob: "546654",
        mobile: ""
    };

    const validate = () => {

    };

    const onSubmit = async (values: any) => {

        console.log(values)

    };

    return (
        <>


            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                {({ isSubmitting }) => (
                    <Form className="grid grid-cols-2 gap-4">
                        {fields.map((options, index) => (
                            (() => {
                                return <FFormInput options={options} key={index} />
                            })()
                        ))}

                        {/* <a className={`block pt-2 pb-4 ml-1 backdrop:${Fonts.boldText()} underline hover:text-textDark cursor-pointer`} >Forgotten your password?</a>
                                <div className="mt-10">
                                    {isSubmitting ? (
                                        <Loading />
                                    ) : (
                                        <button type="submit" className={`min-h-[55px] bg-textDark
                     text-white w-full border rounded-lg  ${Fonts.boldText()} cursor-pointer hover:opacity-90
                     hover:outline hover:ring-2 transition-all duration-100 ease-in-out hover:ring-inset hover:ring-offset-2 hover:border-dashed hover:border-4`}>
                                            Submit
                                        </button>
                                    )}
    
                                </div> */}
                        <CardFooter className="border-t  py-4 col-span-2">
                            <div className="flex items-end">
                                <Button className="m-1" onClick={() => { handleComponentMode(Components.DETAILS) }}>Cancel</Button>
                                <Button className="m-1">Save</Button>
                            </div>
                        </CardFooter>
                    </Form>
                )}
            </Formik>

        </>
    )
}

