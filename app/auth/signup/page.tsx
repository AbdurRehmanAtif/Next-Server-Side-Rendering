"use client"
import FFormInput from '@/lib/FSForms/FFormInput'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import React from 'react'

export interface signupLoad {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  agreement: boolean
  terms: boolean
}
interface initialValues {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  agreement: false,
  terms: false
}
interface fieldsErrors {
  firstname?: string,
  lastname?: string,
  email?: string,
  password?: string,
  agreement?: string,
  terms?: string
}
export default function signup() {

  const initialValues: initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    agreement: false,
    terms: false
  };

  const validate = (values: signupLoad) => {
    const errors: fieldsErrors = {}

    if (!values.firstname) {
      errors.firstname = "First name is required.";
    }

    if (!values.lastname) {
      errors.lastname = "Last name is required.";
    }

    if (!values.email) {
      errors.email = "Email address is required.";
    }
    // if(!/\S+@\S+\.\S+/.test(values.email)) {
    //   errors.email = "Invalid email address.";
    // }

    if (!values.password) {
      errors.password = "Password is required.";
    } else if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.password)
    ) {
      errors.password = "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least eight characters long.";
    }

    if (!values.terms) {
      errors.terms = "Acceptance of terms and conditions is mandatory.";
    }

    return errors;
  };

  const labelHtml = `
  I confirm that I have read and accepted the 
  <a href="#" class="underline hover:text-hyperLinks">Elyra's Terms & Conditions</a>, 
  <a href="#" class="underline hover:text-hyperLinks">Beauty Loop Terms & Conditions</a>, 
  and 
  <a href="#" class="underline hover:text-hyperLinks">Privacy Policy</a>.
`;

  const fields = [
    {
      label: "First name",
      type: "text",
      name: "firstname",
      id: "firstname",
      autoComplete: "off",
      disabled: false,
      style: "",
    },
    {
      label: "Last name",
      type: "text",
      name: "lastname",
      id: "lastname",
      autoComplete: "off",
      disabled: false,
      style: "",
    },
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
      passwordCheck: true
    }
    ,
    {
      label: `I agree to receive marketing communications such as promotions, offers and updates`,
      type: "check",
      name: "agreement",
      id: "agreement",
      autoComplete: "off",
      disabled: false,
      style: "",
    }
    ,

    {
      label: labelHtml,
      type: "check",
      name: "terms",
      id: "terms",
      autoComplete: "off",
      disabled: false,
      style: "",
    }
  ]

  const onSubmit = async (values: any) => {

    console.log(values)
  }





  return (
    <div className="flex justify-center  bg-gray-100 m-8">
      <div className="bg-white md:p-8 p-4 rounded-lg shadow-lg max-w-xl w-full">
        <div className='p-2'>
          <h2 className={` font-medium`}>New to Elyra?</h2>
          <h2 >Already have an account?<Link href="/auth/login" className={`pl-1 underline text-hyperLinks cursor-pointer text-md `}>Login here</Link></h2>
          <div className="mt-6" >
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

                  {/* <a className={`block pt-2 pb-4 ml-1 backdrop:${Fonts.regular()} underline hover:text-textDark cursor-pointer`} >Forgotten your password?</a>
                */}
                  <div className="pt-8">
                    <button type="submit" className={`min-h-[55px] bg-buttons
     text-white w-full border rounded-lg   cursor-pointer hover:opacity-90
hover: outline hover:rin g -2 transition-all  d uration-100 ease-in-out hover:ring-inset hover:ring-offset-2 hover:border-dashed hover:border-4`}>
                      Create my account
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
