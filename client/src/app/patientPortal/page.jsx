"use client";
import React, { useState } from "react";

// Sidebar component
const Sidebar = ({ currentSection, setCurrentSection }) => {
  const sections = [
    { key: "profile", label: "Profile" },
    { key: "history", label: "History" },
    { key: "search", label: "Search" },
    { key: "messages", label: "Messages" },
     { key: "videocall", label: "Video Call" }
  ];
  return (
    <div className="w-72 bg-[#A0C878] text-white flex flex-col p-5">
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


const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: "123 Main St, Springfield",
    dishTvId: "123456789",
    contact: "+1 (555) 987-6543",
    about: "Patient with history of mild asthma, currently managing with prescribed inhaler. Interested in general wellness.",
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
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/patient/modify` ,formData);
      console.log("Edit successful:", response.data);
      setIsEditing(false); // Close the edit form after submission
    } catch (error) {
      console.error("Error sending edit request:", error);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="max-w-2xl bg-white p-10 rounded-xl shadow-md flex flex-col items-center relative -mt-16">
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
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
              <label className="w-full text-left mb-1">
                Address:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter address"
                />
              </label>
              <label className="w-full text-left mb-1">
                Dish TV ID:
                <input
                  type="text"
                  name="dishTvId"
                  value={formData.dishTvId}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
                  placeholder="Enter Dish TV ID"
                />
              </label>
              <label className="w-full text-left mb-1">
                Contact Number:
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
                About:
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </label>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </form>
          ) : (
            <>
              <p className="text-gray-600 mb-1">Address: {formData.address}</p>
              <p className="text-gray-600 mb-1">Dish TV ID: {formData.dishTvId}</p>
              <p className="text-gray-600 mb-1">Contact: {formData.contact}</p>
              <p className="text-gray-600 mb-4">About: {formData.about}</p>
              <button onClick={handleEditToggle} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};











// History component


const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("https://your-api-url.com/history"); // Replace with your API URL
        setHistoryItems(response.data); // Assuming the server returns an array of history items
      } catch (err) {
        setError("An error occurred while fetching history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <section className="max-w-3xl bg-white p-8 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-6">History</h2>
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <ul>
        {historyItems.length === 0 && !loading ? (
          <li className="text-gray-500">No history found.</li>
        ) : (
          historyItems.map(({ id, date, action }) => (
            <li
              key={id}
              className="border-b border-gray-200 py-4 last:border-b-0 text-gray-700"
            >
              <p className="text-sm text-gray-500">{date}</p>
              <p>{action}</p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};




// Search component


const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://your-api-url.com/search`, {
        params: { query }, // Send the query as a parameter
      });
      setResults(response.data); // Assuming the server returns an array of doctors
    } catch (err) {
      setError("An error occurred while fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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
      {loading && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div>
        {results.length === 0 && query.trim() !== "" && !loading ? (
          <div className="text-gray-500">No results found.</div>
        ) : (
          results.map(({ id, name, specialty, hospital }) => (
            <div
              key={id}
              className="border-b border-gray-200 py-4 last:border-b-0"
            >
              <p className="font-semibold text-lg">{name}</p>
              <p className="text-gray-700">{specialty}</p>
              <p className="text-gray-500">{hospital}</p>
            </div>
          ))
        )}
      </div>
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
            className="flex-grow p-3 rounded-lg border border-gray-300 resize-none font-sans text-base h-12"
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






//video calling
const Videocall = () => {
  const startCall = () => {
    // Logic to start the video call (e.g., using WebRTC or a third-party service)
    console.log("Starting video call...");
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Telemedicine Video Call</h2>
        <p className="mb-6">You are about to start a video call with your doctor.</p>
        <button
          onClick={startCall}
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Start Video Call
        </button>
      </div>
    </div>
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
        {currentSection === "videocall" && <Videocall />}

      </main>
    </div>
  );
};

export default PatientDashboard;
