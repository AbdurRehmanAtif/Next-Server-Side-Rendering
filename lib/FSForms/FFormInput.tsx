import React, { useState, useRef, useEffect } from "react";
import { useFormikContext, Field, ErrorMessage } from "formik";
import FormikFSField from "./FormikFSField";
import { XMarkIcon, EyeIcon, CheckCircleIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import FFormInputConainter from "./FFormInputConainter";
import FormikCustomError from "./formikCustomError";


interface FFormInputProps {

  options: {
    label: string;
    type: string;
    id: string;
    name: string;
    value?: string;
    disabled?: boolean;
    selectOptions?: string[];
    maxDate?: Date;
    max?: number;
    min?: number;
    config?: any;
    style: string;
    passwordCheck?: boolean;

  };
  style?: string;
}

// interface PasswordValidation {
//   message: string;
// }

const FFormInput = ({ options }: FFormInputProps) => {


  let style = options?.style
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const innerRef = useRef<HTMLInputElement>(null);
  const containerDivRef = useRef<HTMLInputElement>(null);

  const { values, setFieldValue } = useFormikContext<{ myField: string }>();
  let validation = [
    { index: 0, title: 'Use at least one number', value: false },
    { index: 1, title: 'Use at least one upper case letter', value: false },
    { index: 2, title: 'Use at least one lower case letter', value: false },
    { index: 3, title: 'Use at least eight characters', value: false },
    { index: 4, title: 'no spaces', value: false }
  ]
  const [passValidation, setPassValidation] = useState(validation)

  const toggleFloatingLabel = () => {

    if (innerRef.current) {
      innerRef.current.focus();
    }
    if (containerDivRef.current) {
      containerDivRef.current.classList.add("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border", "border-1");
    }
    setIsFocused(true)
  };
  // (e: any) => setIsFocused(e.target.value !== '')
  const handleBlur = () => {
    if (containerDivRef.current) {
      containerDivRef.current.classList.remove("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border", "border-1");
    }

  };

  useEffect(() => {

    if (innerRef?.current && isFocused) {

      if (innerRef.current.type == "number") {
        if (innerRef.current.value.length >= 9) {
          innerRef.current.value = innerRef.current.value.slice(0, 10);
        }
      }



      if (innerRef.current.type == "password") {
        const updatedValidation = [...passValidation];
        const atLeastOneNumber = /^\D*\d/;
        if (atLeastOneNumber.test(innerRef.current.value)) {
          updatedValidation[0] = { ...updatedValidation[0], value: true };
        } else {
          updatedValidation[0] = { ...updatedValidation[0], value: false };
        }

        const atLeastOneUpperCaseRegex = /[A-Z]/;
        if (atLeastOneUpperCaseRegex.test(innerRef.current.value)) {
          updatedValidation[1] = { ...updatedValidation[1], value: true };
        } else {
          updatedValidation[1] = { ...updatedValidation[1], value: false };
        }

        const atLeastOneLowerCaseRegex = /[a-z]/;
        if (atLeastOneLowerCaseRegex.test(innerRef.current.value)) {
          updatedValidation[2] = { ...updatedValidation[2], value: true };
        } else {
          updatedValidation[2] = { ...updatedValidation[2], value: false };
        }

        if (innerRef.current.value.length >= 8) {
          updatedValidation[3] = { ...updatedValidation[3], value: true };
        } else {
          updatedValidation[3] = { ...updatedValidation[3], value: false };
        }

        const space = /^\S*$/;
        if (space.test(innerRef.current.value) && innerRef.current.value.length >= 1) {
          updatedValidation[4] = { ...updatedValidation[4], value: true };
        } else {
          updatedValidation[4] = { ...updatedValidation[4], value: false };
        }
        setPassValidation(updatedValidation);
      }

      setIsTyping(true)

    }
  }, [innerRef?.current?.value]);

  const handleKeyDown = () => {

  }




  // };

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

  // const handleErrorStyling = (value: any) => {
  //   if (value) {
  //     if (containerDivRef.current) {
  //       containerDivRef.current.classList.remove("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2")
  //       containerDivRef.current.classList.add("border-red-800", "border-2", "border-solid");
  //     }
  //   } else {
  //     if (containerDivRef.current) {
  //       containerDivRef.current.classList.remove("border-red-800", "border-2", "border-solid")
  //       containerDivRef.current.classList.add("ring-2", "ring-inset", "ring-offset-2", "ring-textDark", "border-gray-700", "border-dashed", "border-2");
  //     }
  //   }
  // }


  return (
    <>
      {(() => {

        switch (options.type) {
          case "email":
            return (
              <>
                <div className="block">
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
                  <ErrorMessage name={options.name} component={FormikCustomError} />
                </div>
              </>
            )
          case 'password':
            return (
              <>
                <div className="block">
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
                    />

                  </FFormInputConainter >
                  <ErrorMessage name={options.name} component={FormikCustomError} />
                  {
                    isTyping && options.passwordCheck ?
                      passValidation.map((option, index) => {
                        return (
                          <div className={`flex text-center py-1 ${index == 0 ? 'pt-4' : ''}`} key={index}>
                            <CheckCircleIcon className={`h-5 w-5 mt-[3px] ${option.value ? "text-white  fill-hyperLinks" : ""}`}></CheckCircleIcon>
                            <label className={`pl-1 ${option.value ? "text-hyperLinks underline " : ""}`}>{option.title}</label>
                          </div>
                        );
                      })
                      :
                      ""
                  }
                  
                </div>
              </>
            )

          case 'text':
            return (
              <>
                <div className="block">
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

                  <ErrorMessage name={options.name} component={FormikCustomError} />
                </div>
              </>
            )
          case "check":

            return (
              <>
                <div className="block">
                  <Checkbox
                    options={options}
                    style={style}
                    classes=""
                    innerRef={innerRef}
                  />
                  <ErrorMessage name={options.name} component={FormikCustomError} />
                </div>
              </>
            )
          case "date":
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <DateField
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
          case "number":
            return (
              <FFormInputConainter
                toggleFloatingLabel={toggleFloatingLabel}
                containerDivRef={containerDivRef}
                handleBlur={handleBlur}
                isFocused={isFocused}
                options={options}>
                <Number
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

export const DateField = ({ options, style, classes, innerRef, isFocused,
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
      {/* {
        isTyping && (
          <XMarkIcon
            onClick={handleXButton}
            className="transition-all duration-100 ease-in-out hover:mr-1  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3" />
        )
      } */}
    </>
  )
}
const Password = ({ options, style, classes, innerRef, isFocused,
  toggleFloatingLabel, setIsFocused, handleKeyDown, isTyping, handleXButton }: ComponentProps) => {

  const [isVisible, setIsVisible] = useState({ type: "password", isVisible: false })

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.type = isVisible.type
    }
  })

  const handleEye = () => {
    if (innerRef.current) {
      if (innerRef.current.type == "text") {
        innerRef.current.type = "password"
        setIsVisible({ type: "password", isVisible: !isVisible.isVisible })
      } else {
        innerRef.current.type = "text"
        setIsVisible({ type: "text", isVisible: !isVisible.isVisible })
      }
    }
  }


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
          <>
            <XMarkIcon
              onClick={handleXButton}
              className="transition-all duration-100 ease-in-out hover:mr-1  hover:text-textDark cursor-pointer absolute top-0 right-0 w-[50px] h-full p-3" />
            {

              isVisible.isVisible ?
                <EyeSlashIcon
                  onClick={handleEye}
                  className="transition-all duration-100
ease-in-out hover:mr-[37px]
hover:text-textDark 
cursor-pointer absolute top-0
right-0 w-[50px] h-full p-3 mr-[35px]" />

                :
                <EyeIcon
                  onClick={handleEye}
                  className="transition-all duration-100
   ease-in-out hover:mr-[37px]
hover:text-textDark 
  cursor-pointer absolute top-0
   right-0 w-[50px] h-full p-3 mr-[35px]" />

            }

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

const Number = ({ options, style, classes, innerRef, isFocused,
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
          type="checkbox"
          id={options.id}
          name={options.name}
          className={`${classes} ${style} h-5 w-5 min-w-5 text-hyperLinks bg-gray-100 border-hyperLinks rounded focus:ring-hyperLinks dark:focus:ring-hyperLinks dark:ring-offset-hyperLinksfocus:ring-2 dark:bg-hyperLinks dark:border-hyperLinks checked:text-hyperLinks `}
          autoComplete="off"
          innerRef={innerRef}
        />
        <div className={` ml-2 `} dangerouslySetInnerHTML={{ __html: options?.label }} />
      </div>
    </>

  )
}