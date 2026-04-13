import { InputHTMLAttributes } from "react";
import { formatReal } from '@/app/util/money'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    columnClasses?: string;
    id: string;
    error?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    label, columnClasses, formatter, onChange, id, error, ...inputProps
}: InputProps) => {

    const onInputChange = (event : any) => {
        let value = event.target.value;
        const name = event.target.name;

        const formattedValue = (formatter && formatter(value as string)) || value;

        onChange ({
            ... event, 
            target : {
                name, value: formattedValue
            }
        })

    }

    return (
        <div className='column'>
            <div className={`field ${columnClasses}`}>
                <label htmlFor={id} className='label'> {label}</label>
                <div className='control'>
                    <input className='input' type="text" id={id} {...inputProps} onChange={onInputChange} />
                     {
                        error && <p className="help is-danger">{error}</p>
                    } 
                </div>
            </div>
        </div>
    )
}

export const InputMoney : React.FC<InputProps> = (props : InputProps) => {
    return (
        <Input {... props} formatter={formatReal} />
    )
}