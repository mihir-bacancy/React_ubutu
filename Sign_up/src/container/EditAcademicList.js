import React, { Component } from 'react';
import {
    View,
    Text,
    Button, ToastAndroid, AsyncStorage, Alert, TextInput,
    DatePickerAndroid,
    Picker,
    TouchableOpacity, StyleSheet,
    Image

} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome'


const AcademicsType = [
    {
        label: 'Commerce',
        value: 'Commerce',
    },

    {
        label: 'Engineering',
        value: 'Engineering',
    },
    {
        label: 'Science',
        value: 'Science',
    },
    {
        label: 'Arts',
        value: 'Arts',
    },
    {
        label: 'Others',
        value: 'Others',
    }

];

const DegreeType = [
    {
        label :'Diploma',
        value :'Diploma'
    },
    {
        label : 'Graduation',
        value:'Graduation'
    },
    {
        label :'Post Graduation',
        value :'Post Graduation'
    }

];

const Status = [
    {
        label : 'Complete',
        value:'Complete'
    },
    {
        label :'InComplete',
        value :'InComplete'
    }
];


let start = 'Select Date';
let end = 'Select Date';
let x;

export default class EditAcademicList extends Component{
    constructor() {
        super();
        this.state = {
            fname : '',
            lname :'',
            email : '',
            pwd :'',
            photoUrl : '',
            contact :'',
            InstituteName :'',
            AcademicType: 'Commerce',
            startDate:'Select Date',
            endDate :'Select Date',
            DegreeType :'Select Degree',
            Status :'Complete',
            start : 'Select Date',
            end : 'Select Date'

        }
    }

