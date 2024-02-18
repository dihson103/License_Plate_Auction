import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register account',
  description: 'Register an account now'
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
