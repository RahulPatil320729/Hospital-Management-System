import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorList from './DoctorList';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const DoctorPagination = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(4);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8085/doctor/getAllDoctorDetailsPaginated?page=${page}&size=${pageSize}`);
        setDoctors(response.data.content);
        setTotalPages(response.data.totalPages);
        setLoading(false);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500); // Duration matches the transition in CSS
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (

    <>
      <div className="page-title-wrapper">
          <div className="page-title">
            <div className="container">
              <h2>All Doctors</h2>
            </div>
          </div>
      </div>

      <section className='container pt-3'>
          <Breadcrumb>
            <Breadcrumb.Item href="http://localhost:3000/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Doctors</Breadcrumb.Item>
          </Breadcrumb>
      </section>

      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {/* Doctor List */}
            <div className={`doctor-list-container ${animate ? 'slide-enter' : 'slide-enter-active'}`}>
              <DoctorList doctors={doctors} filter="all" />
            </div>

            {/* Pagination Controls */}
            <Pagination className="justify-content-center mt-4">
              <Pagination.First onClick={() => handlePageChange(0)} disabled={page === 0} />
              <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index === page}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
              <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1} />
            </Pagination>
          </>
        )}
      </div>
    </>
  );
};

export default DoctorPagination;
