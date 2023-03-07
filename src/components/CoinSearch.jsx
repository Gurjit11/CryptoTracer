import React, { useState } from 'react'
import CoinItem from './CoinItem'

const CoinSearch = ({ coins2 }) => {
    const [text,setText] = useState('')

    // console.log(coins2)
    return (
        <div className='rounded-xl shadow-2xl md:p-10 p-2'>
            <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
                <h1 className='font-bold text-xl my-2'>Search Crypto</h1>
                <form>
                    <input type="text" 
                    className='outline-none rounded-lg drop-shadow-sm shadow-xl p-2 border-slate-300 border'
                    onChange={(e) => setText(e.target.value)} 
                    placeholder='Search a coin' />
                </form>
            </div>
            <table className='w-full text-center border-collapse'>
                <thead>
                    <tr className='border-b '>
                        <th></th>
                        <th className='sm:px-4'>#</th>
                        <th className='text-left'>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className='hidden md:table-cell'>24h Volume</th>
                        <th className='hidden md:table-cell'>Mkt</th>
                        <th>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody>
                    {coins2?.filter((value) => {
                        if(text === '')
                        return value
                        else if(
                            value.name.toLowerCase().includes(text.toLowerCase())
                        ){
                            return value
                        }
                        return false
                    }).map((coin) => {
                        return(<CoinItem key={coin.market_cap_rank} coin1={coin}/>
                    )})}
                </tbody>
            </table>
        </div>
    )
}

export default CoinSearch