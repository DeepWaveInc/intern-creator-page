
import { ReactComponent as QuotationMarksBlue } from '../../../../assets/image/creator/shutter/quotationmarks.svg'
import { ReactComponent as QuotationMarksYellow } from '../../../../assets/image/creator/shutter/quotationmarks_y.svg'
import { ReactComponent as IconPodcast } from '../../../../assets/image/creator/shutter/iconpodcast.svg'
import { ReactComponent as IconYoutube } from '../../../../assets/image/creator/shutter/iconyoutube.svg'
import './Shutter.scss'

const Shutter = () => {
    return(
        <section className='shutter'>
            <div className="shutter__podcast_container">
                <p className='shutter__podcast_background '>Podcast</p>
                <div className="shutter__podcast">
                    <div className="shutter__podcast_circle">
                    
                        <span className="shutter__podcast_title">旅行快門</span>
                        <div className="shutter__podcast_bar"></div>
                        <p className="shutter__podcast_text">Noise Eraser 是一個非常智能的工具，他能精準地降低環境噪音，讓人聲更清晰凸顯，影音創作者可在後製剪輯過程提升很大的效率。</p>
                        <p className="shutter__podcast_name">頻道主持人<br/>Firas</p>
                        <div className="shutter__podcast_bluecircle"></div>

                        <QuotationMarksBlue className="shutter__podcast_markup"/>
                        <QuotationMarksBlue className="shutter__podcast_markdown"/>
                        <IconPodcast className='shutter__podcast_icon'/>
                        
                        
                    </div>
                </div> 
            </div>
            <div className="shutter__youtube_container">  
                <p className='shutter__youtube_background'>Youtube</p> 
                <div className="shutter__youtube">    
                    
                    
                    <div className="shutter__youtube_circle">
                        
                        <span className="shutter__youtube_title">旅行快門</span>
                        <div className="shutter__youtube_bar"></div>
                        <p className="shutter__youtube_text"></p>
                        <div className="shutter__youtube_yellowcircle"></div>
                         
                        <QuotationMarksYellow className="shutter__youtube_markup"/>
                        <QuotationMarksYellow className="shutter__youtube_markdown"/>
                        <IconYoutube className='shutter__youtube_icon'/>
                    </div>
                    
                </div>
                 
            </div>
            
            
            <div className="shutter__circle" />
        </section>
    )
}

export default Shutter




