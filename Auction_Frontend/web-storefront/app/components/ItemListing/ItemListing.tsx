import AppItem from '../AppItem'

const data: string[] = [
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68',
  '51K-999.68'
]

export default function ItemListing() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data && data.map((item) => <AppItem auction={item} key={item} />)}
    </div>
  )
}
