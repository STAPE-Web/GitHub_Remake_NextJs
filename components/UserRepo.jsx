import { StarIcon } from "@heroicons/react/outline"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, selectUser } from '../slices/userSlice';
import { useRouter } from 'next/router'
import Link from 'next/link';

const UserRepo = () => {


    const [githubData, setGithubData] = useState([])
    const router = useRouter()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    dispatch(change(router.query.name))

    const fetchData = () => {
        return fetch(`https://api.github.com/users/${user}/repos`)
            .then((response) => response.json())
            .then((data) => setGithubData(data));
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {githubData.map((data) => (
                <div className="flex justify-between items-center border-b borderApp py-[30px]" key={data.id}>
                    <div>
                        <div className="flex items-center gap-[10px]">
                            <Link href={`/repo?name=${data.full_name}`}>
                                <h1 className="text-[20px] link font-bold hover:underline cursor-pointer">{data.name}</h1>
                            </Link>
                            <div className="border borderApp rounded-full px-[7px] textHover">{data.private ? 'Private' : 'Public'}</div>
                        </div>
                        <div className="flex items-center gap-[20px]">
                            <p className="textHover">{data.language ? data.language : null}</p>
                            <div className="flex items-center textHover gap-[5px]">
                                <StarIcon className="h-[20px]" />
                                <p>{data.stargazers_count}</p>
                            </div>
                        </div>
                    </div>
                    <div className='hidden sm:flex items-center starBtn py-[3px] px-[12px] rounded-lg gap-2 border borderApp cursor-pointer'>
                        <StarIcon className='h-[25px] textHover' />
                        <p className='text-white'>Star</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserRepo