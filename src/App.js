import React from "react";
import QRCodeGenerator from "./QRCodeGenerator";
import logo from "./evoteck-logo.png";
import "./App.css";

function App() {
  return (
    <div className="app-container">

      {/* Company Logo */}
      <img src={logo} alt="Evoteck Logo" className="company-logo" />

      {/* Title */}
      <h1>Evoteck QR Code Generator</h1>

      {/* QR Code Generator Component */}
      <QRCodeGenerator />

      {/* Footer */}
      <p className="footer-text">Powered by Evoteck</p>

    </div>
  );
}

export default App;