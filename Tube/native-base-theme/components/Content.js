import variable from "./../variables/platform";

export default (variables = variable) => {
  const contentTheme = {
    ".padder": {
      padding: variables.contentPadding
    },
    flex: 1,
    backgroundColor: "transparent",
    "NativeBase.Segment": {
      borderWidth: 0,
      backgroundColor: "transparent"
    },
      ".landscape": {
          flex:1,
          flexDirection:'column',
          "NativeBase.Segment": {
             flex:1,
             flexDirection:'column'
          },
      },
  };

  return contentTheme;
};
