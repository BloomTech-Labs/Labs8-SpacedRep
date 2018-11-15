import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { auth } = this.props;
    const { userProfile, getProfile } = auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    return (
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
    );
  }
}

export default Profile;

Profile.propTypes = {
  auth: PropTypes.shape({
    userProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
  }).isRequired,
};
