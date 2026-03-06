export type PasswordRule = 'length' | 'uppercase' | 'lowercase' | 'number' | 'special';

export const passwordValidationRules: {
   rule: PasswordRule;
   test: (password: string) => boolean;
   message: string;
}[] = [
   {
      rule: 'length',
      test: (pwd) => pwd.length >= 8,
      message: 'minimum 8 characters'
   },
   {
      rule: 'uppercase',
      test: (pwd) => /[A-Z]/.test(pwd),
      message: 'use uppercase'
   },
   {
      rule: 'lowercase',
      test: (pwd) => /[a-z]/.test(pwd),
      message: 'use lowercase'
   },
   {
      rule: 'number',
      test: (pwd) => /\d/.test(pwd),
      message: 'number'
   },
   {
      rule: 'special',
      test: (pwd) => /[^A-Za-z0-9]/.test(pwd),
      message: 'use symbol'
   }
];
