import React from 'react';
import styled from 'styled-components';

const testImg = 'https://picsum.photos/200';
const Team = () => {
  return (
    <TeamContainer id="team">
      <h2>Our Team</h2>
      <div>
        <p>These kind folks made SpaceReps possible. Our team is always seeking to improve your experience. Have a new feature request or simply want to tell us how we're doing? Let us know by contacting us at spacerepsupport@gmail.com.</p>
      </div>
      {/* <div> */}
      <ul>
        <li>
          <img src={testImg} alt="" />
          <p>Drew Moody</p>
        </li>
        <li>
          <img src={testImg} alt="" />
          <p>Megan Williamson</p>
        </li>
        <li>
          <img src={testImg} alt="" />
          <p>Gabriel Duquette</p>
        </li>
        <li>
          <img src={testImg} alt="" />
          <p>Saxon Hunt</p>
        </li>
      </ul>
      {/* </div> */}
    </TeamContainer>
  );
};

export default Team;

// styles

const TeamContainer = styled.div`
// padding-top: 55px;
// border: 1px solid pink;
height: 100vh;
width: 100%;
padding: 110px 10% 0% 10%;

div {
  // background-color: lightseagreen;
  padding: 5%;
    // color: lightslategrey;
    // color: #232323;
    height: 250px;
    // box-shadow: 0px 4px 10px 1px #1c3c39;
    color: white;
    background-color: #253440;
}

h2 {
  padding-left: 5%;
  // margin-bottom: 20px;
  // padding-left: 5%;
    margin-bottom: 35px;
    font-size: 36px;
}

}
ul {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  padding-left: 0;
  margin-top: -100px;

  li {
    display: flex;
    flex-direction: column;
  }

  img {
    border-radius: 50%;
    // border: 2px solid white;
    border: 2px solid lightseagreen;
  }

  p {
    text-align: center;
  }
}
`;
