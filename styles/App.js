import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // HOME
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonscontainer: {
    alignItems: 'center',
    margin: 20,
  },
  newbutton: {
    backgroundColor: '#009e0a',
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    width: 250,
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 20,
  },
  resumebutton: {
    backgroundColor: '#009e0a',
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    width: 250,
    textAlign: 'center',
    lineHeight: 50,
    margin: 20,
  },
  statisticsbutton: {
    backgroundColor: '#2b6cdb',
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    width: 250,
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 15,
  },
  // PLAYER SIGNUP
  signupInput: {
    backgroundColor: 'white',
    margin: 50,
    marginLeft: 125,
    height: 50,
    width: 250,
  },
  playerrow: {
    flexDirection: 'row',
    margin: 5,
  },
  playername: {
    width: 300,
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    lineHeight: 50,
    textAlign: 'center',
  },
  removebutton: {
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    width: 50,
    textAlign: 'center',
    lineHeight: 50,
  },
  // GAME
  coursetitle: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 40,
  },
  coursedetailscontainer: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
  },
  detailscolumn: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center'
  },
  courseheader: {
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 20,
  },
  courseyardpar: {
    fontSize: 15,
  },
  // player in game display
  playerdisplayrowtop: {
    flexDirection: 'row',
    flex: 1,
    margin: 5,
  },
  gameplayername: {
    width: 150,
    height: 50,
    backgroundColor: 'white',
    fontSize: 20,
    lineHeight: 50,
    textAlign: 'center',
  },
  scoredisplayrow1: {
    flexDirection: 'row',
    flex: 1,
  },
  scoredisplayrow2: {
    flexDirection: 'row',
    flex: 2,
  },
  scorebox: {
    fontWeight: 'bold',
    height: 30,
    width: 30,
    textAlign: 'center',
    lineHeight: 30,
    borderColor: 'black',
    borderWidth: 1,
  }
});
