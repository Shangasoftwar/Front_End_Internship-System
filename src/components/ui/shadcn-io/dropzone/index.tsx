'use client';

import { CloudUpload, UploadIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { DropEvent, DropzoneOptions, FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DropzoneContextType = {
   src?: File[];
   accept?: DropzoneOptions['accept'];
   maxSize?: DropzoneOptions['maxSize'];
   minSize?: DropzoneOptions['minSize'];
   maxFiles?: DropzoneOptions['maxFiles'];
};

const DropzoneContext = createContext<DropzoneContextType | undefined>(undefined);

export type DropzoneProps = Omit<DropzoneOptions, 'onDrop'> & {
   src?: File[];
   className?: string;
   onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
   children?: ReactNode;
};

export const Dropzone = ({
   accept,
   maxFiles = 1,
   maxSize,
   minSize,
   onDrop,
   onError,
   disabled,
   src,
   className,
   children,
   ...props
}: DropzoneProps) => {
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept,
      maxFiles,
      maxSize,
      minSize,
      onError,
      disabled,
      onDrop: (acceptedFiles, fileRejections, event) => {
         if (fileRejections.length > 0) {
            const message = fileRejections.at(0)?.errors.at(0)?.message;
            onError?.(new Error(message));
            return;
         }

         onDrop?.(acceptedFiles, fileRejections, event);
      },
      ...props
   });

   return (
      <DropzoneContext.Provider
         key={JSON.stringify(src)}
         value={{ src, accept, maxSize, minSize, maxFiles }}
      >
         <Button
            className={cn(
               'relative h-auto w-full flex-col overflow-hidden p-8 border-[3px] border-primary-300 border-dotted',
               isDragActive && 'outline-none ring-1 ring-ring',
               className
            )}
            disabled={disabled}
            type="button"
            variant="outline"
            {...getRootProps()}
         >
            <input {...getInputProps()} disabled={disabled} />
            {children}
         </Button>
      </DropzoneContext.Provider>
   );
};

const useDropzoneContext = () => {
   const context = useContext(DropzoneContext);

   if (!context) {
      throw new Error('useDropzoneContext must be used within a Dropzone');
   }

   return context;
};

export type DropzoneContentProps = {
   children?: ReactNode;
   className?: string;
};

const maxLabelItems = 3;

export const DropzoneContent = ({ children, className }: DropzoneContentProps) => {
   const { src } = useDropzoneContext();

   if (!src) {
      return null;
   }

   if (children) {
      return children;
   }

   return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
         <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <UploadIcon size={16} />
         </div>
         <p className="my-2 w-full truncate font-medium text-sm">
            {src.length > maxLabelItems
               ? `${new Intl.ListFormat('en').format(
                    src.slice(0, maxLabelItems).map((file) => file.name)
                 )} and ${src.length - maxLabelItems} more`
               : new Intl.ListFormat('en').format(src.map((file) => file.name))}
         </p>
         <p className="w-full text-wrap text-muted-foreground text-xs">
            Drag and drop or click to replace
         </p>
      </div>
   );
};

export type DropzoneEmptyStateProps = {
   children?: ReactNode;
   className?: string;
   caption?: string;
};

export const DropzoneEmptyState = ({ children, className, caption }: DropzoneEmptyStateProps) => {
   const { src, maxFiles } = useDropzoneContext();

   if (src) {
      return null;
   }

   if (children) {
      return children;
   }
   if (maxFiles && maxFiles <= 0) {
      return (caption += 'max file is {maxFiles}, you cannot upload more files');
   }

   return (
      <div className={cn('flex flex-col items-center justify-center', className)}>
         <div>
            <CloudUpload className="text-primary-500 size-10" />
         </div>
         <p className="mt-2 w-full truncate text-wrap text-muted-foreground text-xs">
            <span className="text-black underline cursor-pointer">Click to upload</span> or drag and
            drop
         </p>
         {caption && <p className="text-wrap text-muted-foreground text-xs">{caption}</p>}
      </div>
   );
};
