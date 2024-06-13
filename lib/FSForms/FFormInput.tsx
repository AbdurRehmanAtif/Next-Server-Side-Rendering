import React, { useState, useRef } from "react";
import {useFormikContext, Field } from "formik";
import FormikFSField from "./FormikFSField";
import { XMarkIcon, EyeIcon } from '@heroicons/react/24/outline'
import FFormInputConainter from "./FFormInputConainter";


interface FFormInputProps {

  options: {
    label: string;
    type: string;
    id: string;
    name: string;
    value?: string;
    disabled?: boolean;
    selectOptions?: string[];
    config?: any;
    style: string;
  };
  style?: string;
}

const FFormInput = ({ options }: FFormInputProps) => {


  let style = options?.style
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const innerRef = useRef<HTMLInputElement>(null);
  const containerDivRef = useRef<HTMLInputElement>(null);
  const { values, setFieldValue } = useFormikContext<{ myField: string }>();
  // Access the values here
  const myFieldValue = values.myField;

  const toggleFloatingLabel = () => {

    if (innerRef.current) {
      innerRef.current.focus();
    }
    if (containerDivRef.current) {
      containerDivRef.current.classList.add("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2");
    }
    setIsFocused(true)
  };
  // (e: any) => setIsFocused(e.target.value !== '')
  const handleBlur = () => {
    if (containerDivRef.current) {
      containerDivRef.current.classList.remove("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2");
    }

  };

  const handleKeyDown = () => {

    if (innerRef.current !== null) {
      setIsTyping(true)
      return
    }
    setIsTyping(false)
  };

  const handleXButton = () => {
    if (innerRef.current !== null) {
      innerRef.current.value = "";
      setFieldValue(innerRef.current.name, null);
      options.value = ""
    }
    setIsTyping(false)
  }

  const classes =
    "block w-full border-none px-2  mt-4 outline-none focus:ring-0 bg-transparent";
  if (options.disabled) {

    style = "bg-gray-200 hover:cursor-notAllowed ";
  }

  const handleErrorStyling = (value: any) => {
    if (value) {
      if (containerDivRef.current) {
        containerDivRef.current.classList.remove("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2")
        containerDivRef.current.classList.add("border-red-800", "border-2", "border-solid");
      }
    } else {
      if (containerDivRef.current) {
        containerDivRef.current.classList.remove("border-red-800", "border-2", "border-solid")
        containerDivRef.current.classList.add("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2");
      }
    }
  }

  const handlePasswordEye = () => {

    if (innerRef.current !== null) {
      if (innerRef.current.type == "text") {
        innerRef.current.type = "password"
        return;
      }
      innerRef.current.type = "text"
      return;

    }
  }

  return (
    <>
      {(() => {

        switch (options.type) {
          case "email":
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <Email
                  options={options}
                  style={style}
                  classes={classes}
                  innerRef={innerRef}
                  isFocused={isFocused}
                  toggleFloatingLabel={toggleFloatingLabel}
                  setIsFocused={setIsFocused}
                  handleKeyDown={handleKeyDown}
                  isTyping={isTyping}
                  handleXButton={handleXButton}
                />
              </FFormInputConainter >
            )
          case 'password':
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <Password
                  options={options}
                  style={style}
                  classes={classes}
                  innerRef={innerRef}
                  isFocused={isFocused}
                  toggleFloatingLabel={toggleFloatingLabel}
                  setIsFocused={setIsFocused}
                  handleKeyDown={handleKeyDown}
                  isTyping={isTyping}
                  handleXButton={handleXButton}
                  handlePasswordEye={handlePasswordEye}
                />
              </FFormInputConainter >
            )

          case 'text':
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <Text
                  options={options}
                  style={style}
                  classes={classes}
                  innerRef={innerRef}
                  isFocused={isFocused}
                  toggleFloatingLabel={toggleFloatingLabel}
                  setIsFocused={setIsFocused}
                  handleKeyDown={handleKeyDown}
                  isTyping={isTyping}
                  handleXButton={handleXButton}
                />
              </FFormInputConainter >

            )
          case 'checkbox':
            return (

              <Checkbox
                options={options}
                style={style}
                classes=""
                innerRef={innerRef}
              />
            )
          default:
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <Text
                  options={options}
                  style={style}
                  classes={classes}
                  innerRef={innerRef}
                  isFocused={isFocused}
                  toggleFloatingLabel={toggleFloatingLabel}
                  setIsFocused={setIsFocused}
                  handleKeyDown={handleKeyDown}
                  isTyping={isTyping}
                  handleXButton={handleXButton}
                />
              </FFormInputConainter >
            )

        }
      })()}


      {/* <div className={`${Fonts.regularText} pb-0 text-gray-600 text-sm ${options?.config?.subNote?.style}`}>
        <div dangerouslySetInnerHTML={{ __html: options?.config?.note }} />
      </div>

      <ErrorMessage name={options.name} handleErrorStyling={handleErrorStyling} component={FormikCustomError} />
    */}
    </>
  );
};

