import { Phone, Linkedin } from 'lucide-react';
import Mail from '@/assets/images/email.svg';
import Map from '@/assets/images/Map.svg';
import logo from '@/assets/images/salahaddinlogo.png';
export default function Footersect() {
   return (
      <footer className="bg-primary-500 text-white  md:h-[300px] h-auto min-h-[300px] ">
         <div className="flex md:flex-row flex-col md:pt-[20px] pt-4">
                 <div className="flex items-center gap-3 font-extrabold text-2xl m">
            <img src={logo}  alt="Salahaddin Logo" className="h-12 w-12" />
             <div className="md:pr-[40px] px-4 md:mb-0 mb-8">
               <span className="text-primary-100">Salahaddin</span>{' '}
               <span className="text-gray-700">Internship</span>
            </div>
            </div>
   
            <div className="md:pr-[40px] px-4 md:mb-0 mb-8">
               <h3 className="mb-2 text-xl font-bold ">Contact Us</h3>
               <div className="w-[83px] h-[2px] bg-danger-500 rounded-[5px] mb-6"></div>
               <div className="space-y-4 text-base">
                  <div className="flex items-center gap-3">
                     <Phone className="w-5 h-5" fill="currentColor" strokeWidth={0.1} />
                     <span >07504477375</span>
                  </div>
                  <div className="flex items-center gap-3 ">
                     <img src={Mail} alt="Mail" className="w-5 h-5" />
                    <span >activity@su.edu.krd</span>
                  </div>
                  <div className="flex items-center gap-3 ">
                     <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={0.5} />
                     <span>linked in</span>
                  </div>
               </div>
            </div>

            <div className="md:pr-[80px] px-4 md:mb-0 mb-8 ">
               <h3 className="text-lg font-semibold mb-2">Our Location</h3>
               <div className="w-[83px] h-[2px] bg-danger-500 rounded-sm mb-6"></div>
               <div className="flex items-center gap-3 text-base">
                  <img src={Map} alt="Mail" className="w-5 h-5" />
                  <span>Get Directions</span>
               </div>
            </div>
         </div>

         <div className="md:pl-[40px] pl-4 md:mt-0 mt-4">
            <p className="text-xs">
               <span className="opacity-75">© 2026 Slahaddin All rights reserved </span>
               <span className="text-danger-500 w-[2px] pr-0.5">|</span>
               Privacy & Policy
            </p>
         </div>
      </footer>
   );
}
