

import './Shutter.scss'

const Shutter = () => {
    return(
        <section className='shutter'>
            <div className="shutter__podcast_container">
                <div className="shutter__podcast">
                    <p className='shutter__podcast_background '>Podcast</p>
                    <div className="shutter__podcast_circle">
                        <span className="shutter__podcast_title">旅行快門</span>
                        <div className="shutter__podcast_bar"></div>
                        <p className="shutter__podcast_text">Noise Eraser 是一個非常智能的工具，他能精準地降低環境噪音，讓人聲更清晰凸顯，影音創作者可在後製剪輯過程提升很大的效率。</p>
                        <p className="shutter__podcast_name">頻道主持人<br/>Firas</p>
                        <div className="shutter__podcast_bluecircle"></div>
                        <div className="shutter__podcast_bluemarkup">“</div>
                        <div className="shutter__podcast_bluemarkdown">“</div>
                    </div>
                </div> 
            </div>
            <div className="shutter__youtube_container">   
                <div className="shutter__youtube">    
                    <p className='shutter__youtube_background'>Youtube</p>
                    <div className="shutter__youtube_circle">
                        
                        <span className="shutter__youtube_title">旅行快門</span>
                        <div className="shutter__youtube_bar"></div>
                        <div className="shutter__youtube_yellowcircle"></div>
                        <div className="shutter__youtube_yellowmarkup">“</div>
                        <div className="shutter__youtube_yellowmarkdown">“</div>
                    </div>
                    
            </div>
                 
            </div>
            
            
            <div className="shutter__circle" />
        </section>
    )
}

export default Shutter




