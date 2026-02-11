import { Button } from '../button';
import { cn } from '../../../lib/utils';
import { cva } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import type { HTMLAttributes, ReactNode } from 'react';
interface CustomButtonProps extends HTMLAttributes<HTMLButtonElement> {
   text: ReactNode;
   disabled?: boolean;
   className?: string;
   theme:
      | 'primary'
      | 'secondary'
      | 'danger'
      | 'outlet_primary'
      | 'outlet_secondary'
      | 'default'
      | 'success';
   type?: 'button' | 'submit' | 'reset';
   pending?: boolean;
}

const buttonVariants = cva(
   'w-full text-white transition-all duration-300 h-button cursor-pointer font-bold rounded-md',
   {
      variants: {
         theme: {
            primary: '!bg-primary hover:!bg-primary-700',
            secondary: '!bg-button-disable text-primary-300',
            danger: '!bg-danger-500 hover:!bg-danger-700 ',
            outlet_primary:
               '!bg-transparent hover:!bg-primary hover:text-white text-primary border-1 border-primary',
            outlet_secondary:
               '!bg-transparent hover:!bg-danger-600 hover:text-white text-danger-500 border-1 border-danger-500',
            default: '!bg-gray-600 hover:!bg-gray-700',
            success: '!bg-green-600 hover:!bg-green-700'
         },
         defaultVariants: {
            theme: 'primary'
         }
      }
   }
);

export default function CustomButton({
   text,
   theme,
   type,
   disabled,
   className,
   pending = false,
   ...props
}: CustomButtonProps) {
   return (
      <Button
         type={type}
         className={cn(buttonVariants({ theme }), className)}
         disabled={disabled || pending}
         {...props}
      >
         {pending ? <LoaderCircle className="animate-spin" /> : text}
      </Button>
   );
}
