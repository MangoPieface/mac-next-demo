import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

type Cat = {
    breed: string,
    country: string,
    origin: string,
    coat: string,
    pattern: string
}

type Data = Cat[]


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const catRequest = await fetch('https://catfact.ninja/breeds?limit=1')
    //const a = catRequest.json();
  //  console.log('ff ' + a);
    
    const { data } =  await catRequest.json() as {data:Data}
    res.status(200).send({ ...data })
}
