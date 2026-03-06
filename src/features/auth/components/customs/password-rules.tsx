import { CheckIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { passwordValidationRules, type PasswordRule } from '@/helper/password-rules';

type PasswordRulesProps = {
   title: string;
   password?: string;
   rule: PasswordRule;
};

export function PasswordRules({ title, password = '', rule }: PasswordRulesProps) {
   const ruleObj = passwordValidationRules.find((r) => r.rule === rule);
   const isValid = ruleObj?.test(password) ?? false;

   return (
      <div className="flex items-center gap-3">
         <div
            className={`rounded-full border-0 w-4 h-4 flex items-center justify-center ${
               isValid ? 'bg-green-500' : 'bg-gray-300'
            }`}
         >
            <CheckIcon className={`size-3.5 ${isValid ? 'text-white' : 'text-gray-100'}`} />
         </div>
         <Label className="text-gray-700 text-xs">{title}</Label>
      </div>
   );
}
