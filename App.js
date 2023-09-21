import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  BackHandler,
  Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainGame } from './components/MainGame';

const Stack = createNativeStackNavigator();

const App = () => {

  const [players, setPlayers] = useState(2);
  const [modalBoardVis, setModalBoardVis] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(3);
  const [modalheight, setModalHeight] = useState('80%');
  const [modalBoard, setModalBoard] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const [modalExit, setModalExit] = useState(false);
  const [modalHelp, setModalHelp] = useState(false);

  const ShowModalExit = () => {
    setModalHeight('40%');
    setModalExit(true);
    setModalBoardVis(true);
  }


  const CloseModal = () => {
    modalBoard ? setModalBoard(false) : null;
    modalSettings ? setModalSettings(false) : null;
    modalExit ? setModalExit(false) : null;
    modalHelp ? setModalHelp(false) : null;
    setModalBoardVis(false);
  }

  const ShowModalBoard = () => {
    setModalHeight('80%');
    setModalBoard(true);
    setModalBoardVis(true);
  }


  const Radio = (props) => {
    const data = props.list;
    return (
      <View style={{ flex: 1, marginTop: '10%' }}>
        {
          data.map((item, index) => <TouchableOpacity key={index} onPress={() => setSelectedBoard(item.id)}>
            <View style={stylesRadio.View1}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image
                  style={{ width: 150, height: 150 }}
                  source={item.link}
                />

                <View style={stylesRadio.radioWraper}>
                  <View style={stylesRadio.radio}>
                    {
                      selectedBoard === item.id ? <View style={stylesRadio.radiobg}></View> : null
                    }
                  </View>
                  <Text style={stylesRadio.text}>{item.name}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>)
        }
      </View>
    );
  };


  const Modals = (para) => {
    props = para.data;
    return (
      < Modal
        transparent={true}
        visible={modalBoardVis}
        animationType='slide'
      >
        <View style={styles.modalMainView}>
          <View style={[styles.modalSubMainView, { height: modalheight }]}>

            <View style={{ flex: 0.1, flexDirection: 'row' }}>
              <View style={{ flex: 10 }}></View>
              <View style={{ flex: 1.5 }}>
                <Text style={[styles.text1, { backgroundColor: 'black', borderRadius: 10, fontSize: 20 }]}
                  onPress={() => { CloseModal() }}
                >X</Text>
              </View>
            </View>

            {modalBoard ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[styles.text1, { color: 'black', marginBottom: 20 }]}>Select Board</Text>

              <Radio list={[{ id: 3, name: "3 X 3", link: require('./android/app/src/main/res/mat3.png') }, { id: 6, name: "6 X 6", link: require('./android/app/src/main/res/mat6.png') }]} />

              <Text style={[styles.text1, { backgroundColor: "#5B2C6F", padding: '3%', paddingLeft: '40%', paddingRight: '40%' }]}
                onPress={() => { CloseModal(); props.navigation.navigate('Game', { p: players, b: selectedBoard }); }}
              >OK</Text>
            </View> : null}

            {modalSettings ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: 'black' }}>{"Nothing to set, till now.\nWait for Updates."}</Text>
            </View>
              : null
            }

            {
              modalExit ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'black', marginBottom: '10%' }}>Are you sure want to exit?</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.smallButtons, { padding: 10 }]} onPress={() => BackHandler.exitApp()}>YES</Text>
                    <Text style={[styles.smallButtons, { padding: 10, marginLeft: '30%' }]} onPress={() => CloseModal()}>NO</Text>
                  </View>
                </View>
                : null
            }

            {
              modalHelp ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20, color: 'black' }}>This is a simple Tic-Tac-Toe Game.{'\n\n\n'}Developer Contact :{'\n\t\t'} rjdpkr06@gmail.com</Text>
                </View>
                : null
            }

          </View>
        </View>
      </Modal>
    );
  };



  const HomeDisplay = (props) => {

    function backActionHandler() {
      setModalHeight('40%');
      setModalExit(true);
      setModalBoardVis(true);
      return true;
    }

    useEffect(() => {

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backActionHandler,
      );

      return () => backHandler.remove();
    }, []);

    return (

      <View style={styles.mainView}>

        <View style={{ flex: 0.5, flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => ShowModalExit()}>
            <Text style={styles.smallButtons}>⬅</Text>
          </TouchableOpacity>
          <View style={{ flex: 4 }}></View>
          <TouchableOpacity onPress={() => { setModalHeight('60%'); setModalSettings(true); setModalBoardVis(true); }} style={{ flex: 1 }}>
            <Text style={[styles.smallButtons, { alignSelf: 'auto' }]} >⚙︎</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          
          <Text style={styles.headText}>TIC-TAC-TOE</Text>
        </View>

        <View style={styles.subHeadView}>

          <Text style={styles.subHead}> SELECT NUMBER OF PLAYERS - </Text>

          <View style={styles.playerTextMainView}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={styles.playerTextView} onPress={() => { ShowModalBoard(); setPlayers(2); }}>
              <Text style={styles.text1} >Two{'\n'}Players</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
          </View>

          <View style={styles.playerTextMainView}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={() => { ShowModalBoard(); setPlayers(3); }} style={styles.playerTextView}>
              <Text style={styles.text1} >Three{'\n'}Players</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
          </View>

          <View style={styles.playerTextMainView}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={() => { ShowModalBoard(); setPlayers(4); }} style={styles.playerTextView}>
              <Text style={styles.text1} >Four{'\n'}Players</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
          </View>

          <View style={styles.playerTextMainView}>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity onPress={() => { setModalHeight('50%'); setModalHelp(true); setModalBoardVis(true); }} style={styles.playerTextView}>
              <Text style={styles.text1}>Help</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
          </View>

        </View>
        <Modals data={props} />

      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name='Home'
          component={HomeDisplay}
        />
        <Stack.Screen name='Game' component={MainGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};


const styles = StyleSheet.create({
  headText: {
    color: '#5B2C6F',
    fontSize: 50,
    fontFamily: 'fantasy',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    textShadowColor:'black',
    textShadowRadius:10,
    textDecorationLine:'underline',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },
  subHead: {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 20,
    textDecorationLine:'underline',
  },
  subHeadView: {
    flex: 9,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    borderWidth: 7,
    borderColor: 'black'
  },
  playerTextMainView: {
    flex: 1,
    flexDirection: 'row',
  },
  playerTextView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#5B2C6F',
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    shadowColor: 'black',
    elevation: 40,
  },
  text1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  smallButtons: {
    fontSize: 22,
    backgroundColor: '#5B2C6F',
    fontWeight: 'bold',
    textAlignVertical: 'top',
    textAlign: 'center',
    borderRadius: 10,
    color: 'white',
    paddingBottom: 5,

  },
  textInput: {
    fontSize: 20,
    color: 'black',
    borderWidth: 2
  },
  modalMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalSubMainView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: '80%',
    borderWidth: 1,
    shadowColor: 'black',
    elevation: 20,
  }
});

const stylesRadio = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black'
  },
  radioWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 12,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  radiobg: {
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  View1: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  }
});

export default App;