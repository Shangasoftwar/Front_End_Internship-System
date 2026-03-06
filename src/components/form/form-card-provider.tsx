import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle
} from '@/components/ui/card';
import type { ReactNode } from 'react';
import { Form } from '@/components/ui/form';
import type { UseFormReturn, FieldValues } from 'react-hook-form';

interface FormCardProviderProps<T extends FieldValues> {
   footer?: ReactNode;
   cardClassName?: string;
   children: ReactNode;
   form: UseFormReturn<T>;
   cardHeading?: ReactNode;
   description?: ReactNode;
   cardHeaderStyle?: string;
   title?: string | ReactNode;
   cardTitleClassName?: string;
   contianerClassName?: string;
   cardContentClassName?: string;
   onSubmit: (values: T) => void;
   descriptionClassName?: string;
}

export function FormCardProvider<T extends FieldValues>({
   form,
   title,
   footer,
   children,
   onSubmit,
   description,
   cardHeading,
   contianerClassName,
   cardTitleClassName,
   descriptionClassName,
   cardContentClassName,
   cardClassName,
   cardHeaderStyle
}: FormCardProviderProps<T>) {
   return (
      <div className={`h-full w-full flex items-center justify-center ${contianerClassName}`}>
         {cardHeading}
         <Card
            className={`flex flex-col border-none shadow-none items-center justify-center w-full max-w-[500px] min-h-auth-card my-5 bg-card rounded-2xl md:-m-5 ${cardClassName}`}
         >
            <CardHeader className={`w-full text-center  ${cardHeaderStyle}`}>
               <CardTitle className={` ${cardTitleClassName}`}>{title}</CardTitle>
               {description && (
                  <CardDescription className={descriptionClassName}>{description}</CardDescription>
               )}
            </CardHeader>
            <CardContent className={`${cardContentClassName}`}>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
               </Form>
            </CardContent>
            <CardFooter className="w-full items-center justify-center ">{footer}</CardFooter>
         </Card>
      </div>
   );
}
