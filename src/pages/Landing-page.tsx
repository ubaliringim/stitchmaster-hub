// src/pages/landing-page.tsx
import React from 'react';

const LandingPage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img src="/path/to/company-logo.png" alt="Company Logo" style={{ width: '200px' }} />
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => window.location.href='/sign-up'}>Sign Up</button>
                <button onClick={() => window.location.href='/sign-in'} style={{ marginLeft: '10px' }}>Sign In</button>
            </div>
        </div>
    );
};

export default LandingPage;
