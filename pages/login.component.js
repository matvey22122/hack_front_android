import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  Input,
} from '@ui-kitten/components';
import {ApiContext} from '../context/ApiContext';

export const LoginScreen = ({navigation}) => {
  const {Login, setUser, user} = useContext(ApiContext);

  const logIn = async () => {
    try {
      if (await Login()) {
        navigation.navigate('Grading');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="GCD" alignment="center" />
      <Divider />
      <Layout style={styles.container}>
        <Layout style={styles.layout}>
          <Input
            style={{marginBottom: 25}}
            placeholder={'Логин'}
            value={user.login}
            label={'Логин'}
            size={'large'}
            onChangeText={(nextValue) =>
              setUser((prevState) => {
                let newUser = Object.assign({}, prevState);
                newUser.login = nextValue;
                return newUser;
              })
            }
          />
          <Input
            style={{marginBottom: 20}}
            placeholder={'Пароль'}
            value={user.password}
            label={'Пароль'}
            size={'large'}
            onChangeText={(nextValue) =>
              setUser((prevState) => {
                let newUser = Object.assign({}, prevState);
                newUser.password = nextValue;
                return newUser;
              })
            }
            secureTextEntry={true}
          />
          <Button onPress={logIn}>Войти</Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 250,
  },
});
