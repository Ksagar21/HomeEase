import React from 'react'
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <div class=" footerDiv">
    <footer class="py-3 my-4 ">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
    <li class="nav-item"><Link to="/about" className="nav-link"><a href="" class="nav-link px-2 text-muted">About Us</a></Link></li>
    <li class="nav-item"><Link to="/contact" className="nav-link"><a href="/contact" class="nav-link px-2 text-muted">Contact Us</a></Link></li>
    </ul>
    <p class="text-center text-muted">© 2024 He. All rights reserved.</p>
    </footer>
    </div>
  )
}

export default Footer