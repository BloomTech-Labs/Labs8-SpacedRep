import React from 'react';
// import PropTypes from 'prop-types';

const Profile = (props) => {
  const { profile } = props;
  return profile
    ? (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <div header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              {/* <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel> */}
              <h3>{profile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </div>
        </div>
      </div>
    )
    : (
      <div className="container">
        <div className="profile-area">
          Loading...
        </div>
      </div>
    );
};

export default Profile;

// Profile.propTypes = {
//   profile: PropTypes.object,
// };
