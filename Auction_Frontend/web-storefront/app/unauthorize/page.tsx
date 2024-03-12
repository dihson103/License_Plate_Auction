import Image from 'next/image'
import Link from 'next/link'

export default function ServerError() {
  return (
    <div className='flex flex-col justify-center items-center px-6 mx-auto h-screen xl:px-0 dark:bg-gray-900'>
      <div className='block md:max-w-lg'>
        <Image
          src='https://flowbite.com/application-ui/demo/images/illustrations/500.svg'
          width={500}
          height={300}
          alt='astronaut image'
        />
      </div>
      <div className='text-center xl:max-w-4xl'>
        <h1 className='mb-3 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white'>
          Something has gone seriously wrong
        </h1>
        <p className='mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400'>
          It is always time for a coffee break. We should be back by the time you finish your coffee.
        </p>
        <Link
          href='/'
          className='inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          {' '}
          <svg
            className='mr-2 -ml-1 w-5 h-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
              clipRule='evenodd'
            />
          </svg>
          Go back home
        </Link>
      </div>
    </div>
  )
}
