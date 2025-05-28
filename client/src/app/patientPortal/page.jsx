"use client";
import React, { useState } from "react";

// Sidebar component
const Sidebar = ({ currentSection, setCurrentSection }) => {
  const sections = [
    { key: "profile", label: "Profile" },
    { key: "history", label: "History" },
    { key: "search", label: "Search" },
    { key: "messages", label: "Messages" },
  ];
  return (
    <div className="w-72 bg-green-700 text-white flex flex-col p-5">
      <h2 className="font-semibold mb-5 tracking-wide text-xl">Patient Dashboard</h2>
      <nav>
        {sections.map(({ key, label }) => (
          <a
            key={key}
            href="#!"
            onClick={() => setCurrentSection(key)}
            className={
              "block px-4 py-3 mb-2 rounded-lg font-semibold cursor-pointer select-none " +
              (currentSection === key
                ? "bg-green-800"
                : "hover:bg-green-600 transition-colors duration-200")
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
// Profile component
const Profile = () => (
  <section className="flex justify-center items-center h-screen">
    <div className="max-w-2xl bg-white p-10 rounded-xl shadow-md flex flex-col items-center -mt-16">
      <div
        className="w-48 h-48 rounded-full shadow-md bg-center bg-cover mb-6"
        style={{
          backgroundImage: "url('https://randomuser.me/api/portraits/women/44.jpg')",
          boxShadow: "0 4px 10px rgba(34,197,94,0.3)",
        }}
      />
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-2">Sarah Williams</h2>
        <p className="text-gray-600 mb-1">Age: 35</p>
        <p className="text-gray-600 mb-1">Gender: Female</p>
        <p className="text-gray-600 mb-1">Address: 123 Main St, Springfield</p>
        <p className="text-gray-600 mb-1">Weight: 150 lbs</p>
        <p className="text-gray-600 mb-4">Dish TV ID: 123456789</p>
      </div>
      <div className="text-gray-700 space-y-2">
        <p>
          <strong>About:</strong> Patient with history of mild asthma, currently
          managing with prescribed inhaler. Interested in general wellness.
        </p>
        <p>
          <strong>Primary Doctor:</strong> Dr. John Smith
        </p>
        <p>
          <strong>Contact:</strong> +1 (555) 987-6543
        </p>
      </div>
    </div>
  </section>
);


// History component
const History = () => {
  // Sample history data
  const historyItems = [
    {
      id: 1,
      date: "2024-05-15",
      description: "Routine physical examination with Dr. John Smith.",
    },
    {
      id: 2,
      date: "2024-02-20",
      description: "Follow-up consultation for asthma management.",
    },
    {
      id: 3,
      date: "2023-12-05",
      description: "Received flu vaccination at city clinic.",
    },
  ];

  return (
    <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6">History</h2>
      <ul>
        {historyItems.map(({ id, date, description }) => (
          <li
            key={id}
            className="border-b border-gray-200 py-4 last:border-b-0 text-gray-700"
          >
            <p className="text-sm text-gray-500">{date}</p>
            <p>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Search component
const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Sample doctors for search demo
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      hospital: "City Health Medical Center",
    },
    {
      id: 2,
      name: "Dr. Emily Clark",
      specialty: "Dermatologist",
      hospital: "Sunshine Clinic",
    },
    {
      id: 3,
      name: "Dr. Matthew Reed",
      specialty: "Orthopedist",
      hospital: "General Hospital",
    },
  ];

  const handleSearch = () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = doctors.filter((doc) =>
      [doc.name, doc.specialty, doc.hospital]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6">Search</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search doctors or hospitals..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg text-base"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer select-none"
        >
          Search
        </button>
      </div>
      <ul>
        {results.length === 0 && query.trim() !== "" ? (
          <li className="text-gray-500">No results found.</li>
        ) : (
          results.map(({ id, name, specialty, hospital }) => (
            <li
              key={id}
              className="border-b border-gray-200 py-4 last:border-b-0"
            >
              <p className="font-semibold text-lg">{name}</p>
              <p className="text-gray-700">{specialty}</p>
              <p className="text-gray-500">{hospital}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

// Messages component
const Messages = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "doctor",
      text: "Hello Sarah, how are you feeling today?",
    },
    { sender: "patient", text: "I'm doing well, thank you!" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setChatMessages((msgs) => [...msgs, { sender: "patient", text: input }]);
    setInput("");
    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "doctor", text: "Glad to hear that! Let me know if you have questions." },
      ]);
    }, 1200);
  };

  return (
    <section className="flex justify-center items-center h-screen">

      <div className="w-full max-w-5xl bg-white p-10 rounded-xl shadow-md flex flex-col h-[85%]">

        <h2 className="text-2xl font-semibold mb-6">Messages</h2>
        <div
          className="flex-grow overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-100 mb-4"
        >
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
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative">
            <input
              type="file"
              id="fileUpload"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => console.log(e.target.files[0])}
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
            disabled={!input.trim()}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
              input.trim()
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


// Main PatientDashboard component
const PatientDashboard = () => {
  const [currentSection, setCurrentSection] = useState("profile");

  return (
    <div className="flex h-screen font-sans bg-gray-50 text-gray-900">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <main className="flex-grow p-10 overflow-auto">
        {currentSection === "profile" && <Profile />}
        {currentSection === "history" && <History />}
        {currentSection === "search" && <Search />}
        {currentSection === "messages" && <Messages />}
      </main>
    </div>
  );
};

export default PatientDashboard;
