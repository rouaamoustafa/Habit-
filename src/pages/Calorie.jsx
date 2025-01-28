import React, { useState, useRef, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import "../style/calorie.css";
import scan from '../assets/scan.png';
import CoolCalendar from "../components/cool_calendar";

 const Calorie = ({direction ,translations}) =>{ 
  const t = translations[direction];
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const [caloriesForCalendar, setCaloriesForCalendar] = useState(null);

  useEffect(() => {
    // Fetch available cameras
    codeReader.current
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDevice(videoInputDevices[0].deviceId); // Default to the first camera
        }
      })
      .catch((err) => console.error("Error getting devices: ", err));
  }, []);

  useEffect(() => {
    if (scanning) {
      startScanning();
    } else {
      stopScanning();
    }
    return () => stopScanning();
  }, [scanning, selectedDevice]);

  const startScanning = () => {
    if (selectedDevice && videoRef.current) {
      // Stop any ongoing scanning before starting a new one
      stopScanning();

      codeReader.current.decodeFromVideoDevice(
        selectedDevice,
        videoRef.current,
        async (result, err) => {
          if (result) {
            const barcode = result.getText();
            console.log("Barcode Detected:", barcode); 
            setScanning(false); 
            await fetchProductData(barcode); 
          }
          if (err && err.name === "NotFoundException") {
            console.warn("No barcode detected");
          }
        }
      );
    } else {
      console.error("No camera selected or video element missing");
    }
  };

  const stopScanning = () => {
    codeReader.current.reset();
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const fetchProductData = async (barcode) => {
    try {
      console.log("Barcode Detected:", barcode);
  
      // Use Open Food Facts API
      const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
      console.log("Fetching from URL:", apiUrl);
  
      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data);
  
      // Extract product details
      const product = response.data.product;
  
      if (product) {
        const name = product.product_name || "Unknown Product";
        const calories = product.nutriments?.['energy-kcal_100g'] || 0; // Default calories to 0 if not available
  
        // Add to table data
        setTableData((prevData) => [...prevData, { barcode, name, calories }]);
      } else {
        console.error("Product not found in Open Food Facts");
        setError("Product not found in the Open Food Facts database.");
      }
    } catch (err) {
      console.error("Error fetching product data:", err.message);
      setError("Failed to fetch product data. Check the API endpoint or network connection.");
    }
  };

  // Calculate total calories
  const calculateTotalCalories = () => {
    return tableData.reduce((total, item) => total + item.calories, 0);
  };

  const handleStart = () => {
    setError(null);
    setScanning(true);
  };
  const handleAddToCalendar = () => {
    const totalCalories = calculateTotalCalories();
    setCaloriesForCalendar(totalCalories); 
    console.log("pass to calendar");
    console.log(totalCalories);
  };
  return (
    <div className="calorie-container">
      <img className="scan-image" src={scan}/>
      {/* Camera Selection */}
      {devices.length > 1 && (
        <div className="camera-selector">
          <label htmlFor="camera">Select Camera:</label>
          <select
            id="camera"
            onChange={(e) => setSelectedDevice(e.target.value)}
            value={selectedDevice || ""}
          >
            {devices.map((device, index) => (
              <option key={index} value={device.deviceId}>
                {device.label || `Camera ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="div-btn-start-stop">
      <button onClick={handleStart}  className="start-button">
      {t.startScanning}
      </button>

      {scanning && (
        <div className="video-display-container">
          <video
            ref={videoRef}
            width="300"
            height="200"
            style={{ border: "1px solid black" }}
          />
        </div>
      )}

      <button onClick={stopScanning} className="stop-scanning-button">
      {t.stopScanning}
      </button>
      </div>

      {/* Display Error */}
      {error && <p className="error-message">{error}</p>}

      {/* Scanned Products Table */}
      <h2>{t.scannedProduct}</h2>
      {tableData.length > 0 ? (
        <table className="product-table">
          <thead>
            <tr>
              <th>{t.barcode}</th>
              <th>{t.product_name}</th>
              <th>{t.calories}</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.barcode}</td>
                <td>{item.name}</td>
                <td>{item.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{t.Noproductsscannedyet}</p>
      )}

      {/* Display Total Calories */}
      {tableData.length > 0 && (
        <h3>Total Calories: {calculateTotalCalories()}</h3>
        
      )}
      {/* Add to Calendar Button */}
      <div><button onClick={handleAddToCalendar} className="add-to-calendar-button">
        {t.AddtoCalendar}
      </button></div>
      <CoolCalendar totalCalories={calculateTotalCalories()} />
    </div>
    
  );
};


export default Calorie;