import { useState } from "react"
import React from 'react'
import axios from "axios"

const ServiceForm = () => {

    
const [formValue , setFormValue ]= useState({})

const toggleSubmit =(e)=>{
  e.preventDefault()
  console.log(formValue)
//    addService(formValue)
//    .then((res)=>{
//     console.log(res)
//    }) .catch((err)=>{
//     console.log(err)
//    })
}

const toggleChange =(e)=>{
  const {name , value } = e.target
  setFormValue({
    ...formValue ,
    [name]:value ,
  })
}

  
  return (
    <>
    
    <div className='container'>
      <form>
        <div className='d-flex flex-column'>
          <div className="row">
          <span className=' heading'>Service</span>
          <span className='fillEv'>Fill everything*</span>
          </div>

          <div className='d-flex flex-wrap formStarts'>
            <div className='input-pair'>
              <label className='inputLabel'>Shop name*</label>
              <input placeholder='shopName' className='inputBox' name="shopName" value={formValue.shopName} onChange={toggleChange}/>
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Service Name*</label>
              <input placeholder='Name' name="serviceName" className='inputBox' value={formValue.serviceName} onChange={toggleChange} />
            </div>
          </div>

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Phone*</label>
              <input placeholder='Phone' name='phoneNo' className='inputBox' value={formValue.phoneNo} onChange={toggleChange} />
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Email ID*</label>
              <input placeholder='Email' className='inputBox' name='shopEmail' value={formValue.shopEmail} onChange={toggleChange} />
            </div>
          </div>
          
          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Description*</label>
              <input type="textBox" placeholder='Description' name='description' className='inputBox' value={formValue.description} onChange={toggleChange} />
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Price</label>
              <input placeholder='Price' className='inputBox' name='price' value={formValue.price} onChange={toggleChange} />
            </div>
          </div>
          

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Attach Images</label>
              <input placeholder='Images' className='inputBox' value={formValue.images} name="images" onChange={toggleChange} />
            </div>
          </div>

<div className='inputFields'>
            <div className='d-flex align-items-center'>
              <input type="checkbox" placeholder='Images' className='' value={formValue.postalCode} name="postalCode" onChange={toggleChange} />
              <label className='inputLabel mt-2 mx-2'>Set as default shop address</label>
            </div>
          </div> 
            <div>
              <button type='submit' className='btn' onClick={toggleSubmit} >Save</button>
              <button type='submit' className='btn' >Cancel</button>
            </div>

        </div>
      </form>
    </div>
    </>
  )
}

export default ServiceForm