import { Button } from 'flowbite-react'
import SearchInput from '../components/SearchInput'
import CreateAuctionButton from './CreateAuctionButton'
import StatusFilter from './StatusFilter'

export default function SearchAuction() {
  return (
    <div className='sm:flex mb-4 mt-2'>
      <div className='items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700'>
        <form className='lg:pr-3' action='#' method='GET'>
          <label htmlFor='users-search' className='sr-only'>
            Search
          </label>
          <div className='relative mt-1 lg:w-64 xl:w-96'>
            <SearchInput searchInputName='searchTerm' isClearParams={false} />
          </div>
        </form>
        <div className='flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0 items-center'>
          <StatusFilter />
        </div>
      </div>
      <div className='flex items-center ml-auto space-x-2 sm:space-x-3'>
        <CreateAuctionButton />
      </div>
    </div>
  )
}
