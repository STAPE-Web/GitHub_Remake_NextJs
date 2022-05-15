import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';

const Events = () => {

    const [githubData, setGithubData] = useState([])
    const user = useSelector(selectUser)

    const fetchData = () => {
        return fetch(`https://api.github.com/users/${user}/received_events`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='pl-[30px] lg:pl-[430px] w-screen py-[10px] pr-[30px] home'>
            {githubData.map((data) => (
                <div className='border-b borderApp flex gap-[10px] mt-[20px]' key={data.id}>
                    <img src={data.actor.avatar_url} className='h-[32px] rounded-full' alt="" />
                    <div className='w-full'>
                        <p className='text-white'><Link href={`/user?name=${data.actor.login}`}><span className='font-bold cursor-pointer'>{data.actor.login}</span></Link> {data.payload.action} 1 repository</p>
                        <div className='flex items-center justify-between body p-[16px] rounded-lg border borderApp mt-[10px] mb-[20px]'>
                            <Link href={`/repo?name=${data.repo.name}&user=${data.actor.login}`}>
                                <h1 className='text-white font-bold cursor-pointer line-clamp-1'>{data.repo.name}</h1>
                            </Link>
                            {data.payload.action == 'started'
                                ? <div className='hidden sm:flex items-center starBtn py-[3px] px-[12px] rounded-lg gap-2 border borderApp cursor-pointer'>
                                    <StarIcon className='h-[25px] textStarred' />
                                    <p className='text-white'>Starred</p>
                                </div>
                                : <div className='hidden sm:flex items-center starBtn py-[3px] px-[12px] rounded-lg gap-2 border borderApp cursor-pointer'>
                                    <StarIcon className='h-[25px] textHover' />
                                    <p className='text-white'>Star</p>
                                </div>}
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default Events