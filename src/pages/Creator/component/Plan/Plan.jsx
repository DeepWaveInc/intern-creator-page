import './Plan.scss'
import { ReactComponent as Moneyicon } from '../../../../assets/image/creator/plan/moneyicon.svg'
import { ReactComponent as Bulbicon } from '../../../../assets/image/creator/plan/bulbicon.svg'



const Plan = () => {
  return (
    <section className='plan'>
        <div className='plan__container'>
            <div className="plan__creatorplan">
                <div className='plan__creatorplan_context'>

                    <span className="plan__creatorplan_title">創作者計畫</span>
                    <div className="plan__creatorplan_bar"></div>
                        <p className="plan__creatorplan_text">『噪音去背』、『人聲聚焦』讓Noise Eraser從更便利的後製角度，協助小團隊或個人創作者快速有效地達成音訊優化。迪威智能期待創造更優質的創作環境、並鼓勵更多的創作機會，『創作者計畫』從【體驗】及【推廣】兩個角度與創作者團隊緊密合作，將更好的台灣技術展現給世界！<br/>馬上加入計畫，體驗更好的影音製作流程吧！</p>
                </div>
                    
            </div>

            <div className="plan__creatorpromote">
                <div className="plan__creatorpromote_background"></div>
                <div className='plan__creatorpromote_context'>
                

                    <span className="plan__creatorpromote_title">創作者推廣方案</span>
                    <div className="plan__creatorpromote_bar"></div>
                        <p className="plan__creatorpromote_text">若Noise Eraser確實帶給您正向的協助，迪威智能誠摯的邀請您加入我們的推廣計畫，我們將提供您推廣折扣碼，從該折扣碼購買的訂單，將能讓您享有分潤的回饋！</p>
                </div>
                <Moneyicon className='plan__creatorpromote_icon'/>
                    
            </div>

            <div className="plan__creatorexperience">
                
                <div className='plan__creatorexperience_context'>
                

                    <span className="plan__creatorexperience_title">創作者體驗計畫</span>
                    <div className="plan__creatorexperience_bar"></div>
                        <p className="plan__creatorexperience_text">於下方表單填寫創作資料與頻道資訊，迪威智能將為您提供完整的限量專業訂閱體驗，並給予進一步的技術應用建議，讓您使用新技術免負擔！同時，我們也將有不定期的創作者實體 &amp; 線上活動，加入計畫掌握更多合作可能與學習機會！<br/><br/>在本合作中，也有機會讓您的作品【免費】在迪威官方媒體中得到更多的曝光與推廣！</p>
                </div>
                <Bulbicon className='plan__creatorexperience_icon'/>
                    
            </div>
        </div>

    </section>
  )
}

export default Plan