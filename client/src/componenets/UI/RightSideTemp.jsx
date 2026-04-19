import React from 'react';

export const RightSideTemp = () => {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center',
      gap: '1.5rem'
    }}>
      {/* Chat Icon */}
      <div className="w-20 h-20 rounded-xl text-6xl bg-purple-600 flex items-center justify-center text-white font-medium  mb-3">
            Z
          </div>

      {/* Main Heading */}
      <div>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 600,
          margin: '0 0 0.5rem 0',
          color: '#1f2937',
          letterSpacing: '-0.5px'
        }}>
          Welcome to <span style={{ color: '#a855f7' }}>Zynk</span>
        </h1>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '1rem',
        color: '#6b7280',
        margin: 0,
        maxWidth: '300px',
        lineHeight: 1.6
      }}>
        Select a conversation from the sidebar to start messaging
      </p>

      {/* Subtle decorative line */}
      <div style={{
        width: '60px',
        height: '3px',
        background: '#a855f7',
        borderRadius: '2px',
        marginTop: '0.5rem'
      }}></div>
    </div>
  );
};
