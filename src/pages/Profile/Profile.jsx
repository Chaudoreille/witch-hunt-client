import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from "./EditProfile";
import Button from "../../components/Button/Button";
import "./Profile.css";

/**
 * Profile Page
 * Displays the user info
 * @returns
 */
function Profile() {
  const { user } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(null);

  return (
    <section className="Profile flex-center-section">
      <div className="window-center-grey">
        {editMode === "image" ? (
          <EditProfile mode="image" setMode={setEditMode} />
        ) : editMode === "info" ? (
          <EditProfile mode="info" setMode={setEditMode} />
        ) : (
          <>
            <div className="profile-pic-wrapper">
              <div className="image-wrapper">
                <img src={user.image} alt="avatar" />
              </div>
              <button className="image-edit" onClick={() => setEditMode("image")}>
                <EditIcon />
              </button>
            </div>
            <div className="user-info-wrapper">
              <label>Username</label>
              <span>{user.username}</span>
              <label>Email</label>
              <span>{user.email}</span>
            </div >
            <Button variant="small" action={() => setEditMode("info")}>
              Edit user info
            </Button>
          </>
        )}
      </div >
    </section >
  );
}

export default Profile;
