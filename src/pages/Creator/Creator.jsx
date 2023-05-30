import './Creator.scss'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Head from './component/Head'
import Shutter from './component/Shutter'

const Creator = () => {
  return (
    <>
      <Navbar className={'dark-theme'} />
      <main className="creator-page">
        <Head />
        <Shutter/>
      
      </main>
      <Footer />
    </>
  )
}

export default Creator
