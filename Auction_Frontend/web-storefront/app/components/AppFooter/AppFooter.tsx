import { Footer, FooterBrand, FooterCopyright, FooterDivider, FooterLink, FooterLinkGroup } from 'flowbite-react'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs'
import { IoCarSportOutline } from 'react-icons/io5'

export default function AppFooter() {
  return (
    <Footer container className='mt-5 bg-gray-50'>
      <div className='w-full text-center'>
        <div className='w-full justify-between sm:flex sm:items-center sm:justify-between'>
          <div className='text-red-600 flex'>
            <IoCarSportOutline size={34} className='mr-1' />
            <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
              Lisense Plate Auction
            </span>
          </div>
          <FooterLinkGroup className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </FooterLinkGroup>
        </div>
        <FooterDivider />
        <FooterCopyright href='#' by='Nguyễn Đình Sơn' year={2024} />
      </div>
    </Footer>
  )
}
