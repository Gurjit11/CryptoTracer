import React from 'react'
import CoinSearch from '../components/CoinSearch'
import TrendingCoins from '../components/TrendingCoins'

const Home = ({ coins }) => {
  return (
    <div>

      <div className='w-full flex justify-center'>
        <div className='max-w-[1300px] rounded-xl'>
          <CoinSearch coins2={coins} />
        </div>
      </div>
      <div className='w-full flex justify-center'>
        <div className='max-w-[1300px] rounded-xl'>
          <TrendingCoins />
        </div>
      </div>
    </div>
  )
}

export default Home