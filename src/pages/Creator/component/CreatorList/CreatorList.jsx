import './CreatorList.scss'
import { Normal as Button } from '../../../../component/button'
import IMAGES from './media'


const ImageList = ({ images }) => {
    return (
      <ul className="CreatorList__image">
        {images.map((image, index) => (
          <li className="CreatorList__image_item" key={index}>
            
            <a href={image.link}>
                <img 
                src={image.src} 
                srcSet={image.srcset} 
                alt={image.link}
                />
            </a>
          </li>
        ))}
      </ul>
    );
  }

const CreatorList = () => {

    
    return(
        <section className='CreatorList'>
            <div className='CreatorList__container'>
                <h1>合作創作者</h1>
                
                <ImageList images={IMAGES} />

                <Button
                    {...{
                    type: 'primary',
                    }}>
                    <span>申請加入創作者社群</span>
                </Button>
                
            </div>
        </section>
    )}

    export default CreatorList