    _onFocusStartDate= async () => {
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: (this.state.startDate === 'Select Date')? new Date() : new Date(this.state.startDate),
                minDate: new Date(1997, 0, 30),
                maxDate: (this.state.endDate === 'Select Date') ? new Date() : new Date(this.state.endDate),
            });
            if(action !== DatePickerAndroid.dismissedAction){
                let date = new Date(year, month, day);
                start = await date.toLocaleDateString();
                date = date.toString();
                this.setState({
                    startDate: date,
                    start : start,
                });
            }
        }
        catch(err){
        }
    };

    _onFocusEndDate= async () => {
        if(this.state.Status == "Complete") {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: (this.state.endDate === 'Select Date')? new Date() : new Date(this.state.endDate),
                    minDate: (this.state.startDate === 'Select Date') ? new Date(1997, 0, 30) : new Date(this.state.startDate),
                    maxDate: new Date(),

                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    let date = new Date(year, month, day);
                    end = await date.toLocaleDateString();
                    date = date.toString();
                    this.setState({
                        endDate: date,
                        end :end,

                    });
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
        else{
            ToastAndroid.showWithGravity(
                'Status InComplete',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
    }

    componentWillMount = async () => {
    const {params} = this.props.navigation.state;
    x = JSON.parse(await AsyncStorage.getItem('LogIn'));
    console.log("x", x.AcademicDetails[params.index].AcademicType)

    this.setState({
        fname: x.fname,
        lname: x.lname,
        photoUrl: x.photoUrl,
        pwd: x.pwd,
        email: x.email,
        index: params.index,
        AcademicType: x.AcademicDetails[params.index].AcademicType,
        InstituteName: x.AcademicDetails[params.index].InstituteName,
        DegreeType: x.AcademicDetails[params.index].DegreeType,
        Status: x.AcademicDetails[params.index].Status,
        startDate: x.AcademicDetails[params.index].startDate,
        endDate: x.AcademicDetails[params.index].endDate
    });
        start = new Date(this.state.startDate);
        start = await start.toLocaleDateString();
        if(this.state.endDate !== 'Select Date'){
            //end = Date.parse(this.state.end)
            end = new Date(this.state.endDate);
            end = await end.toLocaleDateString();
        }
        this.setState({
            start : start,
            end :end
        })


    }

    _onValueChangeDegree (value: string) {
        this.setState({
            DegreeType : value
        });
    }

    _onValueChangeStatus (value: string) {
        this.setState({
            Status : value
        });
    }

    _onValueChange (value: string) {
        this.setState({
            AcademicType : value
        });
    }

    _saveData = async()=> {
        try {
            const {navigate} = this.props.navigation;
            const {index, AcademicType, InstituteName, startDate, endDate, DegreeType, Status} = this.state;
            if (InstituteName === '' ||
                startDate === 'Select Date' ||
                (endDate === 'Select Date' && Status === 'Complete') ||
                (endDate !== 'Select Date' && Status === 'InComplete')) {
                alert('Enter all values')
            } else {
                let users = JSON.parse(await AsyncStorage.getItem('data'));
                let details = {
                    index: index,
                    AcademicType: AcademicType,
                    InstituteName: InstituteName,
                    DegreeType: DegreeType,
                    Status: Status,
                    startDate: startDate,
                    endDate: endDate
                };
                for (let i = 0; i < users.length; i++) {
                    if (x.email === users[i].email) {
                        x.AcademicDetails[this.state.index] = details;
                        users[i].AcademicDetails[this.state.index] = details;
                        ToastAndroid.showWithGravity(
                            'Update Successfully',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM
                        )
                    }
                }
                AsyncStorage.setItem('LogIn', JSON.stringify(x));
                AsyncStorage.setItem('data', JSON.stringify(users))
                navigate('Academics')
            }
        }catch(err){
            alert(err)
        }
    }
   /* render() {
        const { params } = this.props.navigation.state;
        const { navigate } = this.props.navigation
        return (
            <View>

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
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Academic Type*</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                <Picker
                        editable={false}
                        style = {{width :395,color :'red'}}
                        selectedValue={this.state.AcademicType}
                        onValueChange={this._onValueChange.bind(this)}>
                        {AcademicsType.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />))}
                    </Picker>
                </View>
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Institute Name*</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                        <TextInput style = {{color :'red'}}
                                   onChangeText={(InstituteName) => this.setState({InstituteName})}>
                            {this.state.InstituteName}</TextInput>
                </View>
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Degree Type*</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                <Picker
                        editable={false}
                        style = {{width :395,color :'red'}}
                        selectedValue={this.state.DegreeType}
                        onValueChange={this._onValueChangeDegree.bind(this)}>
                        {DegreeType.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />))}
                    </Picker>
                </View>
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Status</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                    <Picker
                        editable={false}
                        style = {{width :395,color :'red'}}
                        selectedValue={this.state.Status}
                        onValueChange={this._onValueChangeStatus.bind(this)}>
                        {Status.map((i, index) => (
                            <Picker.Item key={index} label={i.label} value={i.value} />))}
                    </Picker>
                </View>

                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style={{flexDirection:'column',flex:0.4}}>
                        <Text style = {{fontWeight: 'bold',fontSize:16}} >Start Date</Text>
                    </View>
                    <View style ={{flex:0.2}}></View>
                    <View style={{flexDirection:'column',flex:0.4}}>
                        <Text style = {{fontWeight: 'bold',fontSize:16}} >End Date</Text>
                    </View>

                </View>
                <View style={{flexDirection:'row',paddingTop:10}}>
                    <View style ={{flex:0.4,borderRadius: 4,
                        borderWidth: 2}}>
                    <TouchableOpacity
                            onPress = {this._onFocusStartDate}
                            color = "Yellow"
                        >
                        <Text style = {{fontWeight: 'bold',fontSize:16}} >{start}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style ={{flex:0.2}}></View>
                    <View style ={{flex:0.4,borderRadius: 4,
                        borderWidth: 2}}>
                        <TouchableOpacity
                            onPress={this._onFocusEndDate}
                            color="green">
                            <Text style = {{fontWeight: 'bold',fontSize:16}} >{end}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{paddingTop: 10}}><Button
                        title="Submit"
                        color="green"
                        onPress={this._saveData.bind()}
                    />
                </View>
            </View>


        );
    }
}*/
    render(){
        return(
            <View style={{flex: 1, backgroundColor: '#fff', padding: 25, justifyContent: 'space-between' }}>

                <View style={{ justifyContent: 'space-between'}}>
                    <KeyboardAwareScrollView>
                        <View style={[styles.container, {paddingBottom: 5}]}>
                            <View style={[styles.avatar]}>
                                { ( this.state.photoUrl === '' || this.state.photoUrl === undefined )
                                    ? <Icon name={'user'} size={90}/>
                                    : <Image style={styles.avatar} source={this.state.photoUrl}/>
                                }
                            </View>
                            <View>
                                <Text style={{fontSize: 25,color:'black'}}>{this.state.fname} {this.state.lname}</Text>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Academic Type*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <Picker
                                    editable={false}
                                    style = {{width :370,color :'red'}}
                                    selectedValue={this.state.AcademicType}
                                    onValueChange={this._onValueChange.bind(this)}>
                                    {AcademicsType.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />))}
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Institute Name*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <TextInput style = {{color :'red',paddingLeft:10}}
                                           onChangeText={(InstituteName) => this.setState({InstituteName})}
                                           placeholder='Enter Institute Name'
                                           underlineColorAndroid='transparent'        >
                                    {this.state.InstituteName}</TextInput>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Degree Type*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <Picker
                                    editable={false}
                                    style = {{width :370,color :'red'}}
                                    selectedValue={this.state.DegreeType}
                                    onValueChange={this._onValueChangeDegree.bind(this)}>
                                    {DegreeType.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />))}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Status*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <Picker
                                    editable={false}
                                    style = {{width :370,color :'red'}}
                                    selectedValue={this.state.Status}
                                    onValueChange={this._onValueChangeStatus.bind(this)}>
                                    {Status.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, flexDirection: 'column',paddingRight:5}}>
                                <View>
                                    <Text style = {{fontWeight: 'bold',fontSize:16}}>Start Date*</Text>
                                </View>
                                <View style={{borderWidth: 2, borderColor: 'black',height:50}}>
                                    <TouchableOpacity
                                        onPress = {this._onFocusStartDate}
                                    >
                                        <Text style={{fontSize:16,paddingTop:12,paddingLeft:10,color:'red'}}>
                                            {this.state.start}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column',paddingLeft:5}}>
                                <View>
                                    <Text style = {{fontWeight: 'bold',fontSize:16}}>End Date*</Text>
                                </View>
                                <View style={{borderWidth: 2, borderColor: 'black' , height:50}}>
                                    <TouchableOpacity
                                        onPress = {this._onFocusEndDate}
                                    >
                                        <Text style={{fontSize:16,paddingTop:12,paddingLeft:10,color:'red'}}>
                                            {this.state.end}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </KeyboardAwareScrollView>
                </View>

                <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={{width: 150}}>
                        <Button
                            onPress={this._saveData}
                            title={'Save Data'}
                            color='orange'
                        />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 75,
        width: 90,
        height: 90
    }
});