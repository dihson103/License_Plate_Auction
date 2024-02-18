import ItemListing from './components/ItemListing'
import AppHeader from './components/AppHeader'
import AppBanner from './components/AppBanner'

export default function Home() {
  return (
    <div>
      <AppHeader />
      <AppBanner />
      <main className='container mx-auto px-5 pt-10'>
        <ItemListing />
      </main>
    </div>
  )
}
