import React, { useState, useEffect } from 'react';
import Logo from '../images/logomarca-01.svg';

function LogoMarca() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const number = 2000;
    const timer = setTimeout(setVisible(false), number);
    timer();
  }, []);

  useEffect(() => {
    clearTimeout(timer);
  }, [visible]);
  return (
    <div>
      {
        visible && <img src={ Logo } alt="Taste e Travel" />
      }
    </div>
  );
}

export default LogoMarca;
