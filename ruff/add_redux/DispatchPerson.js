import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import home from './home';
class DispatchPerson extends React.Component{
    render (){
        return (
            <View>
                {
                    this.props.people.map((person,index)=>(
                        <View key = {index}>
                            <Text>Name : {person.name}</Text>
                            <Text>Last NAme:{person.lname}</Text>
                            <Text onPress = {() => this.deletePerson(person)}>Delete Person</Text>
                        </View>

                    ))
                }

            </View>
        )
    }
}
function mapStateToProps (state){
    return{
        people : state.people.people
    }
}
function mapDispatchToProps (dispatch){
    return{
        dispatchAddPerson : (person) => dispatch(addPerson(person)),
        dispatchdeletePerson : (person) => dispatch(deletePerson(person))
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DispatchPerson)
