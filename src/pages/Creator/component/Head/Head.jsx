
import { ReactComponent as Background } from '../../../../assets/image/landing/head/background.svg'
import { ReactComponent as Dialogbox } from '../../../../assets/image/creator/head/dialogbox.svg'
import YoutuberPhoto from '../../../../assets/image/creator/head/youtuber.png'
import YoutuberPhoto_2x from '../../../../assets/image/creator/head/youtuber@2x.png'
import { Normal as Button } from '../../../../component/button'
import './Head.scss'

const Head = () => {
    return(
        <section className='creator-head'>
            <div className="creator-head__circle" />
            <Background className="creator-head__background" />
            <div className='creator-head__container'>
                <div className='creator-head__content'>
                    <div className='creator-head__youtuber'>
                        <img
                            src={YoutuberPhoto}
                            srcSet={`${YoutuberPhoto} 1x,${YoutuberPhoto_2x} 2x`}
                            alt="YoutuberPhoto"
                        />
                        <h3>免費體驗、優化創作流程馬上成為D-Waver！</h3>
                    </div>
                    <div className='creator-head__dialog'>
                    <Dialogbox className="creator-head__dialogBox" />
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
                            省去剪片後製時間，把時間花在內容產出吧！<br/><br/>

                            創作者們都在用，<br/>
                            不用再請音效師，一般剪輯就可以擁有專業降噪品質！</p> 
                    </div>
                              
                    </div>
                    
                    
                
                
                </div>
            </div>
            
            
        </section>
    )
}

export default Head




