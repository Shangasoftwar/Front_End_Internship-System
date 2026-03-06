import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { useState, type ReactNode } from 'react';
import { CalendarIcon, Check, ChevronsUpDown, Eye, EyeOff, FileText, Trash2 } from 'lucide-react';
import type { FieldValues, Path, PathValue, UseFormReturn } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import type { DateRange } from 'react-day-picker';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList
} from '../ui/command';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Dropzone, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone/index.tsx';

interface CustomInputFieldProps<T extends FieldValues> {
   name: Path<T>;
   type?: string;
   label?: string;
   icon?: ReactNode;
   disabled?: boolean;
   placeholder?: string;
   errorMessage?: string;
   className?: string;
   onClick?: () => void;
   showMessage?: boolean;
   form: UseFormReturn<T>;
   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface CustomOTPInputFieldProps<T extends FieldValues> extends CustomInputFieldProps<T> {
   pattern?: 'only-digits' | 'only-digits-and-chars';
}
interface CustomSelectFieldProps<T extends FieldValues> extends CustomInputFieldProps<T> {
   options: { label: string; value: string }[];
}

export function CustomInputField<T extends FieldValues>({
   form,
   name,
   type,
   label,
   icon,
   onClick,
   onChange,
   className,
   placeholder,
   errorMessage,
   disabled = false,
   showMessage = false
}: CustomInputFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field, fieldState }) => (
            <FormItem className="gap-1">
               <div className="flex items-center justify-between">
                  <FormLabel className="text-label text-sm">{label}</FormLabel>
               </div>
               <FormControl>
                  <div className="relative">
                     <Input
                        className={cn(
                           'bg-white border rounded-md text-gray-700 h-button !text-sm shadow-none',
                           fieldState.error
                              ? 'border-danger-500 text-danger-500'
                              : 'border-transparent focus:border-primary-500',
                           className
                        )}
                        type={type ?? 'text'}
                        placeholder={placeholder}
                        {...field}
                        disabled={disabled}
                        onChange={(e) => {
                           field.onChange(e);
                           onChange?.(e);
                        }}
                     />
                     {icon && (
                        <span
                           onClick={onClick}
                           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                           {icon}
                        </span>
                     )}{' '}
                  </div>
               </FormControl>
               {showMessage && (
                  <FormMessage className="text-end text-danger-500 text-xs opacity-75">
                     {errorMessage ?? fieldState.error?.message}
                  </FormMessage>
               )}
            </FormItem>
         )}
      />
   );
}

export function CustomOTPInputField<T extends FieldValues>({
   form,
   name,
   pattern,
   onChange,
   disabled = false
}: CustomOTPInputFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         disabled={disabled}
         render={({ field }) => (
            <FormItem className="w-full justify-center">
               <FormControl>
                  <InputOTP
                     className="gap-3"
                     pattern={
                        pattern === 'only-digits'
                           ? REGEXP_ONLY_DIGITS
                           : REGEXP_ONLY_DIGITS_AND_CHARS
                     }
                     maxLength={6}
                     {...field}
                     onChange={(value) => {
                        field.onChange(value);
                        if (onChange) {
                           const syntheticEvent = {
                              target: { value }
                           } as React.ChangeEvent<HTMLInputElement>;
                           onChange(syntheticEvent);
                        }
                     }}
                  >
                     <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                     </InputOTPGroup>

                     <InputOTPGroup className="gap-2">
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                     </InputOTPGroup>
                  </InputOTP>
               </FormControl>
            </FormItem>
         )}
      />
   );
}

export function CustomPasswordInput<T extends FieldValues>({
   form,
   name,
   label,
   className,
   showPassword,
   toggleShowPassword,
   placeholder,
   errorMessage,
   showMessage = false
}: {
   form: UseFormReturn<T>;
   name: Path<T>;
   label?: string;
   showPassword?: boolean;
   toggleShowPassword: () => void;
   placeholder: string;
   showMessage?: boolean;
   errorMessage?: string;
   className?: string;
}) {
   return (
      <CustomInputField
         form={form}
         label={label}
         name={name}
         className={className}
         errorMessage={errorMessage}
         showMessage={showMessage}
         placeholder={placeholder}
         type={showPassword ? 'text' : 'password'}
         onClick={toggleShowPassword}
         icon={
            showPassword ? (
               <EyeOff className="w-5 h-5 text-gray-200" />
            ) : (
               <Eye className="w-5 h-5 text-gray-200" />
            )
         }
      />
   );
}

export function CustomSelectField<T extends FieldValues>({
   form,
   name,
   label,
   options,
   className,
   placeholder,
   showMessage,
   errorMessage
}: CustomSelectFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field, fieldState }) => (
            <FormItem className={cn('w-full', className)}>
               <FormLabel className="text-label -mb-1 text-sm">{label}</FormLabel>
               <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                     <SelectTrigger className={cn('bg-white w-full py-5', className)}>
                        <SelectValue placeholder={placeholder} />
                     </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                     {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                           {option.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {showMessage && (
                  <FormMessage className="text-end text-danger-500 text-xs opacity-75">
                     {errorMessage ?? fieldState.error?.message}
                  </FormMessage>
               )}
            </FormItem>
         )}
      />
   );
}
export function CustomSearchAndSelectField<T extends FieldValues>({
   name,
   label,
   form,
   options,
   className,
   placeholder = 'Select...'
}: CustomSelectFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="text-label -mb-1 text-sm">{label}</FormLabel>
               <Popover>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant="outline"
                           role="combobox"
                           className={cn(
                              'justify-between w-full border-gray-100 focus:border-primary-500',
                              !field.value && 'text-muted-foreground',
                              className
                           )}
                        >
                           {field.value
                              ? options.find((option) => option.value === field.value)?.label
                              : `Select your ${label}`}
                           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                     <Command>
                        <CommandInput placeholder={placeholder} />
                        <CommandList>
                           <CommandEmpty>{`No ${label} found.`}</CommandEmpty>
                           <CommandGroup>
                              {options.map((option) => (
                                 <CommandItem
                                    value={option.label}
                                    key={option.value}
                                    onSelect={() => {
                                       field.onChange(option.value);
                                    }}
                                 >
                                    <Check
                                       className={cn(
                                          'mr-2 h-4 w-4',
                                          option.value === field.value ? 'opacity-100' : 'opacity-0'
                                       )}
                                    />
                                    {option.label}
                                 </CommandItem>
                              ))}
                           </CommandGroup>
                        </CommandList>
                     </Command>
                  </PopoverContent>
               </Popover>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}

