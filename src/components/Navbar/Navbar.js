import React, { useState } from 'react';
import UserGuide from '../UserGuide/UserGuide';
import'./Navbar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';

function Navbar(props) {
  const [modalShowGuide, setModalShowGuide] = useState(false);
    
  return (
    <>
    <div id="container">
      <div >
        <img src="FieldBoss_logo.png" alt="logo" style={{position: "absolute", top: "7px", width: "35px", left: "12px"}}/>
        <p><span style={{position: "absolute", fontSize: 30, fontFamily: "serif", top: "1px", color: "blue", left: "56px"}}>MetaScapes</span></p>
        <p><span style={{position: "absolute", fontSize: 18, fontFamily: "serif", top: "15px", color: "blue", left: "225px"}}>Composite NFTs as 3d Pods in the Metaverse</span></p>
        <div>
          {['bottom'].map((placement) => (
            <Button id="userGuide" variant="light" onClick={() => setModalShowGuide(true)}>User Guide</Button>
          ))}
        </div>
      </div>
    </div>
    <UserGuide show={modalShowGuide} onHide={() => setModalShowGuide(false)}/>
    </>
  );
}

export default Navbar;