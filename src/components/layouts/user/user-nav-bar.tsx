import { Link } from '@tanstack/react-router';
import { SlidersHorizontal } from 'lucide-react';
import logo from '@/assets/images/salahaddinlogo.png';
import { useState } from 'react';

const NAV_LINKS = [
   { id: 'home', label: 'Home', hash: 'home' },
   
   //{ id: 'features', label: 'Features', hash: 'features' },
   { id: 'Help', label: 'Help', hash: 'Help' },
   { id: 'about', label: 'About', hash: 'about' },
   { id: 'contact', label: 'Contact', hash: 'contact' }
] as const;

export default function Navbar() {
   const [showMobileNav, setShowMobileNav] = useState(false);
   const linkClasses =

      'text-xl text-dark-grey hover:text-primary-500 hover:underline underline-offset-[20px] transition-colors';
   const mobileLinkClasses = `${linkClasses} py-3 px-4 rounded-lg`;
   
   return (
    <header className="sticky top-0 z-50 w-full h-20 px-5 flex justify-between items-center 
bg-white/70 backdrop-blur-lg max-w-full mx-auto border-b border-gray-200 shadow-sm">

         <div className="flex items-center gap-3 font-extrabold text-2xl">
            <img src={logo}  alt="Salahaddin Logo" className="h-12 w-12" />
            <div>
               <span className="text-primary-500">Salahaddin</span>{' '}
               <span className="text-dark-grey">Internship</span>
            </div>
         </div>
         <nav className="hidden sm:flex items-center space-x-6 md:space-x-8">
            {NAV_LINKS.map((link) => (
               <Link key={link.id} to="/" hash={link.hash} className={linkClasses}>
                  {link.label}
               </Link>
            ))}
         </nav>
         <button
            className="sm:hidden text-dark-grey hover:text-primary-500  transition-colors p-2"
            onClick={() => setShowMobileNav(!showMobileNav)}
            aria-label="Toggle navigation menu"
         >
            <SlidersHorizontal />
         </button>
         {showMobileNav && (
            <nav className="absolute top-20 left-0 right-0 bg-white sm:hidden shadow-lg">
               <div className="flex flex-col p-5 space-y-2">
                  {NAV_LINKS.map((link) => (
                     <Link
                        key={link.id}
                        to="/"
                        hash={link.hash}
                        className={mobileLinkClasses}
                        onClick={() => setShowMobileNav(false)}
                     >
                        {link.label}
                     </Link>
                  ))}
               </div>
            </nav>
         )}
      </header>
   );
}