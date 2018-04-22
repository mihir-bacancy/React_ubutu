/**
 * @providesModule LayoutStyle
 */

import { StyleSheet, Platform, Dimensions } from 'react-native';
import { size } from 'global';

export default StyleSheet.create({
    wallpaper: {
        flex: 1,
        flexDirection:'row',
        width: size.width,
        height: size.height,
        resizeMode: 'cover',
        alignItems:'center',
        /*backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',*/
    },
    mainContainer: {
        flex:1,
        position:'absolute',
        right:0,
        height:0,
        width:0,
        zIndex:0
    },
    mainContainerWithLoader: {
        flex:1,
        position:'absolute',
        right:0,
        height:size.height,
        width:size.width,
        zIndex:999999
    },
    empty:{
        height:0,
        width:0
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: size.height * 0.10,
    },
    primaryButton: {
        margin: 10,
        padding: 15,
        alignSelf:'center',
        backgroundColor:"blue",
        width:150
    },
    buttonStyle: {
        flex: 1,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007aff',     // close to native ios blue
        marginLeft: 5,
        marginRight: 5,

    },
    logoImage: {
        width: size.width * 0.4,
        //height: size.height * 0.2,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.5,
        resizeMode: 'contain',
    },
    fbButtonStyle: {
        flex: 0,    // expand to fill the space
        alignSelf: 'stretch',   // position self using flexbox rules
        backgroundColor: '#3b5998',
        marginLeft: 5,
        marginRight: 5,
        minHeight: 20
    },
    indicatorWithLoader:{
        flex:1,
        position:'absolute',
        right:0,
        height:size.height,
        width:size.width,
        zIndex:999
    },
    indicator:{
        flex:1,
        zIndex:99999,
        justifyContent:'center',
        top:0,
        right:0,
        position:'absolute',
        width:100,
        height:100,
        zIndex:100,
    },
    whiteText : {
        color: '#fff',
        fontWeight:'bold',
        marginTop:4
    },
    greyText : {
        color: '#424242',
        fontWeight:'bold',
        marginTop:4
    },
    fullWidth:{
        width: size.width * 0.90,
        marginTop: size.height * 0.02,

    },
    headerTitle:{
        alignSelf: 'center',
    },
    blueLink : {
        color: '#3F57D3',
        textDecorationLine:'underline',
        alignSelf:'center'
    },
    screenTitle : {
        color: '#FFFFFF',
        alignSelf:'flex-start',
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        marginTop: size.height * 0.03
    },
    screenTitleWithIcons : {
        color: '#FFFFFF',
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        marginTop: size.height * 0.02
    },
    emptyDataLabel: {
        width:size.width,
        textAlign:'center',
        color: '#696969'
    },
    infoLink: {
        color: '#5999dc',
        fontSize:30,
        marginTop: size.height * 0.03,
        fontWeight:'bold'
    },
    footerIconCotainer:{
        flexDirection: null,
        backgroundColor: "transparent",
        borderColor: null,
        elevation: 0,
        shadowColor: null,
        shadowOffset: null,
        shadowRadius: null,
        shadowOpacity: null,
        alignSelf: "center",
        flex: 1,
    },
    footerLayout:{
        flex:1,backgroundColor: '#fff',
        flexDirection: "row",
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: "#cbcbcb",
        elevation: 3,
        left: 0,
        right: 0,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
    },
    footerContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        alignSelf: "stretch"
    },
    footerIcon:{
        alignSelf: 'center',
        color: '#222',
    },
    footerIconText:{
        alignSelf: 'center',
        color: '#222',
    },
    headerLayout:{
        backgroundColor: '#3F51B5',
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: Platform.OS=== "ios" ? 20 : 0,
        borderBottomWidth: 1,
        borderBottomColor: '#3F51B5',
        height: (Dimensions.get('window').height + Dimensions.get('window').width ) * 0.065,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1.2,
        top: 0,
        left: 0,
        right: 0,
    },
    headerContainer:{

        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        alignSelf: "stretch"
    },
    headerIconCotainer:{
        flexDirection: "row",
        backgroundColor: "transparent",
        borderColor: null,
        elevation: 0,
        shadowColor: null,
        shadowOffset: null,
        shadowRadius: null,
        shadowOpacity: null,
        alignSelf: "center",
        flex: 1,
    },
    headerIcon:{
        alignSelf: 'center',
        color: '#fff',
    },
});
