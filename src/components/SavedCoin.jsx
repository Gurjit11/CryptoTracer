import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { doc,onSnapshot ,updateDoc} from 'firebase/firestore'
import { UserAuth } from '../contexts/AuthContext'
import { db } from '../firebase-config'

const SavedCoin = () => {
    const [coins, setCoins] = useState([])
    const {user} = UserAuth()

    useEffect(() => {
        onSnapshot(doc(db,'users',`${user.email}`), (doc) => {
            setCoins(doc.data()?.watchList)
        })
    },[user?.email])

    const coinPath = doc(db,'users',`${user?.email}`)
    const deleteCoin = async (passedId) => {
        try{
            const result = coins.filter((item) => item.id !== passedId)
            await updateDoc(coinPath, {
                watchList: result
            })
        }catch(err) {
            console.error(err)
        }
    }

    return (
        <div className='min-h-[420px] '>

            {coins.length === 0 ? (
                <p>You don't have any coins saved. Please save a coin to add it
                    to your watch list .<Link className='text-blue-600' to='/'> Click here to search coins</Link></p>
            ) : (
                <table className='w-full md:w-[600px] '>
                    <thead>
                        <tr>
                            <th>Rank #</th>
                            <th>Coin</th>
                            <th>Price</th>
                            <th><span className='hidden sm:block'>Remove</span></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {coins?.map((coin) => (
                            <tr key={coin.id} className=' shadow-md m-3 rounded-xl '>
                                <td className='text-center'>{coin?.rank}</td>
                                <td>
                                    <Link to={`/coin/${coin.id}`}>
                                        <div className='flex p-3'>
                                            <img className='w-10 mr-2' src={coin?.image} alt='/'/>
                                            <div className='flex flex-col justify-center'>
                                                <p className='font-semibold sm:block hidden'>{coin?.name}</p>
                                                <p className='text-xs'>{coin?.symbol.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className='text-center'>${coin?.price}</td>
                                <td onClick={() => deleteCoin(coin.id)}>
                                <div
                                className='flex items-center sm:h-[70px] mx-2 cursor-pointer justify-center'>
                                    <AiOutlineClose/>
                                </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default SavedCoin