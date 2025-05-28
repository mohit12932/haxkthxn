"use client";
import React, { useState } from "react";

// Sidebar component with Tailwind CSS classes
const Sidebar = ({ currentSection, setCurrentSection }) => {
  const sections = [
    { key: "profile", label: "Profile" },
    { key: "pending", label: "Pending Requests" },
    { key: "messages", label: "Messages" },
    { key: "patients", label: "Patient Data" },
  ];
  return (
    <div className="w-72 bg-blue-700 text-white flex flex-col p-5">
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
                ? "bg-blue-800"
                : "hover:bg-blue-600 transition-colors duration-200")
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
const Profile = () => (
  <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8">
    <div className="max-w-xl">
      <div className="flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-full shadow-md bg-center bg-cover"
          style={{
            backgroundImage: "url('https://randomuser.me/api/portraits/men/32.jpg')",
            boxShadow:
              "0 4px 10px rgba(30, 136, 229, 0.3)",
          }}
        />
        <div>
          <h2 className="text-2xl font-bold mb-1">Dr. John Smith</h2>
          <p className="text-gray-600 mb-0">Cardiologist</p>
          <p className="text-gray-600">john.smith@example.com</p>
        </div>
      </div>
      <div className="mt-6 text-gray-700 space-y-2">
        <p>
          <strong>About:</strong> Experienced cardiologist with over 15 years of
          practice. Passionate about patient care and preventative medicine.
        </p>
        <p>
          <strong>Hospital:</strong> City Health Medical Center
        </p>
        <p>
          <strong>Contact:</strong> +1 (555) 123-4567
        </p>
      </div>
    </div>
  </section>
);

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

// Messages component
const Messages = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "patient",
      text: "Hello, doctor! I have a question about my medication.",
    },
    { sender: "doctor", text: "Hi Alice, sure, please tell me more." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setChatMessages((msgs) => [...msgs, { sender: "doctor", text: input }]);
    setInput("");
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "patient", text: "Thank you, doctor!" },
      ]);
    }, 1200);
  };

  return (
    <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8 flex flex-col h-[400px]">
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>
      <div
        className="flex-grow overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-100 mb-4"
        id="chat-window"
      >
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[70%] mb-3 px-4 py-2 rounded-xl leading-relaxed text-sm clear-both ${
              msg.sender === "doctor"
                ? "bg-blue-600 text-white float-right rounded-br-none"
                : "bg-blue-900 text-white float-left rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <textarea
          rows="2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-3 rounded-lg border border-gray-300 resize-none font-sans text-base"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
            input.trim()
              ? "bg-blue-700 hover:bg-blue-800 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send
        </button>
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
    <div className="flex h-screen font-sans bg-gray-50 text-gray-900">
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

