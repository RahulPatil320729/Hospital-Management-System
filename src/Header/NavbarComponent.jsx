import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch to dispatch actions
import { logout } from '../Redux/authSlice'; // Import the logout action from the auth slice

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch

  // Get the user from the Redux store
  const user = useSelector((state) => state.auth.user);
  const userRoles = user?.roles || []; // Get user roles

  // Handle the logout action
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the user from the store
    navigate('/home'); // Redirect to the home page after logging out
  };

  // Check if the user is a doctor
  const isDoctor = userRoles.includes("Doctor");

  // Check if the user is a patient
  const isPatient = userRoles.includes("User");

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary sticky-top">
        <Container>
          <Navbar.Brand className="navbar-brand" href="#home" id="logo">
            <div className='logo'>
              <a href='#'><img src='/images/logo.png' alt='logo'/></a>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink href="#home" className='nav-link' to="/home">HOME</NavLink>
              <NavDropdown onClick={() => navigate("/departments")} title="DEPARTMENTS" id="basic-nav-dropdown">
                <NavDropdown.Item href="/cardiology">CARDIOLOGY</NavDropdown.Item>
                <NavDropdown.Item href="/dental">DENTAL</NavDropdown.Item>
                <NavDropdown.Item href="/neurologist">NEUROLOGIST</NavDropdown.Item>
                <NavDropdown.Item href="/pediatric">PEDIATRIC</NavDropdown.Item>
                <NavDropdown.Item href="/urology">UROLOGY</NavDropdown.Item>
                <NavDropdown.Item href="/traumatology">TRAUMATOLOGY</NavDropdown.Item>
                <NavDropdown.Item href="/xray">XRAY</NavDropdown.Item>
              </NavDropdown>

              {!isDoctor && ( // Only show the "DOCTORS" link if the user is not a doctor
                // <NavLink href="#link" className='nav-link' to="/doctors">DOCTORS</NavLink>
                <NavDropdown onClick={()=> navigate("/doctors")} title="DOCTORS" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/DoctorPagination">ALL DOCTORS</NavDropdown.Item>
                </NavDropdown>
              )}

              <NavLink href="#link" className='nav-link' to="/services">SERVICES</NavLink>
              <NavLink href="#link" className='nav-link' to="/event">EVENTS</NavLink>
            </Nav>

            <Nav className="ms-auto">
              <i className="bi bi-person-circle" style={{ fontSize: '2rem' }}></i>
              <NavDropdown title={<span style={{ fontSize: '1rem'}}>Hi, {user?.name || 'Guest'}</span>} id="basic-nav-dropdown">
                
                {!user && ( 
                  <NavDropdown.Item href='/login'>LOGIN</NavDropdown.Item>
                )}
                
                {user && isPatient && ( 
                  <NavDropdown.Item href="/appointment">APPOINTMENT</NavDropdown.Item>
                )}

                {user && isDoctor && ( 
                  <>
                    <NavDropdown.Item href="/doctorappointment">DOCTOR APPOINTMENT</NavDropdown.Item>
                    <NavDropdown.Item href="/prescription">PRESCRIPTION</NavDropdown.Item>
                    <NavDropdown.Item href="/labtests">LAB TESTS</NavDropdown.Item>
                    <NavDropdown.Item href="/medicalhistory">MEDICAL HISTORY</NavDropdown.Item>
                    <NavDropdown.Item href="/invoice">INVOICE</NavDropdown.Item>
                    <NavDropdown.Item href="/patientalldetails">All DETAILS</NavDropdown.Item>
                  </>
                )}

                {user && ( // Show logout only if the user is logged in
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      LOGOUT <i className="bi bi-box-arrow-right"></i>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
