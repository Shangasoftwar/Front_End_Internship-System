import Person from '@/assets/person.svg';
import FillForm from '@/assets/form.svg';
import SubmitForm from '@/assets/submit.svg';
import { HelpAccordion } from '@/features/user-profile/help/help-accordion.tsx';

export default function Help() {
   return (
      <div
         id="help"
         className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[80px] py-20 bg-white min-h-[408px]"
      >
         <div className="w-16 sm:w-20 lg:w-[100px] h-1 lg:h-[5px] bg-danger-500 rounded-2xl mb-2" />
         <header className="mb-12">
            <h2 className="text-xl font-bold text-gray-600 hover:text-primary-500">Help</h2>
            <p className="text-base text-gray-700 mt-1">Got questions? We've got answers.</p>
         </header>
         <div className="flex flex-col space-y-7">
            <HelpAccordion
               title="Who can apply?"
               description="Anyone can apply, including students and indivduals who have relevant knowledge about the subject"
            />
            <HelpAccordion
               title="How can I apply?"
               description={
                  <div className="flex flex-col sm:flex-row sm:justify-between pb-4 pt-2 gap-4 sm:gap-2">
                     <div className="flex flex-col items-center gap-1 text-gray-600">
                        <Person />
                        <h1 className="text-base font-semibold">Create an account</h1>
                        <p className="text-sm text-center">
                           Because internship applications are only available to registered users
                        </p>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                        <FillForm />
                        <h1 className="text-base font-semibold text-center">Fill application form</h1>
                        <p className="text-sm text-center">
                           it is including your personal and educational information
                        </p>
                     </div>
                     <div className="flex flex-col items-center gap-1">
                        <SubmitForm />
                        <h1 className="text-base font-semibold">Submit the form</h1>
                        <p className="text-sm text-center">
                           confirm and submit your application to complete the proccess
                        </p>
                     </div>
                  </div>
               }
            />
            <HelpAccordion
               title="How long will the internship period be?"
               description="The interns will decide the duration of the internship themselves"
            />
            <HelpAccordion
               title="Can I cancel the internship if I am unable to participate?"
               description="Yes, the intern can cancel the internship on their own if they are unable to attend during the scheduled period"
            />
            <HelpAccordion
               title="How will the evaluation will be conducted?"
               description="The supervisor will review the intern's application form and evaluate it based on their experience"
            />
         </div>
      </div>
   );
}
