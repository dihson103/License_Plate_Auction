import ItemListing from './components/ItemListing'
import AppHeader from './components/AppHeader'
import AppBanner from './components/AppBanner'
import { AuctionListConfig } from './types/auction.type'
import Provider from './Provider'
import AppFooter from './components/AppFooter'
import { getStatusFromSearchParams } from './utils/utils'

type Props = {
  searchParams: AuctionListConfig
}

export default function Home({ searchParams }: Props) {
  const searchConfig: AuctionListConfig = {
    ...searchParams,
    status: getStatusFromSearchParams(searchParams.status)
  }
  return (
    <div>
      <Provider>
        <AppHeader />
      </Provider>
      <AppBanner />
      <main className='container mx-auto px-5 pt-10'>
        <ItemListing searchParams={searchConfig} />
      </main>
      <AppFooter />
    </div>
  )
}
