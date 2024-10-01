import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const locations = [
  {
    title: "Phoenix Clinic in Borivali",
    subtitle: "Phoenix & Mumbai",
    imgSrc: "/images/ph1.png", // Replace with actual image paths
  },
  {
    title: "Phoenix Clinic in Florida",
    subtitle: "Jacksonville",
    imgSrc: "/images/ph2.png",
  },
  {
    title: "Phoenix Clinic in Minnesota",
    subtitle: "Rochester",
    imgSrc: "/images/ph3.png",
  },
  {
    title: "Phoenix Clinic Health System",
    subtitle: "Iowa, Minnesota, Wisconsin",
    imgSrc: "/images/ph4.png",
  },
  {
    title: "Phoenix Clinic Healthcare",
    subtitle: "London, United Kingdom",
    imgSrc: "/images/ph5.jfif",
  },
];

const HomePageComponent=()=>{

    return(
    <>
    <section>
        <Carousel>
      <Carousel.Item interval={2000}>
        <img style={{objectFit:'cover', height:"75vh"}} className='d-block w-100' src='\images\slideshowhomeone.jpg' alt='first slide'/>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img style={{objectFit:'cover', height:"75vh"}} className='d-block w-100' src='\images\slide2.jpg' alt='first slide'/>
        <Carousel.Caption>
          <p className='c2 h3 text-dark text-start'><i>Ranked #1 as</i></p>
          <p className='c2 h1 text-dark text-start'>THE BEST HOSPITAL</p>
          <p className='c2 h6 text-secondary text-start'>Get the best professional medical</p>
          <p className='c2 h6 text-secondary text-start'>help from our modern hospital</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>



    <section>
    <Container className="pt-5">
      <Row>
      <Col md={6} lg={4} className="mb-4 text-start">
      <h2 className="mb-3 mt-5 fw-bold" style={{fontFamily:"georgia"}}>Locations</h2>
      <p className="lead fw-normal mb-2">
        Learn more about Phoenix Clinic locations or choose a specific location.
      </p>
      <Button variant="outline-primary" className="mb-4 border-2">
        Explore all locations
      </Button>
      </Col>
        {locations.map((location, index) => (
          <Col md={6} lg={4} key={index} className="mb-4">
            <Card className="bg-dark text-white border-0">
              <Card.Img src={location.imgSrc} alt={location.title} />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end">
                <Card.Title>{location.title}</Card.Title>
                <Card.Text>{location.subtitle}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </section> 





    <section>

      <Row>
        <Col md={6} className="offset-md-6 p-5 mt-5" style={{ backgroundColor: '#1C73C5', color: 'white' }}>
          <h2 className='text-start'>OUR PHILOSOPHY</h2>
          <h5 className='text-start'>This is the subtitle for the heading</h5>
          <p className='text-start'>
            Patients have an important role to play at each stage of their care and the five safety tips will
            serve to encourage them to be more involved in their health care.
          </p>
          <p className='text-start'>
            Patients can do a lot of small things to make their health-care experience as safe as possible.
          </p>
          <p className='text-start'>
            Hospitals are places of recovery and healing but there are also safety risks for patients, such as
            infections, falls and medication errors that can happen despite our best efforts.
          </p>
          <Button className='d-flex align-item-start rounded-0' variant="danger" size="lg" >Learn More</Button>
        </Col>
      </Row>
    </section>



    <section style={{backgroundColor:"white"}}>
    <Container className="pt-5">
      <Row className="align-items-center ">
        <Col md={6}>
          <Image 
            src="\images\world-class care-MC1XASH-600x800.avif"
            alt="World-class care for global patients"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <h2 className="display-5 fw-bold" style={{fontFamily:"georgia"}}>World-class care for global patients</h2>
          <p className="lead fw-normal">
            We make it easy for patients around the world to get care from Phoenix Clinic.
          </p>
          <Button variant="outline-primary" size="lg" href='http://localhost:3000/services' className='border-2'>
            International services
          </Button>
        </Col>
      </Row>
    </Container>
    </section>




    <section style={{backgroundColor:"white"}}>
    <Container className="pt-5">
      <Row className="align-items-center text-start">
        <Col md={6}>
          <h2 className="display-5 fw-bold" style={{fontFamily:"georgia"}}>
          Healing starts here</h2>
          <p className='fw-bold mb-1'>The right answers the first time</p>
          <p className="lead fw-normal mb-2">
          Effective treatment depends on getting the right diagnosis. Our experts diagnose and treat the toughest medical challenges..
          </p>
          <p className='fw-bold mb-1'>Top-ranked in the IND.</p>
          <p className="lead fw-normal mb-2">Phoenix Clinic has more No. 1 rankings than any other hospital in the nation according to IND. News & World Report.</p>
          <Button variant="outline-primary" size="lg" href='http://localhost:3000/departments' className='border-2 mb-5'>
            Why choose Phoenix Clinic
          </Button>
        </Col>
        <Col md={6}>
          <Image 
            src="\images\healing-starts-here-MC11REJU-600x800.avif"
            alt="International services img"
            fluid
            rounded
          />
        </Col>
      </Row>
    </Container>
    </section>




    <section>
      <h3 className='mt-5 mb-5'>OUR SERVICES</h3>
      <Carousel>
      <Carousel.Item interval={1000}>
      <div className='container mb-5'>
            <div className="row gy-4">
           
            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/Nephrologist-Care-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Nephrologist Care</Card.Title>
               <Card.Text className='custom-card-text'>
               Tell me why, I love you like I do. Tell me who, could stop my heart as much as you. Let’s take each...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/Facility-Optic-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Eye Care</Card.Title>
               <Card.Text className='custom-card-text'>
               Well we’re movin’ on up, to the east side. To a deluxe apartment in the sky. Movin’ on up, To the east side...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/Depositphotos_11882261_original-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Pediatrician Clinic</Card.Title>
               <Card.Text className='custom-card-text'>
               My kinda people, my kinda place. There’s something special about this place. Got no reason to stray too...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/prenatal-care-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Prenatal Care</Card.Title>
               <Card.Text className='custom-card-text'>
               In an age when nature and magic rule the world, there is an extraordinary legend: the story of a warrior who...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>
            </div>
            </div>
      </Carousel.Item>

      <Carousel.Item interval={1000}>
            <div className='container mb-5'>
            <div className="row gy-4">
           
            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/service-11-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Medical Counseling</Card.Title>
               <Card.Text className='custom-card-text'>
               In an age when nature and magic rule the world, there is an extraordinary legend: the story of a warrior...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/Rehabilitation-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Rehabilitation Center</Card.Title>
               <Card.Text className='custom-card-text'>
               Extraordinary crimes against the people and the state had to be avenged by agent...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/Eldery-Care-1-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Eldery Care</Card.Title>
               <Card.Text className='custom-card-text'>
               What walks down stairs, alone or in pairs, and makes a slinkity sound? A spring, a spring, a marvelous thing...
               </Card.Text>
               </Card.Body>
            </Card>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100">
            <Card className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0'}}>
               <Card.Img variant="top" className="card-img" src="/images/service-5-280x215.jpg" />
               <Card.Body>
               <Card.Title className='col-12 text-truncate'>Competitive Doctors</Card.Title>
               <Card.Text className='custom-card-text'>
               In an age when nature and magic rule the world, there is an extraordinary legend: the sto...
               </Card.Text>
               </Card.Body>
            </Card>
            </div> 
 
            
            </div>
            </div>
      </Carousel.Item>
    </Carousel>
    </section>

    </>
    );
}

export default HomePageComponent;