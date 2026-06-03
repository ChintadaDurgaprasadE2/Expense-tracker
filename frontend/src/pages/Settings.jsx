import { useEffect, useState } from "react";
import API from "../api.jsx";

export default function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ success: "", error: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get("/auth/profile");
        setProfile({ name: response.data.name || "", email: response.data.email || "" });
      } catch (err) {
        setStatus({ success: "", error: err.response?.data?.msg || "Unable to load profile." });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setStatus({ success: "", error: "" });
  };

  const handlePasswordChange = (key, value) => {
    setPasswordData((prev) => ({ ...prev, [key]: value }));
    setStatus({ success: "", error: "" });
  };

  const submitProfile = async (event) => {
    event.preventDefault();
    setStatus({ success: "", error: "" });

    try {
      const response = await API.put("/auth/profile", {
        name: profile.name,
        email: profile.email
      });

      setStatus({ success: response.data.msg || "Profile updated successfully.", error: "" });
    } catch (err) {
      setStatus({ success: "", error: err.response?.data?.msg || "Failed to update profile." });
    }
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    setStatus({ success: "", error: "" });

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setStatus({ success: "", error: "New passwords do not match." });
      return;
    }

    try {
      const response = await API.put("/auth/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setStatus({ success: response.data.msg || "Password changed successfully.", error: "" });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setStatus({ success: "", error: err.response?.data?.msg || "Failed to change password." });
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Settings</h2>
          <p className="muted">Update your profile and keep your account secure.</p>
        </div>
      </div>

      {loading ? (
        <div className="card">
          <p>Loading settings...</p>
        </div>
      ) : (
        <>
          {status.error && (
            <div className="card error-card">
              <p>{status.error}</p>
            </div>
          )}
          {status.success && (
            <div className="card success-card">
              <p>{status.success}</p>
            </div>
          )}

          <div className="card">
            <h3>Update Profile</h3>
            <form onSubmit={submitProfile} className="settings-form">
              <label>
                Name
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => handleProfileChange("name", e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </label>

              <button type="submit" className="primary">
                Save profile
              </button>
            </form>
          </div>

          <div className="card">
            <h3>Change Password</h3>
            <form onSubmit={submitPassword} className="settings-form">
              <label>
                Current password
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                  placeholder="Current password"
                />
              </label>

              <label>
                New password
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  placeholder="New password"
                />
              </label>

              <label>
                Confirm new password
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  placeholder="Confirm password"
                />
              </label>

              <button type="submit" className="primary">
                Change password
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
