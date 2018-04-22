import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
class DispatchPerson extends React.Component{
    render (){
        console.warn('in render>>',this.props.people);
        return (
            <View>
                {
                    this.props.people.map((person,index)=>(
                        <View key = {index}>
                            <Text>Name : {person.firstname}</Text>
                            <Text>Last Name:{person.lastname}</Text>
                            <Text>Address : {person.address}</Text>
                            <Text>City:{person.city}</Text>
                        </View>

                    ))
                }

            </View>
        )
    }
}
function mapStateToProps (state){
    return{
        people : state.people.people ? state.people.people : null
    }
}
function mapDispatchToProps (dispatch){
    return{
        dispatchAddPerson : (person) => dispatch(addPerson(person)),
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DispatchPerson)
