import React, { RefObject } from 'react'
import { Field} from "formik";


interface StandardInputProps {
    options: {
        type: string;
        id: string;
        name: string;
        value: string | number;
        disabled?: boolean;
    };
    classes: string;
    style: string;
    innerRef: RefObject<HTMLDivElement>
    isFocused: boolean;
    toggleFloatingLabel: () => void;
    setIsFocused: () => void;
    handleKeyDown: () => void;
}


const FormikFSField: React.FC<StandardInputProps> = ({ options, classes, style,
    innerRef, isFocused, toggleFloatingLabel, setIsFocused, handleKeyDown}) => {
    return (
        <>
            <Field
                type={options.type}
                id={options.id}
                name={options.name}
                className={`${classes} ${style}`}
                autoComplete="off"
                innerRef={innerRef}
                disabled={options.disabled}
                onFocus={toggleFloatingLabel}
                onKeyDown={handleKeyDown}
                onBlur={(e: any) => setIsFocused(e.target.value !== '')}
            />
        </>
    )
}



export default FormikFSField