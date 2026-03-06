import AuthProvider from '@/provider/auth-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';
import { Toaster } from 'sonner';

export const Route = createRootRoute({ component: RootRoute });


function RootRoute() {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <Outlet />
            <Toaster />
         </AuthProvider>
      </QueryClientProvider>
   );
}