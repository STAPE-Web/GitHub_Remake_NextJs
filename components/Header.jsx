import { BellIcon, PlusIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'

const Header = () => {

    const router = useRouter()
    const input = useRef(null)
    const user = useSelector(selectUser)

    const submit = (e) => {
        e.preventDefault()
        const q = input.current.value

        router.push(`/search?q=${q}`)
    }

    return (
        <header className='flex items-center justify-between header px-[32px] py-[16px] fixed w-screen z-30'>
            <div className='flex items-center gap-[16px]'>
                <Link href='/'>
                    <img src='https://plane-boeing737.github.io/svg-host/github/Logo.png' className='w-[40px] h-[40px] cursor-pointer' alt="" />
                </Link>
                <form className='hidden sm:flex' onSubmit={submit}>
                    <input ref={input} type="text" className='body py-[5px] px-[12px] text-white rounded-lg border search' placeholder='Search or jump to…' />
                </form>
                <ul className='hidden md:flex items-center gap-[16px] text-white font-bold'>
                    <li>Pull requests</li>
                    <li>Issues</li>
                    <li>Marketplace</li>
                    <li>Explore</li>
                </ul>
            </div>
            <div className='flex items-center text-white gap-[16px]'>
                <BellIcon className='h-[20px] cursor-pointer' />
                <div className='flex items-center gap-[3px] cursor-pointer'>
                    <PlusIcon className='h-[20px]' />
                    <ChevronDownIcon className='h-[15px]' />
                </div>
                <Link href={`/user?name=STAPE-web`}>
                    <div className='flex items-center gap-[3px] cursor-pointer'>
                        <UserIcon className='h-[20px]' />
                        <ChevronDownIcon className='h-[15px]' />
                    </div>
                </Link>
            </div>
        </header >
    )
}

export default Header