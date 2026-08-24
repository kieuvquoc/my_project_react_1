import React, { useState } from 'react';
import { PlayCircle, ArrowRightCircle } from 'lucide-react';

const videoGalleries = [
  { id: 1, img: 'images/home/iframe1.png', title: 'Circle of Hands', date: '24 DEC 2014' },
  { id: 2, img: 'images/home/iframe2.png', title: 'Circle of Hands', date: '24 DEC 2014' },
  { id: 3, img: 'images/home/iframe3.png', title: 'Circle of Hands', date: '24 DEC 2014' },
  { id: 4, img: 'images/home/iframe4.png', title: 'Circle of Hands', date: '24 DEC 2014' }
];

const footerLinks = {
  service: [
    { name: 'Online Help', url: '#' },
    { name: 'Contact Us', url: '#' },
    { name: 'Order Status', url: '#' },
    { name: 'Change Location', url: '#' },
    { name: 'FAQ’s', url: '#' }
  ],
  quickShop: [
    { name: 'T-Shirt', url: '#' },
    { name: 'Mens', url: '#' },
    { name: 'Womens', url: '#' },
    { name: 'Gift Cards', url: '#' },
    { name: 'Shoes', url: '#' }
  ],
  policies: [
    { name: 'Terms of Use', url: '#' },
    { name: 'Privacy Policy', url: '#' },
    { name: 'Refund Policy', url: '#' },
    { name: 'Billing System', url: '#' },
    { name: 'Ticket System', url: '#' }
  ],
  about: [
    { name: 'Company Information', url: '#' },
    { name: 'Careers', url: '#' },
    { name: 'Store Location', url: '#' },
    { name: 'Affiliate Program', url: '#' },
    { name: 'Copyright', url: '#' }
  ]
};

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Xử lý gửi email tại đây
    console.log('Subscribed email:', email);
    setEmail('');
  };

  return (
    <footer id="footer">
      {/* Top Footer Section */}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="companyinfo">
                <h2><span>e</span>-shopper</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
              </div>
            </div>

            <div className="col-sm-7">
              {videoGalleries.map((video) => (
                <div className="col-sm-3" key={video.id}>
                  <div className="video-gallery text-center">
                    <a href="#video">
                      <div className="iframe-img">
                        <img src={video.img} alt={video.title} />
                      </div>
                      <div className="overlay-icon">
                        <PlayCircle size={24} />
                      </div>
                    </a>
                    <p>{video.title}</p>
                    <h2>{video.date}</h2>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-sm-3">
              <div className="address">
                <img src="images/home/map.png" alt="Map Location" />
                <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-widget">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              <div className="single-widget">
                <h2>Service</h2>
                <ul className="nav nav-pills nav-stacked">
                  {footerLinks.service.map((link, idx) => (
                    <li key={idx}><a href={link.url}>{link.name}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="single-widget">
                <h2>Quick Shop</h2>
                <ul className="nav nav-pills nav-stacked">
                  {footerLinks.quickShop.map((link, idx) => (
                    <li key={idx}><a href={link.url}>{link.name}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="single-widget">
                <h2>Policies</h2>
                <ul className="nav nav-pills nav-stacked">
                  {footerLinks.policies.map((link, idx) => (
                    <li key={idx}><a href={link.url}>{link.name}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-sm-2">
              <div className="single-widget">
                <h2>About Shopper</h2>
                <ul className="nav nav-pills nav-stacked">
                  {footerLinks.about.map((link, idx) => (
                    <li key={idx}><a href={link.url}>{link.name}</a></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-sm-3 col-sm-offset-1">
              <div className="single-widget">
                <h2>Get Updates</h2>
                <form onSubmit={handleSubscribe} className="searchform">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-default">
                    <ArrowRightCircle size={16} />
                  </button>
                  <p>Get the most recent updates from <br />our site and be updated your self...</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <p className="pull-left">Copyright © 2013 E-SHOPPER Inc. All rights reserved.</p>
            <p className="pull-right">
              Designed by <span><a target="_blank" rel="noopener noreferrer" href="http://www.themeum.com">Themeum</a></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;