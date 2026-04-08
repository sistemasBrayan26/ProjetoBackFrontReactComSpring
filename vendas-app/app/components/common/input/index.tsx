import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange: (value : any) => void;
    label : string;
    columnClasses? : string;
    id : string;
}

export const Input: React.FC<InputProps> = ({
    onChange, label, columnClasses, id, ...inputProps
} : InputProps) => {
    return (
        <div className='column'>
            <div className={`field ${columnClasses}`}>
                <label htmlFor={id} className='label'> {label}</label>
                <div className='control'>
                    <input className='input' type="text" id={id} {...inputProps} onChange={event => 
                        onChange(event.target.value)} />
                </div>
            </div>
        </div>
    )
}