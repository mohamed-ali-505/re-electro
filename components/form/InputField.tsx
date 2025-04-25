import { useController, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Input } from "@/components/ui/input";
import React from "react";

interface InputFieldProps<T extends FieldValues> extends React.ComponentProps<typeof Input> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: RegisterOptions<T, Path<T>>;
    icon?: React.ReactNode;
}

export function InputField<T extends FieldValues>({
    name,
    control,
    label,
    icon,
    rules,
    className,
    ...inputProps
}: InputFieldProps<T>) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
    } = useController({ name, control, rules });

    return (
        <div className={`grid gap-2 ${className}`}>
            {label && <label className="text-sm font-medium capitalize">{label}</label>}
            <div className={icon ? "relative w-full" : ""}>
                <Input
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${error ? "border-red-500" : ""}`}
                    {...inputProps} // Spread all remaining input props
                />
                {icon && icon}
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
    );
}
