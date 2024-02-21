import { Select, TextInput } from 'flowbite-react'

export default function SearchAuction() {
  return (
    <div className='grid gap-6 mb-6 md:grid-cols-4'>
      <TextInput id='searchValue' type='text' placeholder='Search' />
      <Select id='countries' required>
        <option>Chọn tỉnh, thành phố</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
      <Select id='kindOfCar' required>
        <option>Chọn loại xe</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
      <Select id='kindOfLicense' required>
        <option>Chọn loại biển</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
    </div>
  )
}
