import React from 'react';
import FormsControlsCSS from './FormsControls.module.css';

const FormControl = ({ input, meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={FormsControlsCSS.formControl + " " + (hasError ? FormsControlsCSS.error : "")}>
            {children}
            <div>
                {hasError && <span> {error} </span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (<FormControl {...props} ><textarea {...input}{...restProps} /></FormControl>)
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (<FormControl {...props} ><input {...input}{...restProps} /></FormControl>)
}