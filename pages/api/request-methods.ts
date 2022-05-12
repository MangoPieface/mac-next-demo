import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Received a GET request' })
  }
  if (req.method === 'POST') {
    const { body } = req
    res.status(200).json({ message: `Received a POST request with data '${body.data}'` })
  }
  else {
    res.status(405).send({ message: "Only POST & GET requests allowed" });
  }
}
