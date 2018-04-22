import React, {Component} from 'react';
import {View, Text, TouchableOpacity, AsyncStorage, StyleSheet,ScrollView} from 'react-native'
import { Table,Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import EditAcademicList from "./EditAcademicList";
'using strict'

let arr2 = [];

export default class Academics extends Component {
/*    constructor(props){
        super(props);
        this.state={
            array2 : [],
            x: '',
        }
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState() {
        const {navigate} = this.props.navigation;
        arr2 = [];
        let user = JSON.parse(await AsyncStorage.getItem('LogIn'));
        if(user.AcademicDetails === undefined){

        }
        else {
            await user.AcademicDetails.map((name) => {
                if(name.endDate === 'Select Date'){
                    name.endDate = ''
                }
                arr = [
                    name.AcademicType,
                    name.InstituteName,
                    name.DegreeType,
                    name.Status,
                    name.startDate,
                    name.endDate,
                    <TouchableOpacity
                        onPress={() => navigate('EditAcademicList',{index: name.index})}
                        >
                        <Text>Edit</Text>
                    </TouchableOpacity>,
                                  ]
                arr2.push(arr)

            })
            this.setState({
                array2: arr2
            })
        }

    }
    render() {

        /*const {navigate} = this.props.navigation
        const tableHead = ['Academic Type', 'Institute Name','Degree Type','Status', 'Start Date', 'End Date', 'Action'];
        return (
            <ScrollView>
            <View style={{flex: 1,backgroundColor:'white'}}>
                <View style={styles.image_class}>
                    <Image
                        source={require('/home/hetali/Desktop/Progrmas/Sign_up/src/resources/Images/images.png')}

                    />
                </View>
                <View style = {{flexDirection:'row',padding:10,borderRadius: 4,
                    borderWidth: 2}}>
                    <View style = {{flex: 0.6,
                        alignSelf: 'flex-start'}}>
                    <Text style = {{fontWeight: 'bold',fontSize:15}} >Academics</Text>
                </View>
                    <View style = {{flex: 0.2}}></View>
                    <View style = {{flex: 0.2,
                        alignSelf: 'flex-end',
                    backgroundColor :'green'}}>
                    <TouchableOpacity
                        onPress={() => navigate('LIstAcademic')}
                        backgroundColor = 'transparent'

                    >
                        <Text style = {{fontWeight: 'bold',fontSize:15,alignSelf:'center'}}>+ADD</Text>
                    </TouchableOpacity>
                </View>
                </View>
                <View style = {{padding :10}}>
                    <Table>
                        <Row data={tableHead} style = {{ backgroundColor: 'darkgray'}}/>
                        <Rows data={this.state.array2}/>
                    </Table>
                </View>
            </View>
            </ScrollView>
        )


    }*/
    constructor(props){
        super(props);
        this.state={
            array2 : [],
            x: '',
        }
    }

    componentWillMount() {
        this._loadInitialState().done();
    }

    async _loadInitialState(){
        arr2 = [];
        let user = JSON.parse(await AsyncStorage.getItem('LogIn'));
        console.log(user);
        if(user.AcademicDetails === undefined){

        }
        else {
            await user.AcademicDetails.map((name) => {
                console.log(name);
                if(name.endDate === 'Select Date'){
                    name.endDate = ''
                }
                let arr = [
                    <View style={{ flexDirection: 'column', borderBottomWidth: 2, borderBottomColor: '#aeaeae'}}>
                        <View style={{flexDirection: 'row',flex :1,justifyContent:'space-between'}}>
                            <View>
                                <TouchableOpacity onPress={() => this._edit(name.index)}>
                                    <Text style={{color:'orange',fontSize:14}}>{name.InstituteName}</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <TouchableOpacity onPress={() => this._edit(name.index)}>
                                    <Text style={{color:'orange',fontSize:14}}>
                                        ({(new Date(name.startDate).getFullYear())}
                                        -
                                        {(new Date(name.endDate).getFullYear())
                                        ?(new Date(name.endDate).getFullYear()):'OnGoing'
                                    })

                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style = {{fontSize:14}}>{name.Status}({name.AcademicType})</Text>
                            </View>
                        </View>
                    </View>
                ];
                arr2.push(arr);
                console.log(arr2)
            });
            this.setState({
                array2: arr2,
            })
        }
        //await AsyncStorage.clear();
        //console.log('All: ' + AsyncStorage.getAllKeys())
    }

    _navi = () => {
        const { navigate } = this.props.navigation;
        navigate('LIstAcademic')
    };

    _edit = (text) => {
        const { navigate } = this.props.navigation;
        navigate('EditAcademicList', {index: text});
    };

    render(){
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>

                <View style={{flex: 1, paddingTop: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <View><Text style={{fontSize: 25}}>Academics</Text></View>
                    <View><Text>Tell us about your education, and professional</Text></View>
                    <View><Text>licenses and certifications</Text></View>
                </View>

                <View style={{flex: 4, paddingRight: 25, paddingLeft: 25 }}>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        borderBottomWidth: 2,
                        borderBottomColor: '#aeaeae'
                    }}>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Academics</Text>
                        </View>
                        <View>
                            <TouchableOpacity onPress={this._navi}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{paddingRight: 4}}>
                                        <Icon name={'plus-circle'} size={18}/>
                                    </View>
                                    <View>
                                        <Text style={{fontWeight: 'bold', color: '#00f'}}>Add</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>
                    <View>
                        <Table borderStyle={{borderWidth: 0}}>
                            <Rows data={this.state.array2}/>
                        </Table>
                    </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles1 = StyleSheet.create({
    buttonStyle :{
        height:30,
         }
})