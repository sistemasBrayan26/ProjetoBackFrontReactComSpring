import { InputHTMLAttributes } from "react";
import { formatReal } from '@/src/app/util/money'
import { FormatUtils } from "@4us-dev/utils";

const formaUtils = new FormatUtils();

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

export const InputCPF : React.FC<InputProps> = (props : InputProps) => {
    return (
        <Input {... props} formatter={formaUtils.formatCPF} />
    )
}

export const InputTelefone : React.FC<InputProps> = (props : InputProps) => {
    return (
        <Input {... props} formatter={formaUtils.formatPhone} />
    )
}

export const InputDate : React.FC<InputProps> = (props : InputProps) => {

    const formatData = (value : string) => {
        if (!value){
            return '';
        }

        const data = formaUtils.formatOnlyIntegers(value);
        const size = value.length;

        if (size <= 2){
            return data;
        }

        if (size <= 4){
            return data.substr(0, 2) + "/" + data.substr(2, 2);
        }

        if (size <= 6){
            return data.substr(0, 2) + "/" + data.substr(2, 2) + "/" + data.substr(4, 2);
        }
    }

    return (
        <Input {... props} maxLength={10} formatter={formatData} />
    )
}