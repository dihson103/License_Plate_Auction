import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payment',
  description: 'Payment page'
}
export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
