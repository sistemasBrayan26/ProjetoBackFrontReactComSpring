import { InputHTMLAttributes } from "react";
import { formatReal } from '@/app/util/money'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (value: any) => void;
    label: string;
    columnClasses?: string;
    id: string;
    currency?: boolean;
}

export const Input: React.FC<InputProps> = ({
    onChange, label, columnClasses, id, currency, ...inputProps
}: InputProps) => {

    const onInputChange = (event : any) => {
        let value = event.target.value;

        if (value && currency) {
            value = formatReal(value)
        }

        if (onChange) {
            onChange(value)
        }
    }

    return (
        <div className='column'>
            <div className={`field ${columnClasses}`}>
                <label htmlFor={id} className='label'> {label}</label>
                <div className='control'>
                    <input className='input' type="text" id={id} {...inputProps} onChange={onInputChange} />
                </div>
            </div>
        </div>
    )
}