import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import {useNavigate } from "react-router-dom";


const DepartmentsComponent = () => {

    const navigate = useNavigate();

    return (
        <>
            <section>
                <div className="page-title-wrapper">
                    <div className="page-title">
                        <div className="container">
                            <h2>Departments</h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className='container pt-3 mb-4'>
                <Breadcrumb>
                    <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Departments</Breadcrumb.Item>
                </Breadcrumb>
            </section>

            <section>
                <div className='container mb-5'>
                    <div className="row gy-4">

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/cardiology")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_24648537_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Cardiology</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    Here's the story of a lovely lady, who was bringing up three very lovely girls. All of them had hair of gold, like their mother, the youngest one in curls. Here's the store, of a man named Brady, who was busy with three boys of his own.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100"  onClick={() => navigate("/dental")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_5711983_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Dental</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    We never thought of findin' a place where we belong. Don't have to stand alone, we'll never let you fall. Don't need permission to decide what you believe. You gotta learn something when we meet you after school. 
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/neurologist")} >
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_42539851_department.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Neurologist</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    You unlock this door with the key of imagination. Beyond it is another dimension: a dimension of sound, a dimension of sight, a dimension of mind. You're moving into a land of both shadow and substance, of things and ideas; 
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/pediatric")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_11882261_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Pediatric</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    One thousand years ago, superstition and the sword ruled. It was a time of darkness. It was a world of fear. It was the age of gargoyles. Stone by day, warriors by night, we were betrayed by the humans we had sworn to protect, frozen in stone by a magic spell for a thousand years.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/pulmonary")} >
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_10069934_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Pulmonary</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    Life is like a hurricane here in Duckburg. Race cars, lasers, aeroplanes - it's a duck blur. You might solve a mystery or rewrite history - Duck Tales, Oo-oo! Tales of derring-do, bad and good luck tales, oo-oo! D-d-d-danger, watch behind you - there's a stranger out to find you! What to do?
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/traumatology")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_11295039_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Traumatology</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                    Your tread must be light and sure, as though your path were upon rice paper. It is said, a Shaolin priest can walk through walls. Looked for, he can not be seen. Listened for, he can not be heard. Touched, can not be felt. 
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/urology")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_42548065_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Urology</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                        They're creepy and they're kooky, mysterious and spooky. They're all together ooky, the Addams...
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-12 aos-init aos-animate" data-aos="fade-up" data-aos-delay="100" onClick={() => navigate("/xray")}>
                            <Card className="custom-card" style={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '0' }}>
                                <Card.Img variant="top" className="custom-card-img" src="/images/Depositphotos_80150830_original-400x400.jpg" />
                                <Card.Body>
                                    <Card.Title className='col-12 text-truncate'>Xray</Card.Title>
                                    <Card.Text className='custom-card-text'>
                                        I bet we been together for a million years, And I bet we'll be together for a million more...
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}

export default DepartmentsComponent;
