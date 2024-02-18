import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setIsInputPersonalInfo: Dispatch<SetStateAction<boolean>>
}

export default function RegisterAccountForm({ setIsInputPersonalInfo }: Props) {
  const handlePreviousButton = () => {
    setIsInputPersonalInfo((previousValue) => !previousValue)
  }
  return (
    <form>
      <div className='mb-4 flex flex-col gap-y-3'>
        <Label htmlFor='email'>Your email</Label>
        <TextInput id='email' name='email' placeholder='name@company.com' type='email' />
      </div>
      <div className='mb-6 flex flex-col gap-y-3'>
        <Label htmlFor='password'>Your password</Label>
        <TextInput id='password' name='password' placeholder='••••••••' type='password' />
      </div>
      <div className='mb-6 flex items-center gap-x-3'>
        <Checkbox id='acceptTerms' name='acceptTerms' />
        <Label htmlFor='acceptTerms'>
          I accept the&nbsp;
          <Link href='#' className='text-purple-700 dark:text-purple-200'>
            Terms and Conditions
          </Link>
        </Label>
      </div>
      <div className='mb-6 flex'>
        <Button type='button' className='w-full lg:w-auto mr-2' onClick={handlePreviousButton}>
          Previous
        </Button>
        <Button type='submit' color='blue' className='w-full lg:w-auto'>
          Create account
        </Button>
      </div>
      <p className='text-sm text-gray-500 dark:text-gray-300'>
        Already have registered?&nbsp;
        <Link href='/login' className='text-purple-600 dark:text-purple-300'>
          Login now
        </Link>
      </p>
    </form>
  )
}
