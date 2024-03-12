'use client'

import { Button, Card, Label, TextInput } from 'flowbite-react'
import { useRouter } from 'next/navigation'
import { changeEmail } from '../actions/user.action'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ChangeEmail() {
  const router = useRouter()
  const [id, setId] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { status } = useSession()

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    router.push('/unauthorize')
    return
  }

  const handleSubmit = () => {
    changeEmail({ id, email })
      .then(() => {
        toast.success('Change email success')
      })
      .catch((error: Error) => {
        toast.error(error.message)
      })
  }

  const handleGotohome = () => {
    router.push('/')
  }

  return (
    <div className='flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12'>
      <Card
        horizontal
        className='w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block'
      >
        <h1 className='mb-3 text-2xl font-bold dark:text-white md:text-3xl'>Change my email</h1>
        <form>
          <div className='mb-4 flex flex-col gap-y-3'>
            <Label htmlFor='id'>Personal Id</Label>
            <TextInput
              id='id'
              name='id'
              placeholder='Personal id'
              onChange={(e) => setId(e.target.value)}
              type='text'
              required
            />
          </div>
          <div className='mb-6 flex flex-col gap-y-3'>
            <Label htmlFor='newpassword'>Your new Email</Label>
            <TextInput
              id='newpassword'
              name='newpassword'
              placeholder='Your new email'
              type='email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6 flex justify-between'>
            <Button type='button' gradientDuoTone='purpleToPink' onClick={handleGotohome}>
              Go to home page
            </Button>
            <Button type='button' onClick={handleSubmit} gradientMonochrome='success'>
              Change now
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
