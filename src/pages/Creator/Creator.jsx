import './Creator.scss'
import Navbar from '../../component/navbar'
import Footer from '../../component/footer'
import Head from './component/Head'
import Shutter from './component/Shutter'
import CreatorList from './component/CreatorList'
import Plan from './component/Plan'
import Application from './component/Application'


const Creator = () => {
  return (
    <>
      <Navbar className={'dark-theme'} />
      <main className="creator-page">
        <Head />
        <Shutter/>
        <CreatorList/>
        <Plan/>
        <Application />
        
      
      </main>
      <Footer />
    </>
  )
}

export default Creator
