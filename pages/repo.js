import Head from 'next/head'
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectUser } from '../slices/userSlice';
import { useRouter } from 'next/router'
import { AdjustmentsIcon, BookmarkAltIcon, EyeIcon, StarIcon, TerminalIcon, XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';

const repo = () => {

    const [modal, setModal] = useState(false)
    const [githubData, setGithubData] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    dispatch(change(router.query.name))

    const fetchData = () => {
        return fetch(`https://api.github.com/repos/${user}`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className='body h-screen'>
            <Head>
                <title>{githubData.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className='absolute mt-[71px] w-screen body '>
                <div className='w-screen border-b borderApp flex items-center p-[20px] gap-[10px]'>
                    <BookmarkAltIcon className='h-[20px] textHover' />
                    <h1 className='link flex items-center text-[20px] gap-[5px]'>
                        <span className='font-bold hover:underline'>{githubData.name}</span>
                    </h1>
                    <div className="border borderApp rounded-full px-[7px] textHover">{githubData.private ? 'Private' : 'Public'}</div>
                </div>

                <div className="w-screen flex justify-center py-[20px]">
                    <div className="flex flex-col w-[300px]">
                        <div className="border-b borderApp pb-[20px]">
                            <h1 className="text-white font-bold">About</h1>
                            <p className="textHover mt-[15px]">{githubData.description == null ? 'No description, website, or topics provided.' : githubData.description}</p>
                            <div className="flex flex-col gap-[5px] mt-[10px]">
                                <div className='flex items-center gap-[5px] textHover'>
                                    <StarIcon className='h-[20px]' />
                                    <p>{githubData.stargazers_count} stars</p>
                                </div>
                                <div className='flex items-center gap-[5px] textHover'>
                                    <EyeIcon className='h-[20px]' />
                                    <p>{githubData.watchers_count} watching</p>
                                </div>
                                <div className='flex items-center gap-[5px] textHover'>
                                    <AdjustmentsIcon className='h-[20px]' />
                                    <p>{githubData.forks_count} forks</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {githubData.language
                                ? <div className='pt-[20px]'>
                                    <h1 className='text-white font-bold'>Languages</h1>
                                    <div className='flex items-center gap-[5px]'>
                                        <div className='w-[10px] h-[10px] bg-gray-500 rounded-full'></div>
                                        <p className='text-white'>{githubData.language}</p>
                                    </div>
                                </div>

                                : null}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center rounded-lg button text-white px-[12px] py-[3px] gap-1 cursor-pointer' onClick={() => setModal(true)}>
                            <h1>Code</h1>
                            <ChevronDownIcon className='h-[15px]' />
                        </div>
                    </div>


                    {modal
                        ? <div className='absolute border borderApp header rounded-lg mt-[40px] ml-[50px] p-[16px]'>
                            <div className='text-white flex items-center justify-between gap-[10px]'>
                                <div>
                                    <TerminalIcon className='h-[20px]' />
                                    <h1 className='font-bold'>Code</h1>
                                </div>
                                <XIcon className='h-[20px] cursor-pointer' onClick={() => setModal(false)} />
                            </div>
                            <div className='flex flex-col gap-[5px] mt-[15px]'>
                                <h1 className='text-white uppercase'>Https</h1>
                                <input type="text" value={githubData.clone_url} disabled className='text-white py-[3px] px-[12px] body border borderApp rounded-lg w-[300px]' />
                                <h1 className='text-white uppercase'>Shh</h1>
                                <input type="text" value={githubData.ssh_url} disabled className='text-white py-[3px] px-[12px] body border borderApp rounded-lg w-[300px]' />
                            </div>
                        </div>
                        : null}
                </div>
            </div >
        </div>
    )
}

export default repo