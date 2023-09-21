import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity
} from 'react-native';

export const MainGame = (props) => {
  const [currentTurn, setCurrentTurn] = useState(1);
  const noPlayers = props.route.params.p;
  const boxes = props.route.params.b;
  const symbols = ['X', '0', '&', '#'];
  const [pauseModal, setPauseModal] = useState(false);
  const [msg, setMsg] = useState('');
  let playerno, sym, msg2;
  const [homeModal, setHomeModal] = useState(true);
  const [modalHeight, setModalHeight] = useState('50%');
  const [mainStatus,setMainStatus]=useState(false);

  let listdata3 = [
    { id: 0, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }] },
    { id: 1, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }] },
    { id: 2, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }] }
  ];

  let listdata6 = [
    { id: 0, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] },
    { id: 1, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] },
    { id: 2, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] },
    { id: 3, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] },
    { id: 4, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] },
    { id: 5, data: [{ id: 0, text: '', status: false }, { id: 1, text: '', status: false }, { id: 2, text: '', status: false }, { id: 3, text: '', status: false }, { id: 4, text: '', status: false }, { id: 5, text: '', status: false }] }
  ];

  let listdata = listdata3;

  if (boxes == 6) {
    listdata = listdata6;
  }

  const [dataList, setDataList] = useState(listdata);


  useEffect(() => {

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      GoBack,
    );

    return () => backHandler.remove();
  }, []);


  function ShowWinModal() {
    playerno = (currentTurn - 1 >= 0) ? currentTurn : noPlayers;
    sym = (currentTurn - 1 >= 0) ? symbols[currentTurn - 1] : symbols[noPlayers - 1];
    msg2 = "Congratulations! \nPlayer " + playerno + "(" + sym + ")" + "\nWINS...!!!";
    setMsg(msg2);
    setMainStatus(true);
    setPauseModal(true);
  }

  const CheckWin2 = () => {
    let flag = true;

    for (let i = 0; i < boxes; i++) {
      for (let j = 0; j + 3 < boxes; j++) {
        if (((((dataList[i]).data[j]).text == (((dataList[i]).data[j + 1]).text)) & (((dataList[i]).data[j + 1]).text == (((dataList[i]).data[j + 2]).text)) & (((dataList[i]).data[j + 2]).text == (((dataList[i]).data[j + 3]).text)) & (((dataList[i]).data[j]).status == true)) ||
          ((((dataList[j]).data[i]).text == (((dataList[j + 1]).data[i]).text)) & (((dataList[j + 1]).data[i]).text == (((dataList[j + 2]).data[i]).text)) & (((dataList[j + 2]).data[i]).text == (((dataList[j + 3]).data[i]).text)) & (((dataList[j]).data[i]).status == true))
        ) {
          ShowWinModal();
        };
        if (i + 3 < boxes) {
          if (((((dataList[i]).data[j]).text == (((dataList[i + 1]).data[j + 1]).text)) & (((dataList[i + 1]).data[j + 1]).text == (((dataList[i + 2]).data[j + 2]).text)) & (((dataList[i + 2]).data[j + 2]).text == (((dataList[i + 3]).data[j + 3]).text)) & (((dataList[i]).data[j]).status == true))) {
            ShowWinModal();
          }
          else if (((((dataList[i]).data[boxes - 1 - j]).text == (((dataList[i + 1]).data[boxes - j - 2]).text)) & (((dataList[i + 1]).data[boxes - j - 2]).text == (((dataList[i + 2]).data[boxes - j - 3]).text)) & (((dataList[i + 2]).data[boxes - j - 3]).text == (((dataList[i + 3]).data[boxes - j - 4]).text)) & (((dataList[i]).data[boxes - 1 - j]).status == true))) {
            ShowWinModal();
          };
        }
      }
    }
    for (i = 0; i < boxes; i++) {
      for (j = 0; j < boxes; j++) {
        if (((dataList[i]).data[j]).text == '') {
          flag = false;
        }
      }
    }
    if (flag) {
      setMainStatus(true);
      setMsg("Game Draw!!!");
      setPauseModal(true);
    }
  }

  const CheckWin = () => {

    let flag = true;

    for (let i = 0; i < boxes; i++) {
      for (let j = 0; j + 2 < boxes; j++) {
        if (((((dataList[i]).data[j]).text == (((dataList[i]).data[j + 1]).text)) & (((dataList[i]).data[j + 1]).text == (((dataList[i]).data[j + 2]).text)) & (((dataList[i]).data[j]).status == true)) ||
          ((((dataList[j]).data[i]).text == (((dataList[j + 1]).data[i]).text)) & (((dataList[j + 1]).data[i]).text == (((dataList[j + 2]).data[i]).text)) & (((dataList[j]).data[i]).status == true))
        ) {
          ShowWinModal();
        };
        if (i + 2 < boxes) {
          if (((((dataList[i]).data[j]).text == (((dataList[i + 1]).data[j + 1]).text)) & (((dataList[i + 1]).data[j + 1]).text == (((dataList[i + 2]).data[j + 2]).text)) & (((dataList[i]).data[j]).status == true))) {
            ShowWinModal();
          }
          else if (((((dataList[i]).data[boxes - 1 - j]).text == (((dataList[i + 1]).data[boxes - j - 2]).text)) & (((dataList[i + 1]).data[boxes - j - 2]).text == (((dataList[i + 2]).data[boxes - j - 3]).text)) & (((dataList[i]).data[boxes - 1 - j]).status == true))) {
            ShowWinModal();
          };
        }
      }
    }
    for (i = 0; i < boxes; i++) {
      for (j = 0; j < boxes; j++) {
        if (((dataList[i]).data[j]).text == '') {
          flag = false;
        }
      }
    }
    if (flag) {
      setMainStatus(true);
      setMsg("Game Draw!!!");
      setPauseModal(true);
    }
  }

  function GoBack() {
    GoToHome();
    return true;
  }

  const Pause = () => {
    return (
      <Modal
        transparent={true}
        visible={pauseModal}
        animationType='slide'
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={[styles.pauseModalSubView, { height: modalHeight }]}>
            {homeModal ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: 'black', marginBottom: '10%',fontWeight: 'bold',fontStyle: 'italic', }}>{msg}</Text>
                <Text style={[styles.button, { padding: 10, fontSize: 20, marginBottom: '10%' }]} onPress={() => setPauseModal(false)}>Resume</Text>
                <Text style={[styles.button, { padding: 10, fontSize: 20, marginBottom: '10%' }]} onPress={Restart}>Restart</Text>
                <Text style={[styles.button, { padding: 10, fontSize: 20 }]} onPress={GoToHome}>Home</Text>

              </View>
              :
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black', marginBottom: '10%' }}>Are you sure want to go back?</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.smallButtons, { padding: 10 }]} onPress={() => { props.navigation.popToTop(); setModalHeight('60%'); }}>YES</Text>
                  <Text style={[styles.smallButtons, { padding: 10, marginLeft: '30%' }]} onPress={() => { setHomeModal(true); setPauseModal(false); setModalHeight('60%'); }}>NO</Text>
                </View>
              </View>
            }
          </View>
        </View>
      </Modal>

    );
  }

  function Restart() {
    props.navigation.push('Game', { p: noPlayers, b: boxes });
  }

  const GoToHome = () => {
    setModalHeight('40%');
    setHomeModal(false);
    setPauseModal(true);
  }

  return (
    <View style={{ flex: 1 }}>

      <View style={{ flex: 0.3, flexDirection: 'row' }}>
        <Text style={[styles.button, { flex: 1.5 }]} onPress={() => { GoToHome(); }}>Home</Text>
        <Text style={styles.textRound}>TIC-TAC-TOE</Text>
        <Text style={[styles.button, { flex: 1.5 }]} onPress={() => { setMsg("Paused"); setPauseModal(true); }}>Pause</Text>
      </View>


      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, borderWidth: 3, borderRadius: 10, borderColor: 'black' }}>
          <Text style={styles.text}>Player 1      (X)</Text>
          <View style={styles.turnBorder}>
          {
            (currentTurn == 1) ?
              <Text style={styles.turn}>Your Turn</Text>
              : null
          }
          </View>
        </View>

        {
          (noPlayers >= 3) ? <View style={{ flex: 1, borderWidth: 3, borderRadius: 10, borderColor: 'black' }}>
            <Text style={styles.text}>Player 3      (&)</Text>
            <View style={styles.turnBorder}>
          {
            (currentTurn == 3) ?
              <Text style={styles.turn}>Your Turn</Text>
              : null
          }
          </View>
          </View> : null
        }
      </View>


      <View style={{ flex: 3, backgroundColor: '#5B2C6F' }}>
        {dataList.map((item, index) =>
          <View style={{ flex: 1, flexDirection: 'row' }} key={index}>
            {(item.data).map((item2, index2) =>
              <TouchableOpacity style={styles.clickBoxText}
                key={index2}
                onPress={() => {
                  if (!(mainStatus||item2.status)) {
                    (currentTurn < noPlayers) ? setCurrentTurn(currentTurn + 1) : setCurrentTurn(1);
                    item2.text = symbols[currentTurn - 1];
                    item2.status = true;
                    if (boxes == 3) { CheckWin(); }
                    else { CheckWin2(); }
                  }
                }}
              >
                <Text style={styles.boxText}>{(((dataList[item.id]).data)[item2.id]).text}</Text>
              </TouchableOpacity>

            )}
          </View>
        )}
      </View>


      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, borderWidth: 3, borderRadius: 10, borderColor: 'black' }}>
          <Text style={styles.text}>Player 2      (0)</Text>
          <View style={styles.turnBorder}>
          {
            (currentTurn == 2) ?
              <Text style={styles.turn}>Your Turn</Text>
              : null
          }
          </View>
        </View>
        {
          (noPlayers >= 4) ? <View style={{ flex: 1, borderWidth: 3, borderRadius: 10, borderColor: 'black' }}>
            <Text style={styles.text}>Player 4      (#)</Text>
            <View style={styles.turnBorder}>
          {
            (currentTurn == 4) ?
              <Text style={styles.turn}>Your Turn</Text>
              : null
          }
          </View>
          </View> : null
        }
      </View>
      <Pause />

    </View>
  );
};

const styles = StyleSheet.create({
  turnBorder:
  {
    flex:1,
    borderWidth:3,
    borderColor:'#5B2C6F',
    borderRadius:10,
    margin:'8%',
    padding:'1.5%',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  textRound: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    textAlignVertical: 'center',
    flex: 6,
    fontFamily: 'fantasy',
    fontWeight: 'bold',
    fontStyle: 'italic',
    elevation:20,
    textShadowColor:'#5B2C6F',
    textShadowRadius:5
  },
  turn: {
    textAlign: 'center',
    color: 'white',
    flex: 1,
    textAlignVertical: 'center',
    backgroundColor: 'black',
    borderRadius: 7
  },
  button: {
    color: 'white',
    backgroundColor: '#5B2C6F',
    textAlignVertical: 'center',
    textAlign: 'center',
    borderRadius: 15
  },
  clickBoxText: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  boxText: {
    fontSize: 40,
    color: 'purple',
  },
  pauseModalSubView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 20,
    shadowOpacity: 1,
    borderWidth: 1,
    borderRadius: 20
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
});

