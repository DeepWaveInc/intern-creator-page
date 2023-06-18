
import { ReactComponent as Background } from '../../../../assets/image/landing/head/background.svg'
import { ReactComponent as Dialogbox } from '../../../../assets/image/creator/head/dialogbox.svg'
import { ReactComponent as DialogboxMobile } from '../../../../assets/image/creator/head/dialogboxmobile.svg'
import YoutuberPhoto from '../../../../assets/image/creator/head/youtuber.png'
import YoutuberPhoto_2x from '../../../../assets/image/creator/head/youtuber@2x.png'
import YoutuberPad from '../../../../assets/image/creator/head/youtuberpad.png'
import YoutuberPad_2x from '../../../../assets/image/creator/head/youtuberpad@2x.png'
import YoutuberMobile from '../../../../assets/image/creator/head/youtubermobile.png'
import YoutuberMobile_2x from '../../../../assets/image/creator/head/youtubermobile@2x.png'
import { Normal as Button } from '../../../../component/button'
import { useState, useEffect } from 'react';
import './Head.scss'

const Head = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return(
        <section className='creator-head'>
            <div className="creator-head__circle" />
            <Background className="creator-head__background" />
            <div className='creator-head__container'>
                
                <picture className='creator-head__youtuber'>
                    <source media="(min-width: 1280px)" srcSet={`${YoutuberPhoto} 1x,${YoutuberPhoto_2x} 2x`}/>
                    <source media="(min-width: 960px) and (max-width: 1280px)" srcSet={`${YoutuberPad} 1x,${YoutuberPad_2x} 2x`}/>
                    <source media="(max-width: 960px)" srcSet={`${ YoutuberMobile} 1x,${YoutuberMobile_2x} 2x`}/>
                    
                    <img src={YoutuberPhoto} alt="YoutuberPhoto" />

                    <h3>免費體驗、優化創作流程馬上成為D-Waver！</h3>
                </picture>
                <div className='creator-head__dialog'>
                {windowWidth <= 960 ? (
                 <DialogboxMobile className="creator-head__dialogBox" />
                ) : (
                 <Dialogbox className="creator-head__dialogBox" />
                 )}
                    
                    <div className='creator-head__context'>
                        <div className='creator-head__context_head'>
                        <h3>加入創作者計畫</h3>
                        <Button
                            {...{
                            type: 'primary',
                            }}>
                            <span>立即加入</span>
                        </Button>

                        </div>
                        <p>限量的免費體驗機會，只屬於創作者 --- <br/>
                            省去剪片後製時間，把時間花在內容產出吧！<br/>
                        </p>
                        <p>
                            創作者們都在用，<br/>
                            不用再請音效師，一般剪輯就可以擁有專業降噪品質！
                        </p> 
                    </div>
                </div>
            </div>
            
            
        </section>
    )
}

export default Head




