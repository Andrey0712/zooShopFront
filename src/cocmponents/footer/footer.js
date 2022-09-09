import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { faFacebook,faTelegram,faYoutube,faViber } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { urlBackend } from "../../http_common";

const Footer = () => {
  return (

    <div className="footer" >
    <MDBFooter
    // style={{ backgroundColor: '#dfe0f5' }}
    color='white' bgColor='dark'  className='text-center text-lg-start text-muted' 
    // style="background-image: url('https://mdbootstrap.com/img/new/standard/city/041.jpg'); 
    // height: 400px;"
    >
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Слідкуйте за нами в социальних мережах:</span>
        </div>
        
        <div>
          <a href='https://www.facebook.com/' className='me-4 text-reset btn-square'>
          <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="viber://chat?number=%2B380966008199" className='me-4 text-reset'>
          <FontAwesomeIcon icon={faViber} />
          </a>
          
        </div>
      </section>

     
      <section className=''>
      
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'style={{marginLeft:"-15px"}}>
                <MDBIcon icon="gem" className="me-3" />
                ЗооМагазин КСУ "Альянс"
              </h5>
              <h6>
                Ми працюємо для Вас за графіком :
              </h6><br/>
              <p style={{marginLeft:"25px"}}>
              вiвторок/четвер:  16.00-19.00
              </p>
              <p style={{marginLeft:"55px"}}>
              недiля:  14.00-17.00
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Наші пропозиції</h6>
              <p>
                <a href='/login' className='text-reset'>
                  Товари
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Послуги
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Корисні посиланя</h6>
              <p>
                <a href='https://rivne-ksu.com.ua//' className='text-reset'>
                РО КСУ "Альянс"
                </a>
              </p>
              <p>
                <a href='mailto:nashemistoart@gmail.com' className='text-reset'>
                  Тех. підтримка
                </a>
              </p>
              <p>
                <a href={`${urlBackend}`+"api/product/details_for_payment"} className='text-reset' 
                 target="_blank"
                >
                  Реквізити для оплати
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Контакти</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                вул. Гагарина, 6
                <p style={{marginLeft:"25px"}}>БК "Текстильщик" каб. 22</p>
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Rovno.ksu@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> 067- 362-72-55, <p style={{marginLeft:"35px"}}>050-913-17-74</p>
              </p>
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {/* </div> */}
      </section>
     
 {/* <div
  class="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
  style="background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');"
> */}
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
       {/* <div className='text-center p-4' style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/Slides/3.webp');"> */}
        © 2022 Copyright:
        <a className='text-reset fw-bold'style={{marginLeft:"15px"}} href='https://rivne-ksu.com.ua//'>
          Рівненський осеродок КСУ "Альянс"
        </a>
      </div>
    </MDBFooter>
    </div>

    // <div className="row bg-dark mt-3">
    //   {/* <div className="col-md-4 text-secondary text-md-start p-2">
    //     <div className="p-3">
    //       ©
    //       <Link aria-current="page" to="/">
    //         3x4.com.ua
    //       </Link>
    //       , All Right Reserved. <br/>Designed by Hologram-IT, 2022
    //     </div>
    //   </div> */}
    //   {/* <div className="col-md-2 text-secondary text-center p-2">
    //     <h6 style={{marginTop:"2em"}}>
    //       <Link aria-current="page" to="/photo">
    //         Фотопослуги
    //       </Link>
    //     </h6>
    //   </div>

    //   <div className="col-md-2 text-secondary text-center p-2">
    //     <h6 style={{marginTop:"2em"}}>
    //       <Link aria-current="page" to="/comp">
    //         Комп'ютерні послуги
    //       </Link>
    //     </h6>
    //   </div>
    //   <div className="col-md-2 text-secondary text-center p-2">
    //     <h6 style={{marginTop:"2em"}}>
    //       <Link aria-current="page" to="/poligraph">
    //         Поліграфія
    //       </Link>
    //     </h6>
    //   </div>
    //   <div className="col-md-2 text-secondary text-center p-2">
    //     <h6 style={{marginTop:"2em"}}>
    //       <Link aria-current="page" to="/contacts">
    //         Контакти
    //       </Link>
    //     </h6>
    //   </div> */}

    //   <div className="col mt-3">
    //         <div className="row gx-4 justify-content-center">
    //             <div className="footer container bg-dark p-3">
    //                 <div className="footer-text row g-5">
    //                     <div className="col-lg-3 col-md-4 col-sm-6">
    //                         <h5 className="text-light mb-4">Контакти:</h5>
    //                         {/* <p>вул. Богоявленська, 41 відділ 9</p>
    //                         <p>+38 096 9060050</p>
    //                         <p>ba2h@ukr.net</p> */}
    //                     </div>
    //                     <div className="col-lg-3 col-md-4 col-sm-6" style={{marginTop:"3em"}}>
    //                     <p>вул. Богоявленська, 41 відділ 9</p>
    //                         <p>+38 096 9060050</p>
    //                         <a className="btn-square text-primary border-end p-1 fa-3x" href="https://www.facebook.com/" >
    //                         <FontAwesomeIcon icon={faFacebook} /> 
    //                        </a>
    //                     <a className="btn-square text-primary rounded-0 p-2 fa-3x" href="viber://chat?number=%2B380966008199" >
    //                         <FontAwesomeIcon icon={faViber} />
    //                         </a>
                                                       
    //                     </div>
    //                     {/* <div className="col-lg-3 col-md-4 col-sm-6">
    //                         <h5 className="mb-4"><Link aria-current="page" to="/">Комп'ютерні послуги</Link></h5>
                            
    //                     </div>
    //                     <div className="col-lg-3 col-md-4 col-sm-6">
    //                         <h5 className="mb-4"><Link aria-current="page" to="/">Поліграфія</Link></h5>
                            
    //                     </div> */}
    //                 </div>
    //             </div>
    //             <div className="bg-dark">
    //                     <div className="row mb-4">
    //                         <div className="col-md-6 text-center text-secondary text-md-start ">
    //                             © 
    //                             <Link aria-current="page" to="/">ЗооМагазін</Link>, All Right Reserved.
    //                         </div>
    //                         <div className="col-md-6 text-center text-secondary text-md-end">
    //                             Designed by Hologram-IT, 2022
    //                         </div>
    //                     </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

    
  );
};
export default Footer;