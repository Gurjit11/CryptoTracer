import { updateDoc,doc, arrayUnion } from 'firebase/firestore'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase-config'

const CoinItem = ({coin1}) => {
    const [savedCoin,setSavedCoin] = useState(false)
    const {user} = UserAuth()
    
    const coinPath = doc(db,'users',`${user?.email}`)
    const saveCoin = async () => {
        if(user?.email){
            setSavedCoin(true)
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin1.id,
                    name: coin1.name,
                    image: coin1.image,
                    rank: coin1.market_cap_rank,
                    symbol: coin1.symbol,
                    price: coin1.current_price.toLocaleString()
                })
            })
        } else {
            alert('Please sign in to save a coin to your watch list')
        }
    }

    return (
            <tr className='h-[80px] overflow-hidden border-b'>
                <td onClick={saveCoin} className='cursor-pointer'>
                    {savedCoin ? <AiFillStar/>:<AiOutlineStar />} 
                </td>
                <td>{coin1.market_cap_rank}</td>
                <td>
                    <Link to={`/coin/${coin1.id}`}>
                    <div className='flex items-center cursor-pointer hover:scale-105 hover:ease-in hover:duration-300'>
                        <img className='w-8 mr-2 rounded-full' src={coin1.image} alt={coin1.id} />
                        <p className='font-semibold hidden sm:table-cell  '>{coin1.name}</p>
                    </div>
                    </Link>
                </td>
                <td>{coin1.symbol.toUpperCase()}</td>
                <td>${coin1.current_price.toLocaleString()}</td>
                <td>
                    {coin1.price_change_percentage_24h.toFixed(2)>0 ? 
                    (<p className='text-green-600 md:mx-2'>{coin1.price_change_percentage_24h.toFixed(2)}%</p>) : 
                    (<p className='text-red-600 sm:mx-2'>{coin1.price_change_percentage_24h.toFixed(2)}%</p>)}</td>
                <td className='hidden md:table-cell md:mx-3'>${coin1.total_volume.toLocaleString()}</td>
                <td className='hidden md:table-cell md:mx-3'>${coin1.market_cap.toLocaleString()}</td> 
                <td>
                    <Sparklines data={coin1.sparkline_in_7d.price}>
                        <SparklinesLine color='teal' />
                    </Sparklines>
                </td>
            </tr>
    )
}

export default CoinItem