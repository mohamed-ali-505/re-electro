import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Control, FieldValues, Path } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

interface InputFieldProps<T extends FieldValues> extends React.ComponentProps<typeof Textarea> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    className?: string;
    placeholder: string
}

const TextAreaForm = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    ...inputProps
}: InputFieldProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder={placeholder}
                            className='resize-none'
                            {...inputProps}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default TextAreaForm