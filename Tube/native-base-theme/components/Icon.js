import variable from "./../variables/platform";

export default (variables = variable) => {
    const iconTheme = {
        fontSize: variables.iconFontSize,
        color: "grey",
        width: 30,
        ".subscribe" :{
            fontSize: 15,
            "NativeBase.Icon": {
                color: variables.btnDangerBg
            },
            "NativeBase.IconNB": {
                color: variables.btnDangerBg
            },
            backgroundColor: "transparent",
        },
        ".iconLeft" :{
            marginLeft:0,
            marginRight:5,
            width:25,

        },
        ".iconRight" :{
            marginLeft:5,
            marginRight:0,
            width:20,
        },
    };
    return iconTheme;
};
