import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        margin:' auto',
        backgroundColor: '#fff', // Custom background color
      }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="primary"
        style={{
          height: '4rem',
          width: '4rem',
          // Add more custom styles for the spinner if needed
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;

