import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, TextInput} from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Modal,
  Button,
  Card,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="log-out-outline" />;

export const GradingScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const logOut = () => {
    setVisible(false);
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => setVisible(true)} />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation
        title="Оценивание"
        alignment="center"
        accessoryRight={BackAction}
      />
      <Divider />
      <Layout
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={styles.metaInfo}>
          <Text category="h5">Фамилия: Иванова</Text>
          <Text category="h5">Имя: Анна</Text>
          <Text category="h5">Отчество: Ивановна</Text>
        </View>
        <View style={styles.score}>
          <TextInput />
        </View>
      </Layout>

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
  score: {},
});
