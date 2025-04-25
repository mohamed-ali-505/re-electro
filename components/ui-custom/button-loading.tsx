import React from 'react';
import { Button } from '../ui/button'; // Assuming this is your custom Button component from ShadCN
import { Loader2 } from 'lucide-react'; // Icon for the spinner

// Define the type of custom props and extend the default props of Button
interface ButtonLoadingProps extends React.ComponentProps<typeof Button> {
    loading: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    noText?: boolean;
}

const ButtonLoading: React.FC<ButtonLoadingProps> = ({
    loading,
    children,
    className = '',
    disabled,
    noText = false,
    ...rest
}) => {
    return (
        <Button
            {...rest} // Pass all the default Button props
            disabled={loading || disabled} // Disable the button when loading
            className={`flex items-center justify-center space-x-2 ${className}`}
        >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            {loading && noText ? null : children}
            {/* {loading ? (
                <div className="flex items-center space-x-2">
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )} */}
        </Button>
    );
};

export default ButtonLoading;
