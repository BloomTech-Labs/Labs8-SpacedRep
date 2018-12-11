import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Billing from './Billing';
import '../App.css';

const Profile = (props) => {
  const { profile, handleUpdateTier } = props;
  return profile ? (
    <Container>
      <ProfileContainer>
        <Name>{profile.name}</Name>
        <Nickname>
          {'Nickname: '}
          {profile.nickname}
        </Nickname>
        <Tier>
          {'Tier: '}
          {profile.tier}
        </Tier>
        <ProfileImage src={profile.picture} alt="profile" />
      </ProfileContainer>
      <Billing profile={profile} handleUpdateTier={handleUpdateTier} />
    </Container>
  ) : (
    <Container>
      <ProfileContainer>Loading...</ProfileContainer>
    </Container>
  );
};

export default Profile;

// Profile.propTypes = {
//   profile: PropTypes.object,
// };

const Container = styled.div`
  width: 100%;
  margin-left: 100px;
  padding: 30px 50px 0 50px;
  display: flex;
  flex-direction: row;
  align-items: left;
  background: ${props => props.theme.dark.bodyBackground};
  padding-bottom: 5%;
  @media (max-width: 500px) {
    margin-left: 0;
    min-height: 750px;
    margin-top: 65px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
  }
`;

const ProfileContainer = styled.div`
  // border: 1px solid black;
  display: flex;
  width: 50%;
  flex-direction: column;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Name = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
  width: 300px;
  padding-bottom: 20px;
  border-bottom: 1px solid white;
`;

const Nickname = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  width: 300px;
`;

const Tier = styled.h4`
  font-size: 20px;
  width: 300px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid white;
`;

const ProfileImage = styled.img`
  width: 300px;
`;
