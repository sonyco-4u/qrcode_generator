import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [url, setUrl] = useState("");
  const [logo, setLogo] = useState(null); // State to store the uploaded logo

  // Handle image upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Set the base64 string of the image
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("qr-gen");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `evoteck-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Follow the Instructions Below</h2>

      <div style={styles.controls}>
        <label style={styles.label}>1. Enter URL</label>
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>2. Upload Company Logo (Optional)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleLogoUpload} 
          style={styles.fileInput}
        />
      </div>

      {url && (
        <div style={styles.qrContainer}>
          <QRCodeCanvas
            id="qr-gen"
            value={url}
            size={280}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H" // "H" is required for logos to ensure it stays scannable
            includeMargin={true}
            imageSettings={
              logo
                ? {
                    src: logo,
                    x: undefined, // center
                    y: undefined, // center
                    height: 50,
                    width: 50,
                    excavate: true, // This cuts out the QR pixels behind the logo
                  }
                : null
            }
          />
          <div style={{ marginTop: "20px" }}>
            <button onClick={downloadQRCode} style={styles.button}>
              Download Branded QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "10px",
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  fileInput: {
    fontSize: "14px",
  },
  qrContainer: {
    marginTop: "20px",
    textAlign: "center",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9"
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#2f4c9c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold"
  }
};

export default QRCodeGenerator;