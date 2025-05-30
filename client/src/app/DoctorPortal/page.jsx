"use client";
import React, { useState } from "react";
import axios from "axios"; 

// Sidebar component with Tailwind CSS classes
const Sidebar = ({ currentSection, setCurrentSection }) => {
  const sections = [
    { key: "profile", label: "Profile" },
    { key: "pending", label: "Pending Requests" },
    { key: "messages", label: "Messages" },
    { key: "patients", label: "Patient Data" },
  ];
  return (
    <div className="w-72 bg-[#A0C878] text-white flex flex-col p-5">
      <h2 className="font-semibold mb-5 tracking-wide text-xl">Doctor&#39;s Dashboard</h2>
      <nav>
        {sections.map(({ key, label }) => (
          <a
            key={key}
            href="#!"
            onClick={() => setCurrentSection(key)}
            className={
              "block px-4 py-3 mb-2 rounded-lg font-semibold cursor-pointer select-none " +
              (currentSection === key
                ? "bg-[#3D8D7A]"
                : "hover:bg-[#2e544b] transition-colors duration-200")
            }
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
};

// Profile component

 // Make sure to install axios if you haven't already



const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    clinic: "City Health Medical Center",
    about: "Experienced cardiologist with a deep passion for preventative care and personalized treatment plans.",
    contact: "+1 (555) 123-4567",
    specialist: "Cardiologist",
    qualification: "MBBS, MD (Cardiology)",
    experience: "15 years",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-url.com/edit', formData);
      console.log("Edit successful:", response.data);
      setIsEditing(false); // Close the edit form after submission
    } catch (error) {
      console.error("Error sending edit request:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="min-w-2xl bg-white p-10 rounded-xl shadow-md flex flex-col items-center relative -mt-16">
        <div
          className="w-48 h-48 rounded-full shadow-md bg-center bg-cover mb-6"
          style={{
            backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')",
            boxShadow: "0 4px 10px rgba(30, 136, 229, 0.3)",
          }}
        />
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-2">Dr. John Smith</h2>
          <p className="text-gray-600 mb-1">Username: dr.johnsmith</p>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              <label className="w-full text-left mb-1">
                Clinic:
                <input
                  type="text"
                  name="clinic"
                  value={formData.clinic}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter clinic name"
                />
              </label>
              <label className="w-full text-left mb-1">
                About:
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </label>
              <label className="w-full text-left mb-1 ">
                Contact:
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter contact number"
                />
              </label>
              <label className="w-full text-left mb-1">
                Specialist:
                <input
                  type="text"
                  name="specialist"
                  value={formData.specialist}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter specialist field"
                />
              </label>
              <label className="w-full text-left mb-1">
                Qualification:
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter qualifications"
                />
              </label>
              <label className="w-full text-left mb-1">
                Experience:
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Enter years of experience"
                />
              </label>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </form>
          ) : (
            <>
              <p className="text-gray-600 mb-1">Clinic: {formData.clinic}</p>
             
              <p className="text-gray-600 mb-1">Contact: {formData.contact}</p>
              <p className="text-gray-600 mb-1">Specialist: {formData.specialist}</p>
              <p className="text-gray-600 mb-1">Qualification: {formData.qualification}</p>
              <p className="text-gray-600 mb-4">Experience: {formData.experience}</p>
               <p className="text-gray-600 mb-1"> <strong>About:</strong> {formData.about}</p>
              <button onClick={handleEditToggle} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Edit
              </button>
            </>
          )}
        </div>
        <div className="text-gray-700 space-y-2 mt-4">
          
        </div>
      </div>
    </section>
  );
};















// Pending Requests component
const PendingRequests = () => {
  const initialRequests = [
    { id: 1, patient: "Alice Johnson", time: "2024-06-04 10:30 AM" },
    { id: 2, patient: "Bob Lee", time: "2024-06-04 11:00 AM" },
    { id: 3, patient: "Carol Martinez", time: "2024-06-04 11:30 AM" },
  ];
  const [requests, setRequests] = useState(initialRequests);

  const handleAction = (id, action) => {
    const patient = requests.find((r) => r.id === id)?.patient || "";
    alert(`${action} request for: ${patient}`);
    setRequests((reqs) => reqs.filter((r) => r.id !== id));
  };

  return (
    <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6">Pending Requests</h2>
      <ul>
        {requests.length ? (
          requests.map(({ id, patient, time }) => (
            <li
              key={id}
              className="flex justify-between border-b border-gray-200 py-3 text-base"
            >
              <span>
                {patient}
                <br />
                <span className="text-gray-500 italic text-sm">{time}</span>
              </span>
              <span>
                <button
                  onClick={() => handleAction(id, "Approved")}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg mr-2 transition-colors duration-200"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Reject
                </button>
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500 py-4">No pending requests.</li>
        )}
      </ul>
    </section>
  );
};

//Messages




const Messages = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "patient",
      text: "Hello, doctor! I have a question about my medication.",
    },
    { sender: "doctor", text: "Hi Alice, sure, please tell me more." },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null); // State to hold the selected file

  const sendMessage = () => {
    if (input.trim() === "" && !file) return; // Prevent sending empty messages

    const newMessage = { sender: "patient", text: input };

    // If a file is selected, include it in the message
    if (file) {
      newMessage.file = file;
      // Reset the file after sending
      setFile(null);
    }

    setChatMessages((msgs) => [...msgs, newMessage]);
    setInput("");

    // Simulate a response from the doctor
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "doctor", text: "Glad to hear that! Let me know if you have questions." },
      ]);
    }, 1200);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file in state
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-md flex flex-col h-[85%]">
        <h2 className="text-2xl font-semibold mb-6">Messages</h2>
        <div className="flex-grow overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-100 mb-4">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[70%] mb-3 px-4 py-2 rounded-xl leading-relaxed text-sm clear-both ${
                msg.sender === "patient"
                  ? "bg-green-600 text-white float-right rounded-br-none"
                  : "bg-green-900 text-white float-left rounded-bl-none"
              }`}
            >
              {msg.text}
              {msg.file && (
                <div className="mt-2">
                  <a
                    href={URL.createObjectURL(msg.file)} // Create a URL for the file
                    download={msg.file.name} // Set the file name for download
                    className="text-blue-400 underline"
                  >
                    {msg.file.name}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative">
            <input
              type="file"
              id="fileUpload"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange} // Handle file selection
            />
            <label htmlFor="fileUpload" className="w-full h-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-500 hover:text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>
          </div>
          <textarea
            rows="3"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-3 rounded-lg border border-gray-300 resize-none font-sans text-base h-13 w-full"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() && !file} // Disable if both input and file are empty
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
              input.trim() || file
                ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};









// Patient Data component
const PatientData = () => {
  const patients = [
    {
      id: 1,
      name: "Alice Johnson",
      age: 29,
      lastVisit: "2024-05-20",
      diagnosis: "Hypertension",
      notes: "Needs regular BP monitoring.",
    },
    {
      id: 2,
      name: "Bob Lee",
      age: 53,
      lastVisit: "2024-04-10",
      diagnosis: "Diabetes Type 2",
      notes: "Monitor blood sugar levels.",
    },
    {
      id: 3,
      name: "Carol Martinez",
      age: 40,
      lastVisit: "2024-06-01",
      diagnosis: "High Cholesterol",
      notes: "On statins, follow-up in 3 months.",
    },
  ];

  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const selectedPatient =
    patients.find((p) => p.id === selectedPatientId) || null;

  return (
    <section className="max-w-4xl bg-white p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6">Patient Data Access</h2>
      <div className="flex gap-8">
        <ul className="w-1/4 max-h-[300px] overflow-y-auto list-none p-0 m-0 border border-gray-200 rounded-lg">
          {patients.map(({ id, name }) => (
            <li
              key={id}
              onClick={() => setSelectedPatientId(id)}
              className={`p-4 border-b border-gray-200 cursor-pointer select-none transition-colors duration-200 hover:bg-blue-100 ${
                selectedPatientId === id ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {name}
            </li>
          ))}
        </ul>
        <div className="flex-grow">
          {!selectedPatient && (
            <p className="text-gray-500">Select a patient to view details</p>
          )}
          {selectedPatient && (
            <>
              <h3 className="text-xl font-bold mb-3">{selectedPatient.name}</h3>
              <p className="mb-1">
                <strong>Age:</strong> {selectedPatient.age}
              </p>
              <p className="mb-1">
                <strong>Last Visit:</strong> {selectedPatient.lastVisit}
              </p>
              <p className="mb-1">
                <strong>Diagnosis:</strong> {selectedPatient.diagnosis}
              </p>
              <p className="mb-2">
                <strong>Notes:</strong> {selectedPatient.notes}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Main DoctorDashboard component
const Page = () => {
  const [currentSection, setCurrentSection] = useState("profile");

  return (
    <div className="flex h-screen font-sans bg-[#FAF6E9] text-gray-900">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main className="flex-grow p-10 overflow-auto">
        {currentSection === "profile" && <Profile />}
        {currentSection === "pending" && <PendingRequests />}
        {currentSection === "messages" && <Messages />}
        {currentSection === "patients" && <PatientData />}
      </main>
    </div>
  );
};

export default Page;

