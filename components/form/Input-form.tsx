import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Input } from "@/components/ui/input";

interface InputFieldProps<T extends FieldValues> extends React.ComponentProps<typeof Input> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    icon?: React.ReactNode;
    type?: "text" | "number" | "password" | "email" | "url" | "date" | "datetime-local" | "time" | "week" | "month" | "tel" | "color";
    className?: string;
    placeholder: string
    rules?: RegisterOptions<T, Path<T>>;
}

const InputForm = <T extends FieldValues>({
    name,
    control,
    label,
    type,
    placeholder,
    className,
    rules,
    ...inputProps
}: InputFieldProps<T>) => {
    const defaultRules = {
        ...rules,
        required: {
            value: true,
            message: `${label} is required`
        },
        ...(type === 'email' && {
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
            }
        }),
        ...(type === 'password' && {
            minLength: {
                value: 5,
                message: 'Password must be at least 8 characters'
            }
        }),
        ...(type === 'tel' && {
            pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: 'Invalid phone number'
            }
        }),
        ...(type === 'url' && {
            pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: 'Invalid URL'
            }
        })
    } as RegisterOptions<T>; // ✅ Cast to RegisterOptions<T>

    return (
        <FormField
            control={control}
            name={name}
            rules={defaultRules}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...inputProps}
                            {...field}
                            type={type || 'text'}
                            step={type === 'number' ? 1 : undefined}
                            placeholder={placeholder}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}


export default InputForm