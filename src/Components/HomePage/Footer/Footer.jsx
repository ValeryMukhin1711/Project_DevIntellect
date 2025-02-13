import React from 'react';
import './Footer.css';

import inst from '../../../icon/instagram.png';
import whatsapp from '../../../icon/whatsapp.png';



function Footer() {
  return (
    <div className='footer'>
        <h1 className='contact'>Contact</h1>

        <div className='container'>
<div className='info'>
<p className='p-footer'>Phone</p>
<h2 className='h-footer'>+49 999 999 99 99</h2>
</div>

<div className='info'>
<p  className='p-footer'>Socials </p>
<img src={inst} alt="instagram" className='socials'/>
<img src={whatsapp} alt="whatsapp" className='socials'/>
</div>

<div className='info'>
<p className='p-footer'>Address</p>
<h2 className='h-footer'>Linkstraße 2, 8 OG, 10 785, Berlin, <br /> Deutschland</h2>
</div>

<div className='info'>
<p className='p-footer'>Working Hours</p>
<h2 className='h-footer'>24 hours a day</h2>
</div>
</div>

        <div className='maps'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.409223179231!2d13.372469776914304!3d52.507932872058085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8515353a68755%3A0xd0866511db4f838f!2sStarta%20Institute%20by%20Tel-Ran!5e0!3m2!1suk!2sua!4v1737678266251!5m2!1suk!2sua"referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
  )
}

export default Footer