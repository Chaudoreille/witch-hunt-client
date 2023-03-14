import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import EditProfile from "./EditProfile";
import Button from "../../components/Button/Button";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
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
    <section className="Profile flex-center-section auth">
      <div className="window-center-grey auth">
        <div className='actionBar'>
          <Link className='closeButton' to="/home">
            <HighlightOffIcon className='close-icon' />
          </Link>
        </div>
        {editMode === "image" ? (
          <EditProfile mode="image" setMode={setEditMode} />
        ) : editMode === "info" ? (
          <EditProfile mode="info" setMode={setEditMode} />
        ) : (
          <>
            <div className="profile-pic-wrapper">
              <ProfilePicture user={user} />
              <button className="image-edit" onClick={() => setEditMode("image")}>
                <EditIcon />
              </button>
            </div>
            <div className="user-info-wrapper">
              <p className="label">Username</p>
              <p className="info">{user.username}</p>
              <p className="label">Email</p>
              <p className="info">{user.email}</p>
            </div>
            <Button variant="small" action={() => setEditMode("info")}>
              Edit user info
            </Button>
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
