import { ReactNode } from 'react'

type Props = {
  value: number | string
  name: string
  icon: ReactNode
}

export default function AppCard({ value, name, icon }: Props) {
  return (
    <div className='p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex'>
        {icon}
        <div className='ml-4'>
          <h5 className='text-xl font-semibold tracking-tight text-gray-500 dark:text-white'>{name}</h5>
          <p className='text-xl font-semibold text-center text-gray-900 dark:text-gray-400'>{value}</p>
        </div>
      </div>
    </div>
  )
}