export function CustomDateRangeField<T extends FieldValues>({
   form,
   name,
   label,
   className,
   placeholder = 'Pick a date range'
}: CustomInputFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="text-label -mb-1 text-sm">{label}</FormLabel>
               <Popover modal>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant="outline"
                           className={cn(
                              'w-full border-gray-100 focus:border-primary-500  justify-between pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              className
                           )}
                        >
                           {field?.value?.from ? (
                              field?.value?.to ? (
                                 <>
                                    {`[${format(field.value.from, 'dd LLL y')}]`} to{' '}
                                    {`[${format(field.value.to, 'dd LLL y')}]`}
                                 </>
                              ) : (
                                 format(field.value.from, 'dd LLL y')
                              )
                           ) : (
                              <span>{placeholder}</span>
                           )}
                           <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        mode="range"
                        selected={field.value as DateRange}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        initialFocus
                     />
                  </PopoverContent>
               </Popover>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
export function CustomDateField<T extends FieldValues>({
   form,
   name,
   label,
   className,
   placeholder
}: CustomInputFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex flex-col">
               <FormLabel className="text-label -mb-1 text-sm">{label}</FormLabel>
               <Popover modal>
                  <PopoverTrigger asChild>
                     <FormControl>
                        <Button
                           variant="outline"
                           className={cn(
                              'w-full border-gray-100 focus:border-primary-500  justify-between pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                              className
                           )}
                        >
                           {field.value ? (
                              format(field.value, 'dd LLL y')
                           ) : (
                              <span>{placeholder}</span>
                           )}
                           <CalendarIcon className="mr-2 h-4 w-4" />
                        </Button>
                     </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                     <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={1}
                        captionLayout="dropdown"
                     />
                  </PopoverContent>
               </Popover>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}
export function CustomChoiceField<T extends FieldValues>({
   form,
   name,
   label,
   options,
   className
}: CustomSelectFieldProps<T>) {
   return (
      <FormField
         control={form.control}
         name={name}
         render={({ field }) => (
            <FormItem className="space-y-3">
               <FormLabel className="text-label -mb-1 text-sm">{label}</FormLabel>
               <FormControl>
                  <RadioGroup
                     onValueChange={field.onChange}
                     defaultValue={field.value}
                     className={cn('flex flex-row', className)}
                  >
                     {options.map((option) => (
                        <FormItem key={option.value} className="flex items-center gap-3">
                           <FormControl>
                              <RadioGroupItem value={option.value} />
                           </FormControl>
                           <FormLabel className="font-normal">{option.label}</FormLabel>
                        </FormItem>
                     ))}
                  </RadioGroup>
               </FormControl>
               <FormMessage />
            </FormItem>
         )}
      />
   );
}

export function CustomUploadField<T extends FieldValues>({
   form,
   name,
   label,
   className
}: CustomInputFieldProps<T>) {
   const [file, setFile] = useState<File | null>(null);

   function handleDrop(acceptedFiles: File[]) {
      if (acceptedFiles.length > 0) {
         const uploadedFile = acceptedFiles[0];
         form.setValue(name, uploadedFile as PathValue<T, Path<T>>, { shouldValidate: true });
         setFile(uploadedFile);
      }
   }

   function handleRemove() {
      setFile(null);
      form.setValue(name, null as PathValue<T, Path<T>>, { shouldValidate: true });
   }

   return (
      <FormField
         control={form.control}
         name={name}
         render={() => (
            <FormItem className={cn('w-full', className)}>
               <FormLabel className="text-label text-sm">{label}</FormLabel>
               <FormControl>
                  <div className="flex flex-col">
                     <Dropzone
                        maxFiles={1}
                        maxSize={2 * 1024 * 1024}
                        onDrop={handleDrop}
                        accept={{
                           'application/pdf': ['.pdf'],
                           'image/jpeg': ['.jpg', '.jpeg'],
                           'image/png': ['.png']
                        }}
                     >
                        {file ? (
                           <div className="flex flex-col items-center gap-1">
                              <div className="mb-2">
                                 <FileText className="text-primary-500 size-8" />
                              </div>
                              <p className="text-sm font-medium text-gray-600">{file.name}</p>
                           </div>
                        ) : (
                           <DropzoneEmptyState caption="HEIC , JPG and PDF formats (2 MB)" />
                        )}
                     </Dropzone>

                     <div className="h-6 mt-2 flex flex-row justify-between items-center">
                        {file && (
                           <>
                              <a
                                 href={URL.createObjectURL(file)}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="underline text-sm text-gray-600"
                              >
                                 Click to view
                              </a>
                              <Trash2
                                 color="#424242"
                                 className="cursor-pointer"
                                 size={20}
                                 onClick={handleRemove}
                              />
                           </>
                        )}
                     </div>
                  </div>
               </FormControl>
            </FormItem>
         )}
      />
   );
}
