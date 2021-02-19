import React from 'react';

const Footer = (props) => {
  return (
    <React.Fragment>
      <div className="flex-grow-1"></div>
      <footer className="footer">
        <p>Copyright &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </React.Fragment>
  );
}

export default Footer;