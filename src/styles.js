import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: "white",
    borderRadius: 10,
    margin : 10 ,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'left',
  },


  imagepreviewcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 220,
    backgroundColor: "#bab5b5",
    marginVertical: 8,
    borderRadius: 8,
  },
  previewText: {
    color: '#592454',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDCDCD',
    height: 50,
    width: '90%',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: 50,
  },
  TitleText: {
    fontWeight: `bold`,
  },

  summaryContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns items at the ends
  },
  readMoreButton: {
    color: 'blue',
  },
  showLessButton: {
    color: 'blue',
  },
  blog: {
   margin: 10 ,
  },
});

export default styles;