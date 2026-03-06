import CustomButton from '../../components/ui/customs/custom-button.tsx';
import { useNavigate } from '@tanstack/react-router';

export default function HomePage() {
   return (
      <div className="relative flex flex-col items-center justify-between min-h-screen py-[150px]">
         <Background />
         <ImageSection />       
         <TextContent />        
         <div />                
      </div>
   );
}

function Background() {
   return (
      <>
         <div
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(src/assets/images/HomeBg.jpg)` }}
         />
         <div className="absolute inset-0 -z-10 backdrop-blur-md" />
      </>
   );
}

function TextContent() {
   return (
      <div className="flex flex-col items-center text-center gap-3 px-4 ">
         <h2 className="text-gray-800 font-semibold text-2xl">
            Ready to apply? Let's get you started
         </h2>
         <p className="text-gray-700 text-base sm:text-lg max-w-md">
            Internship applications are only available to registered users.
            Sign in or create an account to access applications.
         </p>
         <ActionButtons />
      </div>
   );
}

function ActionButtons() {
   const navigate = useNavigate();

   return (
      <div className="flex gap-3 mt-12">
         <CustomButton
            type="button"
            text="Sign up"
            theme="primary"
            onClick={() => navigate({ to: '/auth/sign-up' })}
            className="w-28 h-10 rounded-lg !bg-primary-500 hover:bg-primary-600 transition-colors"
         />
         <CustomButton
            type="button"
            text="Sign in"
            theme="secondary"
            onClick={() => navigate({ to: '/auth/sign-in' })}
            className="w-28 h-10 rounded-lg transition-colors"
         />
      </div>
   );
}

function ImageSection() {
   return (
      <div className=" flex justify-center items-center mb-4">
         <img
            src="./src/assets/images/salahaddinlogo.png"
            alt="Illustration"
            className="w-40 h-auto object-contain"
         />
      </div>
   );
}