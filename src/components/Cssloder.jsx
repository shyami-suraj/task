import React from 'react';
import loadCSS from 'load-css-file';

const Cssloder = () => {
  React.useEffect(() => {
    loadCSS('https://www.w3schools.com/w3css/4/w3.css');
  }, []);

  return null;
};

export default Cssloder;