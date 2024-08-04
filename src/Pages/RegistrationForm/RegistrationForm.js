import React, { useState } from 'react'
import "../RegistrationForm/RegistrationForm.css"
import { ProviderAdd } from '../../Services/Api'
import axios from 'axios'
// import {FormSubmit} from 

function RegistrationForm() {

const [formValue , setFormValue ]= useState({})

const toggleSubmit =(e)=>{
  e.preventDefault()
  console.log(formValue)

   ProviderAdd(formValue)
   .then((res)=>{
    console.log(res)
   }) .catch((err)=>{
    console.log(err)
   })
}

const toggleChange =(e)=>{
  const {name , value } = e.target
  setFormValue({
    ...formValue ,
    [name]:value ,
  })
}



const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post("http://localhost:5000/api/provider/upload/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response)
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  return (
 


    <div className='container'>
      <span>Home > Register PS</span>
      <form>
        <div className='d-flex flex-column'>
          <div className="row">
          <span className=' heading'>Registration form</span>
          <span className='fillEv'>Fill everything*</span>
          </div>

          <div className='d-flex flex-wrap formStarts'>
            <div className='input-pair'>
              <label className='inputLabel'>Shop name*</label>
              <input placeholder='shopName' className='inputBox' name="shopName" value={formValue.shopName} onChange={toggleChange}/>
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Your Name*</label>
              <input placeholder='UserName' name="name" className='inputBox' value={formValue.name} onChange={toggleChange} />
            </div>
          </div>

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Phone*</label>
              <input placeholder='Phone' name='phoneNo' className='inputBox' value={formValue.phoneNo} onChange={toggleChange} />
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Email ID*</label>
              <input placeholder='Email' className='inputBox' name='emailId' value={formValue.emailId} onChange={toggleChange} />
            </div>
          </div>

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>category*</label>
              {/* <input placeholder='Choose' className='inputBox' value={""} /> */}
              <select placeholder='Choose' className='inputBox' name="category" value={formValue.category} onChange={toggleChange}>
              <option value = "menssaloon">Mens Saloon</option>
              <option value = "womensspa">Womens Spa</option>
              <option value = "acservice">Ac Service</option>
              <option value = "painting">Painting</option>
              <option value = "plumbing">Plumbing</option>
              <option value = "electrical">Electrical</option>
              <option value = "car">Car Wash</option>
              <option value = "homeservices">Home Services</option>
              </select>
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Shops EmailId</label>
              <input placeholder='Email' className='inputBox' name="shopEmail" value={formValue.shopEmail} onChange={toggleChange} />
            </div>
          </div>

          {/* <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Country / Region*</label>
              <input placeholder='Country / Region' className='inputBox' name="CountryOrRegion" value={formValue.shopName} onChange={toggleChange} />
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Company Name</label>
              <input placeholder='Company (optional)' className='inputBox' name ="CompanyName" value={formValue.shopName} onChange={toggleChange}/>
            </div>
          </div> */}

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Street Address*</label>
              <input placeholder='House number and street name' className='inputBox' name="address" value={formValue.address} onChange={toggleChange} />
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>Area</label>
              <input placeholder='apartment, suite, unit, etc. (optional)' className='inputBox' name="area" value={formValue.area} onChange={toggleChange} />
            </div>
          </div>

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>City*</label>
              <input placeholder='Town / City' className='inputBox' value={formValue.city} name="city" onChange={toggleChange}/>
            </div>
            <div className='input-pair'>
              <label className='inputLabel'>State*</label>
              <input placeholder='State' className='inputBox' value={formValue.state} name="state" onChange={toggleChange}/>
            </div>
          </div>

          <div className='d-flex flex-wrap inputFields'>
            <div className='input-pair'>
              <label className='inputLabel'>Eir-Code*</label>
              <input placeholder='Eir-Code' className='inputBox' value={formValue.postalCode} name="postalCode" onChange={toggleChange} />
            </div>
          </div>

            <div>
              <button type='submit' className='btn' onClick={toggleSubmit} >Save</button>
              <button type='submit' className='btn' >Cancel</button>
            </div>
        </div>
      </form>
    </div>
  )
}


export default RegistrationForm

