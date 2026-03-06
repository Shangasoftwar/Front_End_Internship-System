import { createFileRoute, Outlet } from '@tanstack/react-router';
export const Route = createFileRoute('/(auth)/_layout')({
   component: RouteComponent
});

function RouteComponent() {
   return (
      <div className="w-full h-screen flex flex-col">
        
         <main className="flex-1 w-full px-5">
            <Outlet />
         </main>
      </div>
   );
}
