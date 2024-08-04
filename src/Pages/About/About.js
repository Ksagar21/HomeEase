import React from 'react';
import Navbar from '../navbar/Navbar';
import './About.Css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="page-container container-fluid">
        <div className="centered-container">
          <p className='text-center mt-5 aboutTxt' style={{fontSize:"40px"}}>About Us</p>
          <img src="https://static.vecteezy.com/system/resources/previews/010/718/343/non_2x/carpenter-working-in-a-workshop-vector.jpg" alt="About Us" className="image text-center about-imag" />
          <div className='content-container container'>
          <p style={{fontSize:"20px"}}>Welcome to HomeEase, your one-stop solution for all personal and home care needs. At HomeEase, we are committed to the convenience and excellence that make your life easier and more enjoyable. Our platform connects you with a wide range of professional services, ensuring that whatever you need, we can make it happen efficiently and effectively..</p>
          <p style={{fontSize:"20px"}}>Whether you’re looking for home services, personal care, or specialized maintenance, HomeEase offers a curated selection of top-rated professionals ready to deliver exceptional results. Our user-friendly interface allows you to browse, book, and manage your services seamlessly. Our team is composed of skilled professionals who are passionate about their work and dedicated to providing outstanding service.</p>
          <p style ={{fontSize:"20px"}}>At HomeEase, your satisfaction is our top priority. We aim to provide an unparalleled experience, simplifying the process of accessing essential services while saving you time and money. Join our community of satisfied customers and experience the convenience and reliability of HomeEase today! Thank you for choosing us. We look forward to serving you!.</p>
          </div>
         
        </div>
      </div>
      <div class=" footerDiv">
<footer class="py-3 my-4 ">
<ul class="nav justify-content-center border-bottom pb-3 mb-3">
<li class="nav-item"><a href="/about" class="nav-link px-2 text-muted">About Us</a></li>
<li class="nav-item"><a href="/contact" class="nav-link px-2 text-muted">Contact Us</a></li>
</ul>
<p class="text-center text-muted">© 2024 He. All rights reserved.</p>
</footer>
</div>
    </>
  );
}

export default About;
