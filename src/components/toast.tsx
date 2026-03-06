import { toast } from 'sonner';
import type { ReactNode } from 'react';
interface ToastConfig {
   title: string;
   description?: string;
   icon?: ReactNode;
}
export const Toast = ({ title, description, icon }: ToastConfig) => {
   toast(title, {
      description: description,
      icon: icon,
      className: '!text-grey-600 !gap-4  !bg-white !border-l-4  !border-0  !rounded-[8px]'
   });
};
