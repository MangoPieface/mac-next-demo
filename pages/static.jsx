import CenterContainer from '../components/containers/CenterContainer'

const SSRPageExample = ({ data }) => {
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

export default SSRPageExample;


export async function getStaticProps() {


var page = Math.round(Math.random() * 10);

const catRequest = await fetch(`https://catfact.ninja/breeds?page=${page}&limit=1`);
   
    const { data } = await catRequest.json();
    return {
        props: { data },
    }
}
