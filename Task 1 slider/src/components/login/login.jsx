import React, { useState, useEffect } from 'react';
import './login.css';
import Home from '../Home/Home';

function App() {
  const [formClass, setFormClass] = useState('');
  const [eyeBallSize, setEyeBallSize] = useState({ width: 0, height: 0 });
  const [wrongEntry, setWrongEntry] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleFocusIn = () => setFormClass('up');
  const handleFocusOut = () => setFormClass('');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const dw = document.body.clientWidth / 15;
      const dh = document.body.clientHeight / 15;
      const x = event.pageX / dw;
      const y = event.pageY / dh;
      setEyeBallSize({ width: x, height: y });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleButtonClick = () => {
    setWrongEntry(true);
    setTimeout(() => {
      setWrongEntry(false);
    }, 3000);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  if (!formVisible) {
    return <Home />; // Show the Home component if the form is not visible
  }

  return (
    <div>
      <div className="panda">
        <div className="face">
          <div className="ear"></div>
          <div className="ear"></div>
          <div className="eye-shade"></div>
          <div className="eye-shade rgt"></div>
          <div className="eye-white">
            <div className="eye-ball" style={eyeBallSize}></div>
          </div>
          <div className="eye-white rgt">
            <div className="eye-ball" style={eyeBallSize}></div>
          </div>
          <div className="nose"></div>
        </div>
        <div className="body"></div>
        <div className="hand"></div>
        <div className="hand rgt"></div>
        <div className="foot">
          <div className="finger"></div>
        </div>
        <div className="foot rgt">
          <div className="finger"></div>
        </div>
      </div>

      <form className={`${formClass} ${wrongEntry ? 'wrong-entry' : ''}`}>
        <button type="button" className="close-btn" onClick={handleCloseForm}>X</button>
        <h1>Welcome</h1>
        <div className="form-group">
          <input 
            type="text" 
            className="form-control" 
            required 
          />
          <label className="form-label">Username</label>
        </div>
        <div className="form-group">
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            required 
            onFocus={handleFocusIn}
            onBlur={handleFocusOut}
          />
          <label className="form-label">Password</label>
        </div>
        <button type="button" className="btn" onClick={handleButtonClick}>Login</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" className="btn" onClick={handleButtonClick}>Signup</button>
        <div className="alert">Invalid Credentials</div>
      </form>
    </div>
  );
}

export default App;
