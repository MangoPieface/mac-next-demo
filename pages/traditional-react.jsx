import { useEffect, useState } from 'react'
import CenterContainer from '../components/containers/CenterContainer'

const TradReactExample = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)

    useEffect(() => {
        (async () => {
            const data = await fetch('/api/async-methods')
            const json = await data.json()
            setData(json)
            setLoading(false)
        })()
    }, [])

    if (loading) {
        return <CenterContainer>
            <h1 className="text-6xl font-bold animate-pulse">Loading...</h1>
        </CenterContainer>
    }

    return (
        <CenterContainer>
             <h1 className="text-3xl font-bold">Your Cat Data</h1>
            <div className='p-5 bg-gray-800 rounded text-xl text-white text-left'>
                {Object.entries(data[0]).map(([key, value]) => {
                    return <div key={key}>
                        <p>
                            <span className='font-bold mr-2'>{key}</span>
                            <span>{value}</span>
                        </p>
                    </div>
                })
                }
            </div>
        </CenterContainer>
    )
}

export default TradReactExample
