import './CreatorList.scss'
import { Normal as Button } from '../../../../component/button'
import { ReactComponent as IconPodcast } from '../../../../assets/image/creator/creatorlist/podcast.svg'
import { ReactComponent as IconYoutube } from '../../../../assets/image/creator/creatorlist/youtube.svg'
import IMAGES from './media'


const ImageList = ({ images }) => {
    return (
      <ul className="CreatorList__image">
        {images.map((image, index) => (
          <li className="CreatorList__image_item" key={index}>
            
            <a href={image.link} className="imageContainer">
                <img 
                src={image.src} 
                srcSet={image.srcset} 
                alt={image.link}
                
                />
                <div  className={image.type === "podcast" ?   "overlay yellow" : "overlay blue"}>
                  {image.type === "podcast" ? <IconPodcast className="overlay_icon" /> : <IconYoutube className="overlay_icon" />}
                  <span className="overlay_text">{image.name}</span>
                </div>
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

