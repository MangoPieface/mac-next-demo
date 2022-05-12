import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log("hello!")
  return <Component {...pageProps} />
}

export default MyApp