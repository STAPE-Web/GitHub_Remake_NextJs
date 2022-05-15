import Head from 'next/head'
import Events from '../components/Events'
import Header from '../components/Header'
import { LeftSide } from '../components/LeftSide'
import { useDispatch } from 'react-redux';
import { change } from '../slices/userSlice';

export default function Home() {

  const dispatch = useDispatch()

  dispatch(change('STAPE-Web'))

  return (
    <div className='home '>
      <Head>
        <title>GitHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className='absolute mt-[71px]'>
        <LeftSide />
        <Events />
      </div>
    </div>
  )
}
