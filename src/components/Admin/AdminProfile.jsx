import { useState, useEffect } from "react";
import "../../styles/AdminProfile.css";

function AdminProfile() {
  const [profileData, setProfileData] = useState({
    name: "Usman",
    email: "admin@usman.com",
    title: "Full Stack Developer",
    bio: "Passionate developer with 4+ years of experience",
    location: "Nigeria",
    phone: "+234 7046633631",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    loadProfileData();
  }, []);

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: "GET",
        headers: getAuthHeader(),
      });

      if (response.ok) {
        const data = await response.json();
        setProfileData(data.admin);
        setFormData(data.admin);
      } else {
        setMessage({ type: "error", text: "Failed to load profile" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!formData.name || !formData.email) {
      setMessage({ type: "error", text: "Name and Email are required!" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({ type: "error", text: "Invalid email format!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setProfileData(formData);
        setEditMode(false);
        setMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        const data = await response.json();
        setMessage({ type: "error", text: data.error || "Update failed" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setMessage({
        type: "error",
        text: "All password fields are required!",
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "New password must be at least 6 characters!",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/change-password`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: JSON.stringify(passwordData),
      });

      if (response.ok) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowPasswordForm(false);
        setMessage({
          type: "success",
          text: "Password changed successfully!",
        });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      } else {
        const data = await response.json();
        setMessage({
          type: "error",
          text: data.error || "Password change failed",
        });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(profileData);
    setEditMode(false);
  };

  return (
    <div className="admin-profile">
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.type === "success" ? "✅" : "❌"} {message.text}
        </div>
      )}

      <div className="profile-header">
        <h2>👤 Profile Settings</h2>
        <p>Manage your admin profile and security settings</p>
      </div>

      <div className="profile-container">
        {/* Profile Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>📋 Profile Information</h3>
            {!editMode && (
              <button className="btn-edit" onClick={() => setEditMode(true)}>
                ✏️ Edit Profile
              </button>
            )}
          </div>

          {editMode ? (
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label>Profession</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Your profession"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Your bio"
                  rows="4"
                ></textarea>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1-234-567-8900"
                />
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleSaveProfile}>
                  💾 Save Changes
                </button>
                <button className="btn-cancel" onClick={handleCancel}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="profile-display">
              <div className="profile-item">
                <span className="label">Full Name:</span>
                <span className="value">{profileData.fullName}</span>
              </div>
              <div className="profile-item">
                <span className="label">Email:</span>
                <span className="value">{profileData.email}</span>
              </div>
              <div className="profile-item">
                <span className="label">Profession:</span>
                <span className="value">{profileData.profession}</span>
              </div>
              <div className="profile-item">
                <span className="label">Bio:</span>
                <span className="value">{profileData.bio}</span>
              </div>
              <div className="profile-item">
                <span className="label">Location:</span>
                <span className="value">{profileData.location}</span>
              </div>
              <div className="profile-item">
                <span className="label">Phone:</span>
                <span className="value">{profileData.phone}</span>
              </div>
            </div>
          )}
        </div>

        {/* Security Settings Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>🔒 Security Settings</h3>
          </div>

          {!showPasswordForm ? (
            <div className="security-info">
              <p>⚠️ Keep your password secure and change it regularly.</p>
              <button
                className="btn-change-password"
                onClick={() => setShowPasswordForm(true)}
              >
                🔑 Change Password
              </button>
            </div>
          ) : (
            <div className="password-form">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                />
              </div>

              <div className="form-actions">
                <button className="btn-save" onClick={handleChangePassword}>
                  💾 Update Password
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Account Information Section */}
        <div className="profile-section">
          <div className="section-header">
            <h3>ℹ️ Account Information</h3>
          </div>

          <div className="account-info">
            <div className="info-item">
              <span className="label">Username:</span>
              <span className="value">{profileData.username}</span>
            </div>
            <div className="info-item">
              <span className="label">Account Status:</span>
              <span className="value status-active">● Active</span>
            </div>
            <div className="info-item">
              <span className="label">Member Since:</span>
              <span className="value">January 2026</span>
            </div>
            <div className="info-item">
              <span className="label">Last Login:</span>
              <span className="value">
                Today at {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
