import Head from 'next/head'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectUser } from '../slices/userSlice';
import { useRouter } from 'next/router'
import { BookmarkAltIcon, StarIcon } from '@heroicons/react/outline';
import Link from 'next/link'

const search = () => {

    const [githubData, setGithubData] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    dispatch(change(router.query.q))

    const fetchData = () => {
        return fetch(`https://api.github.com/search/repositories?q=${user}`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='body h-screen'>
            <Head>
                <title>Search · {router.query.q}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className='absolute mt-[71px] w-screen body flex justify-center'>
                <div className='w-[700px]'>
                    <div className='border-b borderApp py-[20px]'>
                        <h1 className='text-white font-bold text-[20px]'>{githubData.total_count} repository results</h1>
                    </div>
                    <div>
                        {githubData.items?.map((data) => (
                            <div className='flex gap-[10px] border-b borderApp py-[20px]' key={data.id}>
                                <BookmarkAltIcon className='w-[50px] h-[20px] textHover' />
                                <div>
                                    <Link href={`/repo?name=${data.full_name}`}>
                                        <h1 className='link hover:underline cursor-pointer'>{data.full_name}</h1>
                                    </Link>
                                    <p className='text-white line-clamp-2'>{data.description}</p>
                                    <div className='flex items-center gap-[20px]'>
                                        <div className='flex items-center textHover gap-[5px]'>
                                            <StarIcon className='h-[20px]' />
                                            <p>{data.stargazers_count}</p>
                                        </div>
                                        {data.language
                                            ? <div className='flex items-center gap-[5px]'>
                                                <div className='w-[15px] h-[15px] bg-gray-500 rounded-full'></div>
                                                <p className='textHover'>{data.language}</p>
                                            </div>
                                            : null}
                                        <p className='textHover'>{data.license?.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default search