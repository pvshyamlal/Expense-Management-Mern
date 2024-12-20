import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile() {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile")) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Left Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-title">Menu</div>
        <a href="/dashboard" target="content-frame">
          Dashboard
        </a>
        <a href="/add_expenses" target="content-frame">
          Add New Expenses
        </a>
        <a href="/view_expenses" target="content-frame">
          View Expenses
        </a>
        <a href="/financial_reports" target="content-frame">
          Financial Reports
        </a>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <a href="/profile">Home</a>
          <div className="profile">
            <div
              className="profile-bubble"
              onClick={toggleDropdown}
              role="button"
            >
              U
            </div>
            {isDropdownActive && (
              <div className="dropdown">
                <p>Welcome, User</p>
                <a href="/edit_profile" target="content-frame">
                  Profile
                </a>
                <button onClick={() => alert("Logged out!")}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Success Messages Area */}
        <div className="messages" id="welcome-message">
          <p>Welcome to your profile!</p>
        </div>

        {/* Frame Area */}
        <iframe
          name="content-frame"
          className="frame-container"
          src="/dashboard"
        ></iframe>
      </div>
    </div>
  );
}

export default Profile;
