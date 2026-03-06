
import { createFileRoute } from '@tanstack/react-router'
import UserNavBar from '../components/layouts/user/user-nav-bar';
import HomePage from'../features/landing/Home.tsx';
import AboutUs from '../features/landing/Aboutus.tsx' ;
import Help from '../features/landing/Help.tsx' ;
import Contact from '../components/layouts/user/user-contact-bar.tsx' ;
import '@/index.css';

export const Route = createFileRoute('/')({
   component: RouteComponent
});

function RouteComponent() {
   return (
      <div>
         <UserNavBar />
         <HomePage/>
          <Help/>
         <AboutUs/>
         <Contact/>
        
      </div>
   );
}