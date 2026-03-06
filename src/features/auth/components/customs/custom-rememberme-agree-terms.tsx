import { Link, type LinkProps } from '@tanstack/react-router';
import { Checkbox } from '../../../../components/ui/checkbox';

type customRememberAndAgree = {
   text: string;
   to: LinkProps['to'];
   button: string;
   check?: boolean;
   divClassName?: string;
   checkboxClassName?: string;
   onClick: undefined | (() => void);
};

export default function RememberAndAgree({
   to,
   text,
   check,
   button,
   onClick,
   divClassName,
   checkboxClassName
}: customRememberAndAgree) {
   return (
      <div className={divClassName}>
         <div className="flex items-center justify-center gap-1">
            <Checkbox checked={check} onClick={onClick} className={checkboxClassName} />
            <span className=" text-gray-400 text-xs">{text}</span>
         </div>
         <Link
            to={to}
            className={`${
               button !== 'Forgot password?' ? 'underline underline-offset-2' : 'no-underline'
            } text-xs text-primary hover:cursor-pointer`}
         >
            {button}
         </Link>
      </div>
   );
}
