import Head from 'next/head'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectUser } from '../slices/userSlice';
import { useRouter } from 'next/router'
import { LinkIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/outline';
import UserRepo from '../components/UserRepo';

const user = () => {

    const [githubData, setGithubData] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    dispatch(change(router.query.name))

    const fetchData = () => {
        return fetch(`https://api.github.com/users/${user}`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='body h-screen'>
            <Head>
                <title>{githubData.login} {githubData.name ? `(${githubData.name})` : null}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className='absolute mt-[71px] w-screen body flex justify-center gap-[20px]'>
                <div className='mt-[50px]'>
                    <img src={githubData.avatar_url} className='w-[300px] h-[300px] rounded-full' alt='' />
                    <h1 className='text-gray-300 font-bold text-[24px]'>{githubData.name}</h1>
                    <h3 className='textHover text-[20px]'>{githubData.login}</h3>
                    <p className='mt-[20px] text-white'>{githubData.bio}</p>
                    <div className='flex items-center gap-[5px]'>
                        <UsersIcon className='h-[20px] textHover' />
                        <p className='textHover flex items-center gap-[5px]'>
                            <span className='text-white font-bold'>{githubData.followers}</span>
                            followers
                        </p>
                        <p className='text-white'>·</p>
                        <p className='textHover flex items-center gap-[5px]'>
                            <span className='text-white font-bold'>{githubData.following}</span>
                            following
                        </p>
                    </div>
                    {githubData.location
                        ? <div className='flex items-center gap-[5px] mt-[20px] text-white'>
                            <LocationMarkerIcon className='h-[20px] textHover' />
                            <p>{githubData.location}</p>
                        </div>
                        : null
                    }
                    {githubData.blog
                        ? <div className='flex items-center gap-[5px] text-white'>
                            <LinkIcon className='h-[20px] textHover' />
                            <a href={`http://${githubData.blog}`}>{githubData.blog}</a>
                        </div>
                        : null
                    }
                </div>
                <div className='w-[900px]'>
                    <UserRepo />
                </div>
            </div>
        </div>
    )
}

export default user