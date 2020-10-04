import '../styles/globals.scss'
import Layout from '../components/Layout'
function MyApp ({ Component, pageProps }) {
  try {
    if (sessionStorage.getItem('usuario') == null) {
      sessionStorage.setItem('usuario', JSON.stringify({
        user: '1'
      }))
    }
  } catch (error) {
    console.log(error)
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
