
import { createFileRoute } from '@tanstack/react-router'
import UserNavBar from '../components/layouts/user/user-nav-bar';
import '@/index.css';

export const Route = createFileRoute('/')({
   component: RouteComponent
});

function RouteComponent() {
   return (
      <div>
         <UserNavBar />
      </div>
   );
}