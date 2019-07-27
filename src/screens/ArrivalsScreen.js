import React from 'react';
import {Body, Container, Header, Left, Right, Title} from 'native-base';

class ProfileScreen extends React.Component {
  render() {
    return (<Container>
      <Header>
        <Left/>
        <Body>
        <Title>Dolasci</Title>
        </Body>
        <Right/>
      </Header>
    </Container>);
  }
}

export default ProfileScreen;