export default FFormInput;

interface ComponentProps {
  options: any; // You should replace 'any' with the specific type for options
  style: string;
  classes: string;
  innerRef: React.RefObject<HTMLInputElement>;
  isFocused: boolean;
  toggleFloatingLabel: () => void;
  setIsFocused: (value: boolean) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  isTyping: boolean;
  handleXButton: () => void;
  handleErrorStyling?: (value: boolean) => void;
  handlePasswordEye?: (value: boolean) => void;
}

export const Email = ({ options, style, classes, innerRef, isFocused,
  toggleFloatingLabel, setIsFocused, handleKeyDown, isTyping, handleXButton }: ComponentProps) => {

  return (
    <>
      <FormikFSField
        options={options}
        classes={classes}
        style={style}
        innerRef={innerRef}
        isFocused={isFocused}
        toggleFloatingLabel={toggleFloatingLabel}
        setIsFocused={setIsFocused}
        handleKeyDown={handleKeyDown}
      />
      {
        isTyping && (
          <XMarkIcon
            onClick={handleXButton}
            className="transition-all duration-100 ease-in-out hover:mr-1  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3" />
        )
      }
    </>
  )
}

const Password = ({ options, style, classes, innerRef, isFocused,
  toggleFloatingLabel, setIsFocused, handleKeyDown, isTyping, handleXButton, handlePasswordEye }: ComponentProps) => {

  return (
    <>
      <FormikFSField
        options={options}
        classes={classes}
        style={style}
        innerRef={innerRef}
        isFocused={isFocused}
        toggleFloatingLabel={toggleFloatingLabel}
        setIsFocused={setIsFocused}
        handleKeyDown={handleKeyDown}
        handlePasswordEye={handlePasswordEye}
      />
      {
        isTyping && (
          <>
            <XMarkIcon
              onClick={handleXButton}
              className="transition-all duration-100 ease-in-out hover:mr-1  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3" />

            <EyeIcon
              onClick={handlePasswordEye}
              className="transition-all duration-100 ease-in-out hover:mr-[37px]  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3 mr-[35px]" />
          </>
        )
      }
    </>
  )
}

const Text = ({ options, style, classes, innerRef, isFocused,
  toggleFloatingLabel, setIsFocused, handleKeyDown, isTyping, handleXButton }: ComponentProps) => {

  return (
    <>
      <FormikFSField
        options={options}
        classes={classes}
        style={style}
        innerRef={innerRef}
        isFocused={isFocused}
        toggleFloatingLabel={toggleFloatingLabel}
        setIsFocused={setIsFocused}
        handleKeyDown={handleKeyDown}
      />
      {
        isTyping && (
          <XMarkIcon
            onClick={handleXButton}
            className="transition-all duration-100 ease-in-out hover:mr-1  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3" />

        )
      }
    </>
  )
}


const Checkbox = ({ options, style, classes, innerRef }) => {
  return (
    <>
      <div className="flex items-center pt-2"> {/* Use flex with items-center to align items vertically */}
        <Field
          type={options.type}
          id={options.id}
          name={options.name}
          className={`${classes} ${style}`}
          autoComplete="off"
          innerRef={innerRef}
        />
        <div className="ml-2" dangerouslySetInnerHTML={{ __html: options?.label }} />
      </div>
    </>

  )
}