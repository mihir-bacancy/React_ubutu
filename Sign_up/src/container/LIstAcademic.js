import React, { Component } from 'react';
import {
    View,
    Text,
    Picker,
    TextInput,
    DatePickerAndroid,
    Button, ToastAndroid, AsyncStorage,Alert,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome'


let userDetails = [];
let start = 'Select Date';
let end = 'Select Date';

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

let x = '';

export default class LIstAcademic extends Component{
    constructor(){
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

        }
    }
    componentWillMount = async () => {
        const { navigate } = this.props.navigation
        try {
            x = JSON.parse(await AsyncStorage.getItem('LogIn'))
            this.setState({
                fname: x.fname,
                lname: x.lname,
                pwd : x.pwd,
                photoUrl: x.photoUrl,
                email: x.email,
                contact : x.contact
            })
        }catch(err){
            navigate('Login');
        }

    }
    _saveData = async()=> {

        const {AcademicType, InstituteName, startDate, endDate, DegreeType, Status} = this.state;
        let user1 = {
            AcademicType: AcademicType,
            InstituteName: InstituteName,
            DegreeType: DegreeType,
            Status: Status,
            startDate: startDate,
            endDate: endDate,

        }
        const {navigate} = this.props.navigation;
        if (
            InstituteName === '' ||
            startDate === 'Select Date' ||
            (endDate === 'Select Date' && Status === 'Complete') ||
            (endDate !== 'Select Date' && Status === 'InComplete')
        ) {
            alert('Enter all values')
        }
        else {
            let user = JSON.parse(await AsyncStorage.getItem('data'))
            for (let i = 0; i < user.length; i++) {
                if (x.email === user[i].email) {
                    if (x.AcademicDetails === undefined) {
                        //user.academicDetails.push(user1);
                        let object = {
                            index: 0,
                            AcademicType: AcademicType,
                            InstituteName: InstituteName,
                            startDate: startDate,
                            endDate: endDate,
                            DegreeType: DegreeType,
                            Status: Status
                        }
                        userDetails.push(object);

                        let usr = {
                            fname: x.fname,
                            lname: x.lname,
                            email: x.email,
                            pwd: x.pwd,
                            photoUrl: x.photoUrl,
                            contact: x.contact,
                            AcademicDetails: userDetails
                        }
                        user[i] = usr;
                        AsyncStorage.setItem('LogIn', JSON.stringify(usr))
                        console.log("Data..", user)
                        ToastAndroid.showWithGravity(
                            'ADD SuccessFully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        navigate('Academics')
                    }
                    else {
                        let len = x.AcademicDetails.length;
                        let object = {
                            index: len,
                            AcademicType: AcademicType,
                            InstituteName: InstituteName,
                            startDate: startDate,
                            endDate: endDate,
                            DegreeType: DegreeType,
                            Status: Status
                        }
                        x.AcademicDetails.push(object);
                        user[i].AcademicDetails.push(object);

                        AsyncStorage.setItem('LogIn', JSON.stringify(x))

                        ToastAndroid.showWithGravity(
                            'ADD SuccessFully',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                        navigate('Academics')
                    }
                }
            }
            AsyncStorage.setItem('data', JSON.stringify(user))
        }

    }
    _onValueChange (value: string) {
        this.setState({
            AcademicType : value
        });
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
    _onFocusStartDate= async () => {
        /*try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: new Date(),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day);
                date = date.toLocaleString();

                this.setState ({
                    startDate: date
                })
                // Selected year, month (0-11), day
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message)
        }*/
        try{
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: (this.state.startDate === 'Select Date')? new Date() : this.state.startDate,
                minDate: new Date(1997, 0, 30),
                maxDate: (this.state.endDate === 'Select Date') ? new Date() : this.state.endDate,
            });
            if(action !== DatePickerAndroid.dismissedAction){
                let date = new Date(year, month, day);
                start = await date.toLocaleDateString();
                this.setState({
                    startDate: date,
                    start : start ,
                });
            }
        }
        catch(err){
            console.warn(err)
        }

    }
    _onFocusEndDate= async () => {
       /* try {
            if(this.state.Status == "Complete"){

                const {action, year, month, day} = await DatePickerAndroid.open({
                    // Use `new Date()` for current date.
                    // May 25 2020. Month 0 is January.
                    date: new Date()
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    let date = new Date(year, month, day);
                    date = date.toLocaleString();
                    if(date >= this.state.startDate ){
                        this.setState ({
                            endDate : date
                        })
                    }else{
                        Alert.alert("EndDate should be > startDAte")
                    }

                    // Selected year, month (0-11), day
                }
            }else{
                ToastAndroid.showWithGravity(
                    'Status InComplete',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                );
            }
            } catch ({code, message}) {
            console.warn('Cannot open date picker', message)
        }*/
        if(this.state.Status == "Complete") {
            try {
                const {action, year, month, day} = await DatePickerAndroid.open({
                    date: (this.state.endDate === 'Select Date') ? new Date() : this.state.endDate,
                    minDate: (this.state.startDate === 'Select Date') ? new Date(1997, 0, 30) : this.state.startDate,
                    maxDate: new Date(),
                });
                if (action !== DatePickerAndroid.dismissedAction) {
                    let date = new Date(year, month, day);
                    end = await date.toLocaleDateString();
                    this.setState({
                        endDate: date,
                        end : end,
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



  /*  render(){
        return(
            <View>
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Academic Type*</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                    <Picker
                        editable={false}
                        style = {{width :395}}
                        selectedValue={this.state && this.state.AcademicType}
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
                    <TextInput
                        onChangeText={(InstituteName) => this.setState({InstituteName})}/>
                </View>
                <View style = {{paddingTop: 10}}>
                    <Text style = {{fontWeight: 'bold',fontSize:16}} >Degree Type*</Text>
                </View>
                <View style = {{borderRadius: 4,
                    borderWidth: 2}}>
                    <Picker
                        editable={false}
                        style = {{width :395}}
                        selectedValue={this.state && this.state.DegreeType}
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
                        style = {{width :395}}
                        selectedValue={this.state && this.state.Status}
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
                <View style = {{paddingTop: 10}}>
                    <Button
                        title="Submit"
                        onPress={this._saveData.bind()}
                        color="green"
                    />
                </View>
            </View>


        )
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
                                <Text style={{fontSize: 25,fontWeight:'bold',color:'black'}}>{this.state.fname} {this.state.lname}</Text>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:14}}>Academic Type*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <Picker
                                    editable={false}
                                    style = {{width :370}}
                                    selectedValue={this.state && this.state.AcademicType}
                                    onValueChange={this._onValueChange.bind(this)}>
                                    {AcademicsType.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />))}
                                </Picker></View>
                        </View>

                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Institute Name*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black',paddingLeft:10}}>

                                <TextInput
                                    onChangeText={(InstituteName) => this.setState({InstituteName})}
                                    placeholder='Enter Institute Name'
                                    underlineColorAndroid='transparent'
                                    style = {{fontSize:16}}
                                />
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style = {{fontWeight: 'bold',fontSize:16}}>Degree Type*</Text>
                            </View>
                            <View style={{ borderWidth: 2, borderColor: 'black'}}>
                                <Picker
                                    editable={false}
                                    style = {{width :370}}
                                    selectedValue={this.state && this.state.DegreeType}
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
                                    style = {{width :370}}
                                    selectedValue={this.state && this.state.Status}
                                    onValueChange={this._onValueChangeStatus.bind(this)}>
                                    {Status.map((i, index) => (
                                        <Picker.Item key={index} label={i.label} value={i.value} />))}
                                </Picker></View>
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
                                        <Text  style={{fontSize:16,paddingTop:12,paddingLeft:10}}>
                                            {start}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column',paddingLeft:5}}>
                                <View>
                                    <Text style = {{fontSize:16,fontWeight: 'bold'}}>End Date*</Text>
                                </View>
                                <View style={{borderWidth: 2, borderColor: 'black',height:50}}>
                                    <TouchableOpacity
                                        onPress = {this._onFocusEndDate}
                                    >
                                        <Text  style={{fontSize:16,paddingTop:12,paddingLeft:10}}>
                                            {end}
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