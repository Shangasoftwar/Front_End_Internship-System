import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout/auth/resend-otp-page')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auth/_layout/auth/resend-otp-page"!</div>
}
