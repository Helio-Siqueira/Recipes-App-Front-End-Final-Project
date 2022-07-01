import React from 'react';
import Logo from '../images/logomarca-01.svg';

function LogoMarca() {
  return (
    <div>
      <img src={ Logo } alt="Taste e Travel" className="logo__animation" />
    </div>
  );
}

export default LogoMarca;
