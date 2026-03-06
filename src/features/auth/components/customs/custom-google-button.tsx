import { Toast } from '@/components/toast';
import { LoaderCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useGoogleLogin } from '@react-oauth/google';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/provider/auth-provider';

type GoogleButtonProps = {
   text: string;
};

export default function GoogleButton({ text }: GoogleButtonProps) {
   const navigate = useNavigate();
   const { handleOAuthLogin } = useAuth();

   const { mutateAsync, isPending } = useMutation({
      mutationFn: handleOAuthLogin
   });

   const login = useGoogleLogin({
      onSuccess: async (data) => {
         try {
            const response = await mutateAsync(data.access_token);

            if (response.data?.user?.firstLogin == true) {
               navigate({ to: '/auth/complete-profile' });
            } else {
               const userRole = response.data.user.role;

               if (userRole === 'guest' || userRole === 'intern') {
                  navigate({ to: '/user-profile' });
               } else {
                  navigate({ to: '/unauthorized' });
               }
            }
         } catch {
           Toast({
   icon: <AlertCircle className="text-red-500" />,
   title: 'Failed',
   description: 'Please try again!'
});
         }
      },
      onError: () => {
         Toast({
   icon: <AlertCircle className="text-red-500" />,
   title: 'Failed',
   description: 'Please try again!'
});
      }
   });

   return (
      <button
         disabled={isPending}
         type="button"
         onClick={() => login()}
         className="flex items-center gap-2 w-full bg-white px-4 py-2 border-none rounded-md text-sm font-medium transition duration-150 justify-center hover:bg-[#ffffff94] hover:cursor-pointer"
      >
         {isPending ? (
            <LoaderCircle className="animate-spin text-primary" />
         ) : (
            <>
               <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="w-5 h-5 bg-white"
               />
               <span className="text-custom-secondary text-xs text-google-color font-normal">
                  {text}
               </span>
            </>
         )}
      </button>
   );
}
