import type { Metadata } from 'next'
import Provider from '../Provider'

export const metadata: Metadata = {
  title: 'Change email',
  description: 'Change email'
}
export default function ChangeEmailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Provider>{children}</Provider>
    </div>
  )
}
