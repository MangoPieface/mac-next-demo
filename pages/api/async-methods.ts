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
    async function randomCatRequest() {
        var page = 1;
        if (Math.random() > 0.5) {
            page = 2;
        }
        const catRequest = await fetch(`https://catfact.ninja/breeds?page=${page}&limit=1`);
        return catRequest;
    }
    
    const catRequest = await randomCatRequest();
    
    const { data } =  await catRequest.json() as {data:Data}
    res.status(200).send({ ...data })


}
