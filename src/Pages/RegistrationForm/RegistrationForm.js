import React, { useState } from 'react';
import * as Yup from 'yup'; 
import "../RegistrationForm/RegistrationForm.css";
import { ProviderAdd } from '../../Services/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RegistrationForm() {
  const navigate = useNavigate();
  const initialState = {
    name: '',
    surname: '',
    mobile: '',
    shopEmail:sessionStorage.getItem('email'),
    category: 'menssaloon',
    categoryDetails: '',
    description: '',
    pricing: '',
    IBAN: '',
    bankName: '',
    accountHolder: '',
    PPSNNumber: '',
    residentsProof: "",
    visaDocument: "",
    drivingLicense: "",
    workPermit: "",
    workExperience: '',
    licenseAndCertification: '',
  };

  const [formValue, setFormValue] = useState(initialState);
  const [errors, setErrors] = useState({}); 

 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required'),
      shopEmail: Yup.string().required('Email is required'),
    category: Yup.string().required('Category is required'),
    categoryDetails: Yup.string().required('Category details are required'),
    description: Yup.string().required('Description is required'),
   
    IBAN: Yup.string().required('IBAN is required'),
    bankName: Yup.string().required('Bank name is required'),
    accountHolder: Yup.string().required('Account holder name is required'),
    PPSNNumber: Yup.string().required('PPSN Number is required'),
    residentsProof: Yup.mixed().required('Residents proof is required'),
    visaDocument: Yup.mixed().required('Visa document is required'),
    drivingLicense: Yup.mixed().required('Driving license is required'),
    workPermit: Yup.mixed().required('Work permit is required'),
    workExperience: Yup.string().required('Work experience is required'),
    licenseAndCertification: Yup.string().required('License and certification is required'),
  });

  const toggleSubmit = (e) => {
    console.log(e,formValue)
    e.preventDefault();
    validationSchema.validate(formValue, { abortEarly: false })
      .then(() => {
        console.log(formValue)
        

        ProviderAdd(formValue)
          .then((res) => {
            console.log(res);
            setFormValue(initialState);
            toast.success(res.data.message);
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Error submitting form. Please try again.');
          });
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setFormValue({
          ...formValue,
          [name]: reader.result,
        });
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const toggleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValue({
      ...formValue,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <div className='container'>
      <div className='provLog'>PROVIDERS SIGNUP </div>
      <span>Home > Register PS</span>
      <form>
        <div className='d-flex flex-column'>
          <div className="row">
            <span className='heading'>Registration form</span>
            <span className='fillEv'>Fill everything*</span>
          </div>

          <div className='section'>
            <h3 className="my-5">Personal Details</h3>
            <div className='d-flex flex-wrap'>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Name*</label>
                <input placeholder='Name' className='inputBox' name="name" value={formValue.name} onChange={toggleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Surname*</label>
                <input placeholder='Surname' className='inputBox' name="surname" value={formValue.surname} onChange={toggleChange} />
                {errors.surname && <p className="error">{errors.surname}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Mobile*</label>
                <input placeholder='Mobile' className='inputBox' name="phoneNo" value={formValue.phoneNo} onChange={toggleChange} />
                {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Email Address*</label>
                <input placeholder='Email' className='inputBox' disabled name="shopEmail" value={formValue.shopEmail} onChange={toggleChange} />
                {errors.shopEmail && <p className="error">{errors.shopEmail}</p>}
              </div>
            </div>
          </div>

          
          <div className='section'>
            <h3 className="my-5">Category Service Details</h3>
            <div className='d-flex flex-wrap'>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Category*</label>
                <select className='inputBox' name="category" value={formValue.category} onChange={toggleChange}>
                  <option value="menssaloon">Mens Saloon</option>
                  <option value="womensspa">Womens Spa</option>
                  <option value="acservice">AC Service</option>
                  <option value="painting">Painting</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="car">Car Wash</option>
                  <option value="homeservices">Home Services</option>
                </select>
                {errors.category && <p className="error">{errors.category}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Category Details*</label>
                <input placeholder='Category Details' className='inputBox' name="categoryDetails" value={formValue.categoryDetails} onChange={toggleChange} />
                {errors.categoryDetails && <p className="error">{errors.categoryDetails}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Description*</label>
                <textarea placeholder='Description' className='inputBox' name="description" value={formValue.description} onChange={toggleChange} />
                {errors.description && <p className="error">{errors.description}</p>}
              </div>
            </div>
          </div>

        
          <div className='section'>
            <h3 className="my-5">Bank Details</h3>
            <div className='d-flex flex-wrap'>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>IBAN*</label>
                <input placeholder='IBAN' className='inputBox' name="IBAN" value={formValue.IBAN} onChange={toggleChange} />
                {errors.IBAN && <p className="error">{errors.IBAN}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Bank Name*</label>
                <input placeholder='Bank Name' className='inputBox' name="bankName" value={formValue.bankName} onChange={toggleChange} />
                {errors.bankName && <p className="error">{errors.bankName}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Account Holder Name*</label>
                <input placeholder='Account Holder Name' className='inputBox' name="accountHolder" value={formValue.accountHolder} onChange={toggleChange} />
                {errors.accountHolder && <p className="error">{errors.accountHolder}</p>}
              </div>
            </div>
          </div>

          
          <div className='section'>
            <h3 className="my-5">Document List</h3>
            <div className='d-flex flex-wrap'>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>PPSN Number*</label>
                <input placeholder='PPSN Number' className='inputBox' name="PPSNNumber" value={formValue.PPSNNumber} onChange={toggleChange} />
                {errors.PPSNNumber && <p className="error">{errors.PPSNNumber}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Residents Proof*</label>
                <input  name="residentsProof" className='inputBox'  type="file"
                  accept="image/*"
                  onChange={handleFileChange} />
                {errors.residentsProof && <p className="error">{errors.residentsProof}</p>}
              </div>
              
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Visa Document*</label>
                <input type="file" className='inputBox' name="visaDocument"  accept="image/*"
                  onChange={handleFileChange} />
                {errors.visaDocument && <p className="error">{errors.visaDocument}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Driving License*</label>
                <input type="file" className='inputBox' name="drivingLicense"  accept="image/*"
                  onChange={handleFileChange} />
                {errors.drivingLicense && <p className="error">{errors.drivingLicense}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Work Permit*</label>
                <input type="file" className='inputBox' name="workPermit"  accept="image/*"
                  onChange={handleFileChange}/>
                {errors.workPermit && <p className="error">{errors.workPermit}</p>}
              </div>
            </div>
          </div>

    
          <div className='section'>
            <h3 className="my-5">Certification</h3>
            <div className='d-flex flex-wrap'>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>Work Experience*</label>
                <input placeholder='Work Experience' className='inputBox' name="workExperience" value={formValue.workExperience} onChange={toggleChange} />
                {errors.workExperience && <p className="error">{errors.workExperience}</p>}
              </div>
              <div className='input-pair my-2 '>
                <label className='inputLabel'>License and Certification*</label>
                <input placeholder='License and Certification' className='inputBox' name="licenseAndCertification" value={formValue.licenseAndCertification} onChange={toggleChange} />
                {errors.licenseAndCertification && <p className="error">{errors.licenseAndCertification}</p>}
              </div>
            </div>
          </div>

          <div>
            <button type='submit' className='btn' onClick={toggleSubmit}>Save</button>
            <button type='reset' className='btn' onClick={() => setFormValue(initialState)}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
