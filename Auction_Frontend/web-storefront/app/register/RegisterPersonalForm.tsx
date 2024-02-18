import { Button, Label, TextInput, Datepicker } from 'flowbite-react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsInputPersonalInfo: Dispatch<SetStateAction<boolean>>
}

export default function RegisterPersonalForm({ setIsInputPersonalInfo }: Props) {
  const handleNextButton = () => {
    setIsInputPersonalInfo((previousValue) => !previousValue)
  }
  return (
    <form>
      <div className='mb-4 flex flex-col gap-y-3'>
        <Label htmlFor='identificationNumber'>Your citizen identification number</Label>
        <TextInput
          id='identificationNumber'
          name='identificationNumber'
          placeholder='Citizen identification number'
          type='text'
        />
      </div>
      <div className='mb-4 flex flex-col gap-y-3'>
        <Label htmlFor='fullname'>Your fullname</Label>
        <TextInput id='fullname' name='fullname' placeholder='Your full name' type='text' />
      </div>
      <div className='mb-4 flex flex-col gap-y-3'>
        <Label htmlFor='address'>Your address</Label>
        <TextInput id='address' name='address' placeholder='Your address' type='text' />
      </div>
      <div className='mb-4 flex flex-col gap-y-3'>
        <Label htmlFor='dob'>Your date of birth</Label>
        <Datepicker id='dob' name='dob' />
      </div>
      <div className='mb-6'>
        <Button type='button' color='blue' className='w-full lg:w-auto' onClick={handleNextButton}>
          Next
        </Button>
      </div>
    </form>
  )
}
