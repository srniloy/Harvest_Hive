'use client';
import LoginIcon from '@mui/icons-material/Login'
import { Button } from '@mui/material'
import '@styles/home.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Loader } from './loading';


const Home = () => {

const [isLoad, setIsLoad] = useState(false);
  return (
    <section className="home-page">
            <Loader open={isLoad}/>
            <section className="nav">
                <b className="project-icon">
                    Harvest Hive
                </b>
                <div className="menu">
                    <a className="active-home">
                        <b className="home">Home</b>
                        <div className="active-home-child"></div>
                    </a>
                    <a className="home">About Us</a>
                    <a className="home">Our Services</a>
                    <a className="home">Outcomes</a>
                    <a className="home">Testimonials</a>
                    <a className="home">News & Article</a>
                    <a className="home">Contact Us</a>
                </div>
                <div className="signin-space">
                    <Link href={'/auth/signin'}> 
                <Button variant="contained" onClick={()=>setIsLoad(true)} className="signin-button" startIcon={<LoginIcon/>}>Sign in</Button>
                    </Link>
                </div>
            </section>

            {/* <!-- ================================================= Cover/Heading Section ====================================================================== --> */}

            <section className="hero-section">

                <div className="text-button">
                    <div className="underline-01-parent">
                        <b className="original-natural">Original & Natural</b>

                        <img
                            className="underline-01-icon"
                            src='/images/underline-01.png' />

                    </div>
                    <div className="frame-parent4">
                        <div className="frame-parent5">
                            <div className="logo-description-uppper">
                                <div className="agricultural-supply-chain-parent">
                                    <b className="agricultural-supply-chain">Agricultural
                                        Supply
                                        Chain
                                    </b>
                                    <img
                                        className="image-5-icon"
                                        src='/images/image-5@2x.png' />
                                </div>
                                <b className="management-system">Management System</b>
                            </div>
                            <div className="dissuade-ecstatic-and12">
                                Bringing trust across complex food chain. We
                                predict, monitor
                                and maintain fair price.
                            </div>
                        </div>
                        <div className="component-11">
                            <div className="discover-more">Discover More</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ================================================= Service Section ====================================================================== --> */}

            <section className="services">
                

                <div className="our-introduction-farmer">
                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <img className="image-6-icon1" 
                            src='/images/image-6@2x.png' />

                        <div className="successfully-project-completed2">
                            <img className="icon7"  src='/images/icon5.png'/>

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number">86,700</div>
                                <div className="successfully-project-completed1">
                                    Successfully Project Completed
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">Farmer</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                                Farmers' The Piler of Agriculture Market.
                            </div>
                            <p className="dissuade-ecstatic-and8">
                                As farmer grapple with dwindling profits,
                                they’re stepping
                                away from their field, cast shadow over our
                                nation’s destiny
                                and leaving us on the brink of uncertainty.
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Provide marginal revenue and cost of harvest
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Keeping track of agriculture optimize
                                    logistics
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Help create project to optimize
                                    harvest</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Tracking and providing potential traders
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Providing full transparency</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Keeping secure statement of
                                    transaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="our-introduction-farmer trader-part">
                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">Farmer</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                                Farmers' The Piler of Agriculture Market.
                            </div>
                            <p className="dissuade-ecstatic-and8">
                                As farmer grapple with dwindling profits,
                                they’re stepping
                                away from their field, cast shadow over our
                                nation’s destiny
                                and leaving us on the brink of uncertainty.
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Provide marginal revenue and cost of harvest
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Keeping track of agriculture optimize
                                    logistics
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Help create project to optimize
                                    harvest</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Tracking and providing potential traders
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Providing full transparency</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Keeping secure statement of
                                    transaction</div>
                            </div>
                        </div>
                    </div>

                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <img className="image-6-icon1" 
                            src='/images/image-6@2x.png'/>

                        <div className="successfully-project-completed2">
                            <img className="icon7"  src='/images/icon5.png'/>

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number">86,700</div>
                                <div className="successfully-project-completed1">
                                    Successfully Project Completed
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="our-introduction-farmer wholesaler-part">
                    <div className="service-styles">
                        <div className="style3"></div>
                        <div className="style4"></div>
                        <img className="image-6-icon1" 
                            src='/images/image-6@2x.png'/>

                        <div className="successfully-project-completed2">
                            <img className="icon7"  src='/images/icon5.png'/>

                            <div className="successfully-project-completed-item"></div>
                            <div className="group">
                                <div className="project-number">86,700</div>
                                <div className="successfully-project-completed1">
                                    Successfully Project Completed
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text4">
                        <div className="title3">
                            <div className="home">OUR SERVICES</div>
                            <b className="customer">Farmer</b>
                        </div>
                        <div className="at-the-end-the-food-reaches-o-parent">
                            <div className="at-the-end">
                                Farmers' The Piler of Agriculture Market.
                            </div>
                            <p className="dissuade-ecstatic-and8">
                                As farmer grapple with dwindling profits,
                                they’re stepping
                                away from their field, cast shadow over our
                                nation’s destiny
                                and leaving us on the brink of uncertainty.
                            </p>
                        </div>
                        <div className="title">
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Provide marginal revenue and cost of harvest
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Keeping track of agriculture optimize
                                    logistics
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Help create project to optimize
                                    harvest</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">
                                    Tracking and providing potential traders
                                </div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Providing full transparency</div>
                            </div>
                            <div className="material-symbolscheck-circle-parent">
                                <img
                                    className="rifacebook-fill-icon"
                                    
                                    src='/images/materialsymbolscheckcircle.png'/>

                                <div className="div">Keeping secure statement of
                                    transaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                <img className='service-bg-style' src='/images/style3@2x.png' alt="" />

            </section>

            {/* <!-- ================================================= Outcomes Section ====================================================================== --> */}

            <section className="modern-agriculture">

                <div className="left-side">
                    <img
                        className="pexels-tom-fisk-2468399-1-icon left-img"
                        
                        src='/images/pexelstomfisk2468399-1@2x.png'/>

                    <div className="component-22">
                        <img className="image-21-icon seal-icon" 
                            src='/images/image-21@2x.png'/>
                    </div>
                </div>

                <div className="right-side">
                    <div className="style">
                        <div className="style-child">
                            <div className="style-item"></div>
                        </div>
                        
                    </div>
                    <div className="heading">
                        <div className="modern-agriculture1">MODERN AGRICULTURE</div>
                        <b className="outcomes-of-our">Outcomes of Our Services</b>
                    </div>

                    <div className="growths">
                        <div className="row1">
                            <div className="economic-growth">
                                <img className="icon"  src='/images/icon.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Economical Growth</div>
                                    <p className="dissuade-ecstatic-and5">
                                        With our service we will be able to protect the
                                        economy from
                                        being influenced by price hikes.
                                    </p>
                                </div>
                            </div>

                            <div className="complete-transparency">
                                <img className="icon"  src='/images/icon.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Complete
                                        Transparency</div>
                                    <p className="dissuade-ecstatic-and5">
                                        With our service we will be able to protect
                                        the
                                        economy from
                                        being influenced by price hikes.
                                    </p>
                                </div>
                            </div>



                            <div className="improve-quality-control">
                                <img className="icon"  src='/images/icon.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Improve Quality
                                        Control</div>
                                    <p className="dissuade-ecstatic-and5">
                                        With our service we will be able to protect
                                        the
                                        economy from
                                        being influenced by price hikes.
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div className="row2">
                            <div className="optimized-supply-chain">
                                <img className="icon1"  src='/images/icon1.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Optimized Supply
                                        Chain</div>
                                    <p className="dissuade-ecstatic-and2">
                                        Through efficient loadout plans and project
                                        management we are
                                        able to provide fresh food in time.
                                    </p>
                                </div>
                            </div>
                            <div className="reduce-wastage">
                                <img className="icon1"  src='/images/icon1.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Reduce Wastage</div>
                                    <p className="dissuade-ecstatic-and2">
                                        Through efficient loadout plans and project
                                        management we are
                                        able to provide fresh food in time.
                                    </p>
                                </div>
                            </div>

                            <div className="fair-price">
                                <img className="icon1"  src='/images/icon1.png'/>
    
                                <div className="title-description1">
                                    <div className="economical-growth">Fair Price</div>
                                    <p className="dissuade-ecstatic-and2">
                                        Through efficient loadout plans and project
                                        management we are
                                        able to provide fresh food in time.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        
                        
                    </div>

                    <img className="style-icon2 background-design-img" 
                        src='/images/style2@2x.png'/>
                </div>

            </section>

            
        {/* <!-- =========================================== Agculture metters======================================================================================================== --> */}
        <section className="agriculture-matters-video-sec">

            <img src='/images/image@2x.png' className='agriculture-matters-video-sec-img'></img>
            <div className="text2 agri-heading">
              <b className="agro-quote">
                <p className="the-future-of">Agriculture Matters to</p>
                <p className="the-future-of">the Future of Bangladesh</p>
              </b>
            </div>

            <div className="agro-play-icon">
                <img className="play-btn-2"  src='/images/play-btn-2.png'/>
                <div className="watch-the-video">Watch the video</div>
               </div>
          </section>

          {/* <!-- ================================================= Testimonial Section ====================================================================== --> */}

        <section className="testimonials1">
            <div className="title2">
              <div className="contact-now">Our Testimonials</div>
              <b className="get-in-touch">WHAT THEY’RE TAKING ABOUT</b>
            </div>
            <div className="message">
              <div className="client-review">
                <img className="picture-icon"  src='/images/picture.png'/>
  
                <div className="message1">

                    <img className="stars-icon"  src='/images/stars.png'/>

                  <p className="lorem-ipsum-dolor">
                    “Lorem ipsum dolor sit amet consectetur. Tortor tempus cursus
                    leo dictumst elementum. Sagittis elit turpis dignissim turpis
                    tristique venenatis. Tempor id commodo odio nunc id volutpat
                    libero. Ut hendrerit malesuada netus sapien dictum sapien
                    nibh. Cras laoreet risus mus mi commodo volutpat quis neque.
                    Scelerisque at in in id donec ornare velit.
                  </p>
                  <div className="heading-4-darun-due-parent">
                    <div className="div">Tyrese Gibson</div>
                    <div className="heading-6">Customer</div>
                  </div>
                </div>
              </div>
              <div className="carousel">
                <div className="carousel-child"></div>
                <div className="carousel-item"></div>
                <div className="carousel-item"></div>
              </div>
            </div>
          </section>


          {/* <!-- ================================================= News article Section ====================================================================== --> */}

        <section className="atricles">
            <div className="back-style"></div>
            <div className="article-heading">
                <h6>FROM THE BLOG</h6>
                <h3>News & Articles</h3>
            </div>
            <div className="article-wrapper">

                <div className="blog-item">
                    <div className="img-part">
                        <img src='/images/image-26@2x.png'/>
                        <div className="date">3 Sep, 2023</div>
                    </div>

                    <div className="texts-part">
                        <div className="row1">
                            <div className="author">
                                <img className="user-icon"  src='/images/user.png'/>
                                <p>by Kevin Martin</p>
                            </div>
                            <div className="comment">
                                <img className="user-icon"  src='/images/messagecircle.png'/>
                                <p>2 Comments</p>
                            </div>
                        </div>
                        <div className="row2">
                            <h5>
                                Taking seamless key indicators offline to
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="blog-item">
                    <div className="img-part">
                        <img src='/images/image-261@2x.png'/>
                        <div className="date">3 Sep, 2023</div>
                    </div>

                    <div className="texts-part">
                        <div className="row1">
                            <div className="author">
                                <img className="user-icon"  src='/images/user.png'/>
                                <p>by Kevin Martin</p>
                            </div>
                            <div className="comment">
                                <img className="user-icon"  src='/images/messagecircle.png'/>
                                <p>2 Comments</p>
                            </div>
                        </div>
                        <div className="row2">
                            <h5>
                                Taking seamless key indicators offline to
                            </h5>
                        </div>
                    </div>
                </div>

                <div className="blog-item">
                    <div className="img-part">
                        <img src='/images/image-262@2x.png'/>
                        <div className="date">3 Sep, 2023</div>
                    </div>

                    <div className="texts-part">
                        <div className="row1">
                            <div className="author">
                                <img className="user-icon"  src='/images/user.png'/>
                                <p>by Kevin Martin</p>
                            </div>
                            <div className="comment">
                                <img className="user-icon"  src='/images/messagecircle.png'/>
                                <p>2 Comments</p>
                            </div>
                        </div>
                        <div className="row2">
                            <h5>
                                Taking seamless key indicators offline to
                            </h5>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        
        {/* <!-- ================================================= Contact us Section ====================================================================== --> */}

        <section className="contact-us1">
            
            <div className="text1">
              <div className="title-description">
                <div className="title">
                  <div className="contact-now">Contact Now</div>
                  <b className="get-in-touch">GET IN TOUCH NOW</b>
                </div>
                <div className="dissuade-ecstatic-and1">
                  Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse
                  platea dictumst. Duis porta,quam ut finibus ultrices.
                </div>
              </div>
              <div className="contacts">
                <div className="phone-parent">
                  <div className="contact-now">Phone</div>
                  <div className="parent">
                    <div className="div">+880123456789</div>
                    <div className="div">+880987654321</div>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Email</div>
                  <div className="needhelpcompanycom-wrapper">
                    <a className="div">needhelp@company.com</a>
                  </div>
                </div>
                <div className="phone-parent">
                  <div className="contact-now">Address</div>
                  <div className="needhelpcompanycom-wrapper">
                    <div className="div">Road No. 8, Niketan, Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="form">
                <div className="name">
                  <div className="your-name">Your Name</div>
                </div>
                <div className="name">
                  <div className="your-name">Phone Number</div>
                </div>
                <div className="name">
                  <div className="your-name">Your Email</div>
                </div>
                <div className="subject">
                  <div className="your-name">Your Message</div>
                </div>
                <div className="button2">
                  <div className="discover-more">Send Message</div>
                </div>
              </form>
        </section>


        {/* <!-- ================================================= We are leader Section ====================================================================== --> */}

        <div className="we-are-leader">
            <img className="style-icon"  src='/images/style@2x.png'/>

            <div className="we-are-leader-child"></div>
            <div className="icon-text">
                <img className="icon"  src='/images/icon.png'/>

                <div className="copyright-smart-agro">
                    We optimise and increase the perfection of Agriculture Market
                </div>
            </div>
            <div className="button1">
                <div className="discover-more">Discover More</div>
            </div>
        </div>


        {/* <!-- ================================================= Footer ====================================================================== --> */}

        <section className="footer">
            <div className="row1">

                <div className="logo-description-social-ico">
                    <div className="logo-description">
                    <div className="logo-description-inner">
                        <div className="logo-description-inner">
                            <b className="outcomes-of-our">ASCMS</b>
                        </div>
                    </div>
                    <div className="dissuade-ecstatic-and">
                        Lorem ipsum dolor sit amet, adipiscing elit. In hac habitasse
                        platea dictumst. Duis porta,quam ut finibus ultrices.
                    </div>
                    </div>
                    <div className="dividor1"></div>
                    <div className="social-icon">
                    <img
                        className="rifacebook-fill-icon"
                        
                        src='/images/rifacebookfill.png' />
      
                    <img
                        className="rifacebook-fill-icon"
                        
                        src="/images/mditwitter.png"/>
      
                    <img
                        className="rifacebook-fill-icon"
                        
                        src='/images/mdiyoutube.png' />
      
                    <img
                        className="rifacebook-fill-icon"
                        
                        src='/images/basilinstagramsolid.png' />
                    </div>
                </div>
                <div className="useful-links">
                    <div className="economical-growth">Useful Links</div>
                    <div className="links">
                      <a className="nav-link">New Projects</a>
                      <a className="nav-link">Our Services</a>
                      <a className="nav-link">Testimonials</a>
                      <a className="nav-link">About Us</a>
                      <a className="nav-link">Contact us</a>
                    </div>
                </div>
                <div className="newsletter">
                    <div className="text">
                      <div className="economical-growth">Newsletter</div>
                      <div className="subscribe-to-our">
                        Subscribe to our weekly Newsletter and receive updates via
                        email.
                      </div>
                    </div>
                    <div className="input-field">
                      <div className="input-field-child"></div>
                      <div className="enter-yor-mail">Enter yor mail here...</div>
                      <div className="button">
                        <div className="button-child"></div>
                        <div className="go">Go</div>
                      </div>
                    </div>
                  </div>
            </div>

            <div className="dividor"></div>

            <div className="copyright-policy-terms">
              <div className="copyright">
                Copyright ©ASCMS. All Right Reserved.
              </div>
            </div>
            
            
            
        </section>

        </section>
  )
}

export default Home