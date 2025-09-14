import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-message">{message}</p>
      </div>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          padding: 2rem;
        }

        .loading-content {
          text-align: center;
          animation: fadeIn 0.5s ease-out;
        }

        .spinner {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto 1.5rem;
        }

        .spinner-ring {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }

        .spinner-ring:nth-child(1) {
          border-top-color: #8b45ff;
          animation-delay: 0s;
        }

        .spinner-ring:nth-child(2) {
          border-right-color: #c77dff;
          animation-delay: -0.5s;
          animation-direction: reverse;
        }

        .spinner-ring:nth-child(3) {
          border-bottom-color: #8b45ff;
          animation-delay: -1s;
        }

        .loading-message {
          font-size: 1.125rem;
          font-weight: 500;
          color: #c77dff;
          margin: 0;
          letter-spacing: 0.5px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .spinner-ring {
            animation: none;
            border: 3px solid #8b45ff;
          }
          
          .loading-content {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
