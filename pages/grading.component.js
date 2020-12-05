import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Modal,
  Button,
  Card,
} from '@ui-kitten/components';
import io from 'socket.io-client';
import {API_URL} from '@env';
import {ApiContext} from '../context/ApiContext';
import TextInputMask from 'react-native-text-input-mask';


export const GradingScreen = ({navigation}) => {
  const {member, setMember, user, Logout, estimateMember} = useContext(
    ApiContext,
  );
  const [score, setScore] = useState(0);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const socket = io(API_URL);
    console.log(2)

    socket.on('UpdateMember', (data) => {
      setScore(0);
      setDisableButton(false);
      setMember(data);
    });

    socket.on('JudgeLogout', (data) => {
      if (data.login === user.login) {
        setScore(0);
        setDisableButton(false);
        Logout();
        navigation.goBack();
      }
    });
  });

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Вы нажали кнопку назад!',
        'Вы уверены, что хотите выйти из учетной записи?',
        [
          {
            text: 'Нет',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Да',
            onPress: () => {
              setScore(0);
              setDisableButton(false);
              Logout();
              navigation.goBack();
            },
          },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [visible, setVisible] = useState(false);

  const logOut = () => {
    setDisableButton(false);
    setVisible(false);
    Logout();
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Divider />
      {Object.keys(member).length === 0 ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 20,
          }}>
          <Text category={'h1'}>Соревнование не идет</Text>
        </View>
      ) : (
        <Layout
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View style={styles.metaInfo}>
            <Text category="h5">Фамилия: {member.fio.split(' ')[0]}</Text>
            <Text category="h5">Имя: {member.fio.split(' ')[1]}</Text>
            <Text category="h5">Отчество: {member.fio.split(' ')[2]}</Text>
            <Text category="h5">Дата рождения: {member.dateOfBirth}</Text>
            <Text category="h5">Разряд: {member.rank}</Text>
            <Text category="h5">Претендует на: {member.toRank}</Text>
          </View>
          <View style={styles.score}>
            <Text category="h1" style={{marginBottom: 10}}>
              Балл:
            </Text>
            <TextInputMask
              style={styles.TextInputStyle}
              placeholder="0"
              keyboardType={'numeric'}
              value={score}
              onChangeText={(formatted, extracted) => {
                setScore(+formatted);
              }}
              mask={'[99].[99]'}
            />
            <Button
              disabled={disableButton}
              size={'giant'}
              onPress={() => {
                setDisableButton(true);
                estimateMember(score);
              }}>
              <Text category={'h1'} style={{color: '#fff'}}>
                Оценить
              </Text>
            </Button>
          </View>
        </Layout>
      )}

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card style={{maxWidth: 300}}>
          <Text style={{marginBottom: 20}} category={'h5'}>
            Вы точно хотите выйти из учетной записи?
          </Text>
          <Layout style={styles.modalButtons}>
            <Button onPress={() => setVisible(false)} status={'basic'}>
              Закрыть окно
            </Button>
            <Button onPress={() => logOut()} status={'danger'}>
              Выйти
            </Button>
          </Layout>
        </Card>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 20,
  },
  score: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  TextInputStyle: {
    textAlign: 'center',
    height: 200,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
    width: 300,
    fontSize: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#b4c8ff',
    marginBottom: 20,
  },
});
