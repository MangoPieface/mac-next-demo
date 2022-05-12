import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    result: number
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'POST') {
        const { body: { number } } = req
        res.status(200).json({ result: Math.pow(number, 2) })
    }
}
