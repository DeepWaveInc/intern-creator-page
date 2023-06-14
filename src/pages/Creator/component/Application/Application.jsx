import './Application.scss'
import { Normal as Button } from '../../../../component/button'




const Application = () => {
  return (
    <section className='application'>
        <div className='application__container'>
            <div className='application__text'>
                <h1>創作者計畫申請表</h1>
                <h3>加入之後，您可以獲得</h3>
                <p>『體驗計畫』<br/>享有限量的免費技術體驗、更多的合作機會，與作品 &amp;  頻道的曝光可能！<br /><br />『推廣方案』<br />享有合作期間的免費技術運用、並能從推廣中獲得分潤回饋！</p>
            </div>
            <div className='application__form'>
              <form action="" className='application__form_content'>
                <div className='block1'>
                  <div className="part">
                    <label>聯絡人</label>
                    <input type="text"   name=""placeholder="請輸入內容"/>
                    <label>頻道連結</label>
                    <input type="text"  name="" placeholder="請輸入內容"/>
                    
                    <label>國籍</label>
                    <select name=""  ><option selected value disabled>請選擇類型</option></select>
                  </div >
                  <div className="part">
                  <label>頻道/團隊名稱</label>
                    <input type="text"   name=""placeholder="請輸入內容"/>
                    <label>信箱</label>
                    <input type="text"  name="" placeholder="請輸入內容"/>
                    
                    <label>語言</label>
                    <select name="" ><option selected value disabled>請選擇類型</option></select>
                  </div>
                </div>
                <div className='block2'>
                  <label>頻道性質</label>
                  <select name="" ><option selected value disabled>請選擇類型</option></select>
                  <label>加入原因</label>
                  <textarea name=""></textarea>

                </div>
                <div className='block3'>
                  <div className="part">
                      <label>想申請的計畫 </label>
                      <div className='checkpart'>

                        <input className="check" type="checkbox" name="" value=""/>  <label className="checklabel" >創作者體驗計畫</label>   
                        <input className="check" type="checkbox" name="" value=""/> <label className="checklabel">創作者長期購買方案</label>
                      </div>
                      
                  </div >

                  <div className="part">
                    <div className='buttonpart'>

                  <Button className='applybutton'
                            {...{
                            type: 'primary',
                            }}>
                            <span>申請加入</span>
                        </Button>
                    </div>

                        <p className='buttontext'>（申請後將有專人與您聯絡）</p>

                  </div>
                </div>
              </form>

            </div>
            <div className="application__circle" />
        </div>
    </section>
  )
}

export default Application