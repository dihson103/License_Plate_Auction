import AppNavBar from '../components/AppNavBar'
import AppSideBar from '../components/AppSideBar'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <AppSideBar />
      <div className='flex flex-col flex-1 overflow-y-auto'>
        <AppNavBar />
        <div className='p-4'>{children}</div>
      </div>
    </div>
  )
}
