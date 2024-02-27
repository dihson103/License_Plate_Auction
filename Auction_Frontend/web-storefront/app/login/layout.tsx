import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to our platform'
}
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
