import React, { useEffect , useState} from "react";
import firstimg from "../../Assets/HomePage/High coziness.png";
import secondImg from "../../Assets/HomePage/image 22.png";
import smallimg1 from "../../Assets/HomePage/spa.jpg";
import heart from "../../Assets/HomePage/Frame 49.png";
import acservice from "../../Assets/HomePage/Ac service.png";
import menssaloon from "../../Assets/HomePage/salon.jpg";
import painting from "../../Assets/HomePage/applied.jpg";
import electric from "../../Assets/HomePage/homerepair.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GetShops } from "../../Services/Api";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"
import Navbar from "../navbar/Navbar";
import arrow from "../../Assets/HomePage/right-arrow.png"
import quality from "../../Assets/HomePage/quality.png"
import Footer from "../Footer/Footer";

function Homepage() {
  const navigate = useNavigate();
  function getShopsApi () {
    const category = "Saloddddon";
    GetShops(category)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      });
  };

  useEffect(() => {
    getShopsApi();
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([
    { value: 'Dublin City', label: 'Dublin City' },
    { value: 'Adamstown', label: 'Adamstown' },
    { value: 'Blanchardstown', label: 'Blanchardstown' },
    { value: 'Castleknock', label: 'Castleknock' },
    { value: 'Citywest', label: 'Citywest' },
    { value: 'Clondalkin', label: 'Clondalkin' },
    { value: 'Dún Laoghaire', label: 'Dún Laoghaire' },
    { value: 'Finglas', label: 'Finglas' },
    { value: 'Howth', label: 'Howth' },
    { value: 'Killiney', label: 'Killiney' },
    { value: 'Lucan', label: 'Lucan' },
    { value: 'Newcastle', label: 'Newcastle' },
    { value: 'Ongar', label: 'Ongar' },
    { value: 'Sandyford', label: 'Sandyford' },
    { value: 'Sandymount', label: 'Sandymount' },
    { value: 'Smithfield', label: 'Smithfield' },
    { value: 'Swords', label: 'Swords' },
    { value: 'Tallaght', label: 'Tallaght' },
    { value: 'Walkinstown', label: 'Walkinstown' }
  ]);
  

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange = (selectedOption) => {
    setInputValue(selectedOption ? selectedOption.label : '');
    navigate('/services')
  };

  const handleNavigation = () => {
    navigate('/services');
  };


  const customComponents = {
    DropdownIndicator: null,
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1800,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselImages = [
    "https://static.vecteezy.com/system/resources/previews/010/719/386/non_2x/construction-workers-building-the-wall-vector.jpg" ,
    "https://cdni.iconscout.com/illustration-pack/preview/hair-salon-18-155393.png",
    "https://static.vecteezy.com/system/resources/previews/007/784/048/non_2x/plumber-workers-working-in-the-home-vector.jpg"
  ];

  const carouselSettings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true, // Enable fade effect
    cssEase: 'linear',
  };


  const secondGrid = [
    { img: smallimg1,name:"Female Spa" },
    { img: menssaloon,name:"Mens Salon" },
    { img: electric,name:"Appliance Repair & Service" },
    { img: painting ,name:"Home Repair & Installation"},
  ];

  const forthGrid = [
    { img: electric },
    { img: electric },
    { img: electric },
    { img: electric },
  ];
   

  const review = [
    {
      photo: smallimg1,
      name: "John",
      comment:
       "Excellent assistance! The desired haircut was precisely what I requested from the skilled barber. The reservation procedure went smoothly, and I valued the prompt reminders. I will undoubtedly use HomeEase for all of my grooming requirements." },
    {
      photo: smallimg1,
      name: "John",
      comment:
      "It was just what I needed—a really soothing body massage. The therapist was knowledgeable and sensitive to my needs. Making a reservation with HomeEase was simple and hassle-free. Strongly advised!"  },
    {
      photo: smallimg1,
      name: "Robert",
      comment:"HomeEase's fast appliance repair service came to the rescue.My washing machine was swiftly fixed by the skilled technician. The cost was fair, and the entire procedure went smoothly. Great assistance!"

       },
    {
      photo: smallimg1,
      name: "Tony",
      comment:
      "I'm really happy with HomeEase's house repair services. The handyman was effective and easily fixed all of my problems. Booking and monitoring the service was incredibly simple thanks to the app. Will make use of once again."},
    {
      photo: smallimg1,
      name: "Steve",
      comment:
      "The furniture assembly service from HomeEase was decent. The professional arrived on time and was courteous. The furniture was assembled correctly, though it took slightly longer than expected. Overall, a satisfactory experience."},
    {
      photo: smallimg1,
      name: "Robert",
      comment:
     "Thanks to HomeEase, I had a wonderful spa day at home! The therapist was on time, friendly, and offered excellent care. I can already feel my skin getting younger, and I'm excited for my upcoming checkup."},
    {
      photo: smallimg1,
      name: "Mathews",
      comment:
     "I used HomeEase to schedule a thorough house cleaning, and the outcomes were largely satisfactory. Despite a few omissions, the cleaners performed a fantastic job and showed professionalism. Making reservations via the app was really practical. I'd make use of the service once more."},
     {
      photo: smallimg1,
      name: "John Smith",
      comment:
     "I was pleased with HomeEase's painting job. My living room walls look great, and the painters were neat and competent. I'm happy with the result overall, however there were a few small adjustments that needed to be made."}, 
        {
      photo: smallimg1,
      name: "Willams",
      comment:"I thoroughly cleaned my kitchen and bathroom with HomeEase. Overall, the cleaners performed well and with thoroughness. Although there were certain places that needed cleaning, the service was still worth it because of how convenient it was. I'd think about employing them once more."
     }, 

     {
      photo: smallimg1,
      name: "July",
      comment:
     "I had a good experience water proofing with HomeEase. The specialist gave my basement a good solution and was quite knowledgable. Despite the fact that I had to follow up once to confirm the appointment, the service was professional. pleased with the outcome."},
  ];

  const whyHomeEasePoints = [
    "Single Platform Solution ",
    "Transparent Rates",
    "Fully Equipped with Experts ",
  ];

  const whyHomeEaseImage = "https://via.placeholder.com/300";

  return (
    <>
    <Navbar />
    <div className="container-fluid">
      <div className="d-flex flex-column flex-md-column justify-content-around align-items-center">
        <div className="col-8 mt-5 ">
          <span className="welcomeTag gradient-text">Welcome to HomeEase ! {sessionStorage.getItem('username')?sessionStorage.getItem('username'):""}</span>
          <Select
      components={customComponents}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      options={options}
      isClearable
      isSearchable
      placeholder="Search for Location"
      noOptionsMessage={() => 'Type to add new value'}
      className="selectBar"
    />
        </div>
        <div className="d-flex img-grid">
        {/* <div className="mb-3 mb-md-0 col-6">
          <img src="https://static.vecteezy.com/system/resources/previews/010/719/386/non_2x/construction-workers-building-the-wall-vector.jpg" className="rounded img-fluid" alt="First Image" />
        </div> */}
        <div className="mb-3 mb-md-0 col-6">
              <Slider {...carouselSettings}>
                {carouselImages.map((img, index) => (
                  <img key={index} src={img} className="rounded img-fluid" alt="First Image" className="rounded img-fluid" alt={`Carousel Image ${index + 1}`} />
                ))}
              </Slider>
            </div>
         <div className="col-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/984/801/large_2x/housekeeping-team-with-cleaning-equipment-free-vector.jpg"
            className="rounded img-fluid"
            alt="Second Image"
          />
        </div>
        </div>
      </div>

      <div className="why-home-ease-section mt-5 ">
          <span className="subText">Why Home Ease?</span>
          <div className="d-flex justify-content-around align-items-center mt-4 py-4 whyContainer">
            <div className="why-home-ease-points">
              {whyHomeEasePoints.map((point, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <img src={arrow} style={{width:"30px"}} className="arrow-icon mr-2 " alt="Arrow Icon" />
                  <span className="mx-5">{point}</span>
                </div>
              ))}
            </div>
            <div className="why-home-ease-image">
              <img src={quality} style={{width:"250px"}} className="rounded img-fluid" alt="Why Home Ease Image" />
            </div>
          </div>
        </div>

      <div className="thirdGrid">
        <span className="subText">Most Booked Services</span>
        <div className="d-flex flex-wrap align-items-center justify-content-around mx-lg-4 mt-4">
          {secondGrid.map((item, index) => (

            <div
              key={index}
              className="img-container small-img-container position-relative"
            >
               <Link 
        to="/services" state={{some:item.name}}
      >
              <div className="mb-4">
                <img
                  src={item.img}
                  className="rounded img-fluid imgdimension3"
                  alt=""
                />
                <img src={heart} className="heart-icon" alt="Heart Icon" />
              </div>
              </Link>
              <span style={{ fontFamily: "Causten" }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="container-fluid reviewTab">
        <span className="subText">Feedback</span>
        <div className="slider-container">
          <Slider {...settings} className="mt-5">
            {review.map((item, index) => (
              <div className="reviewBox">
                <p className="reviewName">{item.name}</p>
                <p className="reviewComment">{item.comment}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* <div class="d-flex flex-column flex-md-row justify-content-center align-items-center mt-5 container">
  <div class="footerImage">
    <img src="https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/GettyImages-947995974-1920x1152.jpg" class="rounded img-fluid" alt="First Image" />
     </div>
  <div class="footerImage">
    <img src="https://media.istockphoto.com/id/506597420/photo/sanitary-installation.jpg?s=612x612&w=0&k=20&c=3O8c-ZrKqHyOak6obfYsUsV_TV_d0Y_9Is3c4v_Uaso=" class="rounded img-fluid" alt="Second Image" />
     </div>
</div> */}
<div className="image-row">
<div class="footerImage">
  <div class="image-container1">
    <img src="https://www.nerdwallet.com/assets/blog/wp-content/uploads/2017/10/GettyImages-947995974-1920x1152.jpg" class="rounded img-fluid footerimg" alt="..." />
    <button class="image-button" onClick={handleNavigation}>Explore Personal Care</button>  </div>
</div>
<div class="footerImage">
  <div class="image-container2">
    <img src="https://media.istockphoto.com/id/506597420/photo/sanitary-installation.jpg?s=612x612&w=0&k=20&c=3O8c-ZrKqHyOak6obfYsUsV_TV_d0Y_9Is3c4v_Uaso=" class="rounded img-fluid footerimg" alt="..." />
    <button class="image-button" onClick={handleNavigation}>Explore Home Care</button>  </div>
</div>
</div>
 <Footer/>
    </div>
    </>
  );
}

export default Homepage;
