import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const TrendingCoins = () => {
    const [coins, setCoins] = useState([])
    const url = 'https://api.coingecko.com/api/v3/search/trending'

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoins(response.data.coins);
            // console.log(response.data.coins)
        })
    }, [url])

    return (
        <div className='rounded-xl shadow-2xl md:p-10 p-2 mt-3 '>

            <p className='font-bold text-xl text-left w-full'>Trending Coins</p>
            <div className=' grid md:grid-cols-2 lg:grid-cols-3'>
                {coins.map((coin, id) => {
                    return (
                        <div key={id}>
                        <Link to={`coin/${coin.item.id}`}>
                        <div  className='rounded-xl shadow-xl flex justify-between items-center p-2 sm:w-[330px] m-3 hover:scale-105 hover:ease-in hover:duration-300'>
                            <span className='flex items-center'><img src={coin.item.small} alt={coin.item.name} className='rounded-full' />
                            <span className='font-bold mx-2'>{coin.item.name}</span>
                            </span>
                            <span className='flex overflow-hidden'><img className='rounded-full w-4 m-1 ' src={`data:image/png;base64,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`} alt={'$'}/>
                            {coin.item.price_btc.toFixed(7)}</span>
                        </div>
                        </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TrendingCoins