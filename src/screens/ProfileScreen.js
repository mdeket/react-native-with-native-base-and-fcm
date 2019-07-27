import React from 'react';
import {Body, Container, Header, Left, Right, Title} from 'native-base';
import {colors } from '../index.constants';

class ProfileScreen extends React.Component {
  render() {
    return (<Container style={{backgroundColor: 'white'}}>
      <Header androidStatusBarColor={colors.mainColor} style={{backgroundColor: colors.mainColor}}>
        <Left/>
        <Body>
        <Title>Profil</Title>
        </Body>
        <Right/>
      </Header>
    </Container>);
  }
}

export default ProfileScreen;