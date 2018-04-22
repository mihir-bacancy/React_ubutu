import variable from "./../variables/platform";

export default (variables = variable) => {
  const cardTheme = {
    ".transparent": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null
    },

    marginVertical: variables.deviceHeight * 0.005,
    marginHorizontal: variables.deviceWidth * 0.02,
    flex: 1,
    borderWidth: variables.borderWidth,
    borderRadius: 3,
    borderColor: variables.cardBorderColor,
    flexWrap: "wrap",
    backgroundColor: variables.cardDefaultBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
    ".slider": {
        width: variables.deviceWidth * 0.3,
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        marginVertical: variables.deviceHeight * 0.01,
        marginRight: variables.deviceWidth * 0.02,
        marginLeft: 0,
    },
    ".playerControls":{
      alignItems:"center",
      shadowOpacity: 0.1,
      shadowRadius: 1.5,
      paddingVertical: variables.deviceHeight * 0.01,
      marginTop: variables.deviceHeight * 0.01,

    },
      ".playerControlsLandscape":{
        alignItems:"center",
        marginTop:0,
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        paddingVertical: variables.deviceHeight * 0.01,
},

      ".landscapeControllerLeft": {
          flex:0,
          flexDirection:'column',
          marginRight: variables.deviceWidth * 0.01,
      },
      ".landscapeControllerRight": {
          flex:0,
          flexDirection:'column',
          marginLeft: variables.deviceWidth * 0.01,
      },
      ".landscapeCourseVideo": {
          flex:1,
          flexDirection:'column',
          height: variables.deviceHeight * 0.8,
          width: variables.deviceWidth * 0.74,
      },
      ".landscapeUserVideo": {
          flex:1,
          flexDirection:'column',
          height: variables.deviceHeight * 0.8,
          width: variables.deviceWidth * 0.74,
      },
  };

  return cardTheme;
};
