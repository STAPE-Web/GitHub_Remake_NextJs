import { useEffect, useState } from 'react';
import { BookmarkIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useSelector } from "react-redux";
import { selectUser } from "../slices/userSlice";

export const LeftSide = () => {

    const [githubData, setGithubData] = useState([])
    const user = useSelector(selectUser)

    const fetchData = () => {
        return fetch(`https://api.github.com/users/${user}/repos`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='body hidden lg:flex flex-col w-[400px] px-[32px] py-[30px] border-r borderApp h-screen fixed '>
            <div className='flex items-center justify-between'>
                <h2 className='text-white'>Recent Repositories</h2>
                <div className='flex items-center rounded-lg button text-white px-[12px] py-[3px] gap-1 cursor-pointer'>
                    <BookmarkIcon className='h-[16px]' />
                    <p>New</p>
                </div>
            </div>

            <div className='flex flex-col gap-[8px] mt-[30px]'>
                {githubData.map((data) => (
                    <Link href={`/repo?name=${data.full_name}`} key={data.id}>
                        <div className='flex items-center group cursor-pointer'>
                            <img src={data.owner.avatar_url} className='h-[16px] w-[16px] mr-[8px] rounded-full' alt="" />
                            <p className='text-white group-hover:underline line-clamp-2'>{data.full_name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}