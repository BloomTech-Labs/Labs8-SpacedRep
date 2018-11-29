import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Billing from './Billing';
import '../App.css';

const Profile = (props) => {
  const { profile, handleUpdateTier } = props;
  return profile
    ? (
      <Container>
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <div>
            {/* <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel> */}
            <h3>{profile.nickname}</h3>
          </div>
          <div header="Profile">
            <img src={profile.picture} alt="profile" style={{ width: '100px' }} />
            <h4>
              Tier:
              {' '}
              {profile.tier}
            </h4>
          </div>
        </div>
        <Billing profile={profile} handleUpdateTier={handleUpdateTier} />
      </Container>
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: left;
`;
