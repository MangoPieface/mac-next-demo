import { useRouter } from 'next/router'
import CenterContainer from '../../components/containers/CenterContainer'

const Counter = ({ data }) => {
    const router = useRouter()
    const { number } = router.query
    return (
        <CenterContainer>
            <h1 className="text-6xl font-bold">The square of {number} is
                <span className='text-blue-600'> {data.result}</span>.</h1>
        </CenterContainer>
    )
}

export default Counter

export async function getServerSideProps(context) {
    const { number } = context.query;
    // Fetch data from external API
    const res = await fetch(`${process.env.HOST}/api/simple-squaring`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            number: parseInt(number),
        }),
    });
    let data;
    try {
        data = await res.json();
    } catch (e) {
        console.log(e)
        data = {};
    }
    // Pass data to the page via props
    return { props: { data } };
}