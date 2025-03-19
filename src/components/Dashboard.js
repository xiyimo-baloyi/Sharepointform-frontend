//import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./styles.css";
import Logo from "./Logo.svg";
import React from 'react';
import ReactDOM from 'react-dom/client';

import { useState, useEffect, useRef } from "react";


const IncidentDashboard = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [ServiceType, setServiceType] = useState("");
  const [department, setDepartment] = useState("");
  const [ServiceGroup, setServiceGroup] = useState("");
  const [Service, setService] = useState("");
  const [Address, setAddress] = useState("");
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [caseDescription, setCaseDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileLink, setFileLink] = useState("");
  const [caseKey, setCaseKey] = useState("");
  const [enteredCaseKey, setEnteredCaseKey] = useState("");
  const [selectedLoggerType, setSelectedLoggerType] = useState(null); // New logger or Has logged previously
  const [LoggerIDPassport, setLoggerIDPassport] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [notificationPreference, setNotificationPreference] = useState("");
  const [LoggerRelationship, setRelationship] = useState("");
  const [status0, setCaseStatus] = useState("");
  const mapRef = useRef(null);



  const azureMapsKey = "5mgwLak7qRCR3RlZV7JcFWSbOmctUnnmc53Duzh9JeMX3HCcFfb2JQQJ99BAACYeBjFc3HfPAAAgAZMP2Rwc";

  // Conditional Dropdowns Data
  const departments = {
    "Service delivery": [
      "Community Service",
      "Corporate and Financial Services",
      "Emergency and Disaster Management",
      "Human Settlements",
      "Local Economic Development and Planning",
      "Technical Service",
    ],
    "Internal administration": [
      "Information Technology",
      "Facilities",
    ],
  };
  
  const ServiceGroups = {
    "Community Service": [
      "Protection Service",
      "Fire Service",
      "Social and Welfare Development Services",
    ],
    "Corporate and Financial Services": [
      "Traffic Services",
      "Administrative and Financial Support",
      "ICT Information Management",
      "Integrated Development Plan",
      "Award Management",
      "Business Relationships",
      "Budget, Insurance, Revenue and Expenditure",
      "Planning and Projection",
      "Internal Audit",
      "Marketing and Communication",
      "Tourism",
      "Asset Management",
      "Industry Development",
      "Client Liaison",
    ],
    "Emergency and Disaster Management": [
      "Town and Regional Planning",
      "Primary Healthcare",
      "Social and Welfare Development Services",
      "Daycare Facilities",
      "Aged Care",
      "Youth Development",
      "Disaster Support and Alleviation",
      "Overnight Shelter",
      "Animal Control",
      "Law Enforcement",
      "Municipal Facilities",
      "Parks and Recreation",
      "Community Halls",
      "Library Services",
      "Cemeteries",
      "Sports Fields and Swimming Pools",
      "Resorts",
      "Local Economic Development",
      "Non-profit Organisations",
      "Socio-Economic Development",
      "Environmental Management",
      "Local Development",
      "Museums",
      "Public Transport",
      "Nuisance",
    ],
    "Human Settlements": [
      "Housing Management",
      "Needs Analysis, Community Liaison, Placement and Allocation, Project Management, Rental and Subsidy Administration",
      "Illegal Structures, Eviction and Influx Control",
    ],
    "Local Economic Development and Planning": [
      "Town and Regional Planning",
      "Land Reform",
      "Local Economic Development",
      "Local Development",
      "Building Control",
    ],
    "Technical Service": [
      "Town and Regional Planning",
      "Land Reform",
      "Hygiene Service",
      "Solid Waste and Cleansing",
      "Expanded Public Works and Infrastructure",
      "Electricity",
      "Mechanical Services",
      "Civil Services",
      "Streets and Stormwater",
      "Infrastructure Project Management",
      "Road",
      "Building Control",
      "Water",
    ],
    "Information Technology": [
      "User Related",
      "Personal Computer",
      "Printer",
      "Network",
    ],
    "Facilities": [
      "Building",
      "Access Control",
    ],
  };

  const Services = {
    "Protection Service": ["Protection Service"],
    "Fire Service": ["Fire Service"],
    "Social and Welfare Development Services": ["Indigent Application - New", "Indigent Application -Renewal"],
    // Add more services as needed
    "Traffic Services":["New"],
      "Administrative and Financial Support":["New"],
      "ICT Information Management":["New"],
      "Integrated Development Plan":["New"],
      "Award Management":["New"],
      "Business Relationships":["New"],
      "Budget, Insurance, Revenue and Expenditure":["New"],
      "Planning and Projection":["New"],
      "Internal Audit":["New"],
      "Marketing and Communication":["New"],
      "Tourism":["New"],
      "Asset Management":["New"],
      "Industry Development":["New"],
      "Client Liaison":["New"],
      "Town and Regional Planning":["New"],
      "Primary Healthcare":["New"],
      "Daycare Facilities":["New"],
      "Aged Care":["New"],
      "Youth Development":["New"],
      "Disaster Support and Alleviation":["New"],
      "Overnight Shelter":["New"],
      "Animal Control":["New"],
      "Law Enforcement":["New"],
      "Municipal Facilities":["New"],
      "Parks and Recreation":["New"],
      "Community Halls":["New"],
      "Library Services":["New"],
      "Cemeteries":["New"],
      "Sports Fields and Swimming Pools":["New"],
      "Resorts":["New"],
      "Local Economic Development":["New"],
      "Non-profit Organisations":["New"],
      "Socio-Economic Development":["New"],
      "Environmental Management":["New"],
      "Local Development":["New"],
      "Museums":["New"],
      "Public Transport":["New"],
      "Nuisance":["New"],
      "Housing Management":["New"],
      "Needs Analysis, Community Liaison, Placement and Allocation, Project Management, Rental and Subsidy Administration":["New"],
      "Illegal Structures, Eviction and Influx Control":["New"],
      "Building Control":["New"],
      "Hygiene Service":["New"],
      "Solid Waste and Cleansing":["New"],
      "Expanded Public Works and Infrastructure":["New"],
      "Electricity":["New"],
      "Mechanical Services":["New"],
      "Civil Services":["New"],
      "Streets and Stormwater":["New"],
      "Infrastructure Project Management":["New"],
      "Road":["New"],
      "Water":["New"],
      "User Related":["New"],
      "Personal Computer":["New"],
      "Printer":["New"],
      "Network":["New"],
      "Building":["New"],
      "Access Control":["New"],
  };



 


  useEffect(() => {
    if (Latitude && Longitude && !mapRef.current) {
      const script = document.createElement("script");
      script.src = `https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js`;
      script.onload = () => {
        console.log("Azure Maps script loaded successfully!");
  
        // Initialize the map
        mapRef.current = new window.atlas.Map("azureMap", {
          center: [Longitude, Latitude],
          zoom: 15,
          authOptions: {
            authType: "subscriptionKey",
            subscriptionKey: azureMapsKey,
          },
        });
  
        console.log("Map initialized:", mapRef.current);
  
        // Add a marker when the map is ready
        mapRef.current.events.add("ready", () => {
          console.log("Map is ready!");
          const marker = new window.atlas.HtmlMarker({
            position: [Longitude, Latitude],
            text: "📍",
          });
          mapRef.current.markers.add(marker);
        });
      };
      script.onerror = () => {
        console.error("Failed to load Azure Maps script.");
      };
      document.body.appendChild(script);
  
      // Cleanup function
      return () => {
        if (mapRef.current) {
          mapRef.current.dispose(); // Clean up the map instance
          mapRef.current = null;
        }
        document.body.removeChild(script);
      };
    }
  }, [Latitude, Longitude, azureMapsKey]);



  // Get User's Current Location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);

        const response = await axios.get(
          `https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&subscription-key=${azureMapsKey}&query=${lat},${lon}`
        );

        if (response.data?.addresses?.length > 0) {
          setAddress(response.data.addresses[0].address.freeformAddress);
        }
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Search Location by Address
  const handleAddressSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=${azureMapsKey}&query=${Address}`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].position;
        setLatitude(location.lat);
        setLongitude(location.lon);

        if (mapRef.current) {
          mapRef.current.setCamera({
            center: [location.lon, location.lat],
            zoom: 15,
          });

          mapRef.current.markers.clear();
          new window.atlas.HtmlMarker({
            position: [location.lon, location.lat],
            text: "📍",
          }).setMap(mapRef.current);
        }
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      console.error("Error searching address:", error);
      alert("Failed to search address.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle File Upload
  // Fetch Previous Case Data
  const fetchPreviousCase = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getPreviousCase?caseKey=${enteredCaseKey}`);
      if (response.data) {
        setCaseDescription(response.data.caseDescription);
        setFileLink(response.data.fileLink);
        setCaseStatus(response.data.status0);
        setName(response.data.name);
        setEmail(response.data.Email);
        setPhone(response.data.phone);
      }
    } catch (error) {
      console.error("Error fetching previous case:", error);
      alert("Failed to fetch previous case.");
    }
  };

  // Handle File Upload and Submit Incident
  const submitIncident = async () => {
    if (!ServiceType || !department || !ServiceGroup || !Service || !Address || !caseDescription || !name || !Email || !phone) {
      alert("Please fill all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      let uploadedFileLink = "";

      // Upload file if it exists
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axios.post("http://localhost:5000/api/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.data.fileLink) {
          uploadedFileLink = uploadResponse.data.fileLink;
          setFileLink(uploadedFileLink);
        }
      }

      // Submit incident data
      const caseKey = generateUniqueCaseKey(); // Generate a unique case key

      const data = {
        caseKey,
        ServiceType,
        department,
        ServiceGroup,
        Service,
        Address,
        Latitude,
        Longitude,
        caseDescription,
        fileLink: uploadedFileLink,
        LoggerIDPassport,
        name,
        surname,
        Email,
        phone,
        LoggerRelationship,
        notificationPreference,
      };

      const response = await axios.post("http://localhost:5000/api/submitIncident1", data);

      if (response.data.caseKey) {
        setCaseKey(response.data.caseKey);
        alert(`Incident submitted successfully! Your Case Key is: ${response.data.caseKey}`);
      } else {
        alert(`Incident submitted successfully, Your Case Key is: ${caseKey}`);
      }
    } catch (error) {
      console.error("Error submitting incident:", error);
      alert("Failed to submit incident.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Unique Case Key
  const generateUniqueCaseKey = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase(); // Simple unique key generator
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating login state


 

  // Logout Function
  const handleLogout = () => {
    // Clear user session data (e.g., token)
    localStorage.removeItem("token"); // Example: Remove token from localStorage
    alert("You have been logged out.");

    // Redirect to the login page
    navigate("/");
  };
 

  return (
    <div>
      <div className="bg-gray-900 text-white py-4 px-6 flex items-center justify-center fixed top-0 left-0 w-full z-50">
        <img src={Logo} alt="Logo" className="logo" />
        <h1 className="Title-01 text-xl font-semibold">Incident Management System</h1>
        <button
          onClick={handleLogout}
          className="w-full1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300"
        >
          Logout
        </button>
      </div>
      <div style={{ padding: "40px", marginTop: "80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gap: "20px" }}>
          {/* Left Section */}
          <div>
            <h3>Report an Incident</h3>

            {/* Logger Type Section */}
            {!selectedLoggerType && (
              <>
                <h3>Logger Type</h3>
                <button
                  onClick={() => setSelectedLoggerType("new")}
                  className="btn btn-primary w-100"
                >
                  New Logger
                </button>
                <button
                  onClick={() => setSelectedLoggerType("previous")}
                  className="btn btn-primary w-100 mt-2"
                >
                  Has Logged Previously
                </button>
              </>
            )}

            {/* New Logger Form */}
            {selectedLoggerType === "new" && (
              <>
                <label>Service Type</label>
                <select
                  value={ServiceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Service Type</option>
                  {Object.keys(departments).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>

                {ServiceType && (
                  <>
                    <label>Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Department</option>
                      {departments[ServiceType].map((dep) => (
                        <option key={dep} value={dep}>
                          {dep}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {department && (
                  <>
                    <label>Service Group</label>
                    <select
                      value={ServiceGroup}
                      onChange={(e) => setServiceGroup(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Service Group</option>
                      {ServiceGroups[department]?.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                {ServiceGroup && (
                  <>
                    <label>Service</label>
                    <select
                      value={Service}
                      onChange={(e) => setService(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Service</option>
                      {Services[ServiceGroup]?.map((serv) => (
                        <option key={serv} value={serv}>
                          {serv}
                        </option>
                      ))}
                    </select>
                  </>
                )}

                <h3>Personal Information</h3>
                <div>
                <input
                  type="text"
                  placeholder="ID/Passport"
                  name="idNumber"
                  value={LoggerIDPassport}
                  onChange={(e) => setLoggerIDPassport(e.target.value)}
                  className="form-control"
                  maxLength="13"
                />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="form-control"
                />
                </div>
                <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                </div>
                <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                  minLength="10"
                  maxLength="10"
                />
                </div>

                <h3>Notification Preference</h3>
                <select
                  value={notificationPreference}
                  onChange={(e) => setNotificationPreference(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Preference</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>

                <h3>Relationship</h3>
                <select
                  value={LoggerRelationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select Relationship</option>
                  <option value="Account Holder">Account Holder</option>
                  <option value="Account Holder Relative">Account Holder Relative</option>
                  <option value="Account Holder Staff">Account Holder Staff</option>
                  <option value="Civic">Civic</option>
                  <option value="Neighbour">Neighbour</option>
                </select>

                <h3>Location Information</h3>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control"
                />
                <button onClick={handleAddressSearch} disabled={isLoading} className="btn btn-primary">
                  {isLoading ? "Searching..." : "Search Location"}
                </button>
                <button onClick={getCurrentLocation} className="btn btn-primary mt-2">
                  Get My Location
                </button>

                <h3>Case Description</h3>
                <textarea
                  value={caseDescription}
                  onChange={(e) => setCaseDescription(e.target.value)}
                  className="form-control"
                />

                <h3>File Attachments</h3>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="form-control"
                />

                <button onClick={submitIncident} disabled={isLoading} className="btn btn-primary mt-2">
                  {isLoading ? "Submitting..." : "Submit"}
                </button>
                {caseKey && <p>Your Case Key: {caseKey}</p>}
              </>
            )}

            {/* Has Logged Previously Section */}
            {selectedLoggerType === "previous" && (
              <>
                <h3>Enter Case Key</h3>
                <input
                  type="text"
                  placeholder="Enter Case Key"
                  value={enteredCaseKey}
                  onChange={(e) => setEnteredCaseKey(e.target.value)}
                  className="form-control"
                />
                <button onClick={fetchPreviousCase} className="btn btn-primary">
                  Fetch Previous Case
                </button>

                {caseDescription && (
                  <>
                    <h3>Case Description</h3>
                    <p>{caseDescription}</p>

                    <h3>Case Status</h3>
                    <p>{status0}</p>

                    <h3>Filer Information</h3>
                    <p>Name: {name}</p>
                    <p>Email: {Email}</p>
                    <p>Phone: {phone}</p>

                    <h3>Attachment</h3>
                    {fileLink ? (
                      <a href={fileLink} target="_blank" rel="noopener noreferrer">
                        View Attachment
                      </a>
                    ) : (
                      <p>No attachment found for this case.</p>
                    )}
                  </>
                )}
              </>
            )}
          </div>

          {/* Right Section */}
          <div>
            {selectedLoggerType === "new" && (
              <>
                <h3>Live Map</h3>
                <div className="map-container">
                    <div id="azureMap" style={{ width: "100%", height: "500px" }}></div>
                  <div className="map-info-box">
                    <p>{Address}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDashboard;