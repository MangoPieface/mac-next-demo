import Link from 'next/link'
import CenterContainer from '../components/containers/CenterContainer'

const sections = [
  {
    title: "Async Data Fetching",
    links: [
      "/traditional-react",
      "/ssr",
    ],
  }
  ,
  {
    title: "Dynamic Routes",
    links: [
      "/square/2",
      "/square/12",
    ],
  }
]

const Home = () => {
  return (
    <CenterContainer>
      <h1 className="text-6xl font-bold text-left">
        Next.js Demo
      </h1>
      <div className="max-w-3xl mx-auto grid gap-4 grid-cols-2 text-left">
        {sections.map(({ title, links }) => {
          return (
            <>
              <p className='col-span-2'>{title}</p>
              {
                links.map(link => (
                  <Link href={link}>
                    <a className='text-blue-600 uppercase'>
                      {link}
                    </a>
                  </Link>
                )
                )
              }
            </>
          )
        }
        )}
      </div>
    </CenterContainer>
  )
}

export default Home