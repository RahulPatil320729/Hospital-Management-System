// import React from 'react';
// import { Breadcrumb, Card, Row, Col } from 'react-bootstrap';
// import DepartmentCarouselComponent from './DepartmentCarouselComponent';

// const DepartmentDetailComponent = () => {
//     const department = {
//         name: 'Cardiology',
//         image: '/images/Depositphotos_24648537_original-400x400.jpg',
//         description: `Here's the story of a lovely lady, who was bringing up three very lovely girls...`,
//         email: 'cardiologi@hospitalplus.com',
//         phone1: '+1 600 200 111',
//         phone2: '+1 600 200 112',
//         otherDepartments: [
//             {
//                 name: 'Urology',
//                 image: '/images/Depositphotos_42548065_original-400x400.jpg',
//                 description: `They're creepy and they're kooky...`,
//             },
//             {
//                 name: 'Dental',
//                 image: '/images/Depositphotos_5711983_original-400x400.jpg',
//                 description: `We never thought of finding a place where we belong...`,
//             },
//             {
//                 name: 'Neurologist',
//                 image: '/images/Depositphotos_42539851_department.jpg',
//                 description: `You unlock this door with the key of imagination...`,
//             },
//             // Add more departments here
//         ],
//     };

//     return (
//         <>
//             <section>
//                 <div className="page-title-wrapper">
//                     <div className="page-title">
//                         <div className="container">
//                             <h2>{department.name}</h2>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className='container pt-3'>
//                 <Breadcrumb>
//                     <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
//                     <Breadcrumb.Item href="http://localhost:3000/departments">Departments</Breadcrumb.Item>
//                     <Breadcrumb.Item active>{department.name}</Breadcrumb.Item>
//                 </Breadcrumb>
//             </section>

//             <section>
//                 <div className='container mb-5'>
//                     <Row>
//                         <Col lg={8} md={12} sm={12}>
//                             <img src={department.image} alt={department.name} className="img-fluid mb-4" />
//                             <h3>{department.name}</h3>
//                             <p>{department.description}</p>
//                             <div className="contact-details">
//                                 <h5>Contact Detail</h5>
//                                 <p>Email: {department.email}</p>
//                                 <p>Phone: {department.phone1}</p>
//                                 <p>Phone: {department.phone2}</p>
//                             </div>
//                         </Col>
//                         <Col lg={4} md={12} sm={12}>
//                             <h4>Other Departments</h4>
//                             <DepartmentCarouselComponent departments={department.otherDepartments} />
//                         </Col>
//                     </Row>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default DepartmentDetailComponent;
