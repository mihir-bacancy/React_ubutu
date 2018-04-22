import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import SignUp from './SignUp';
class AllValues extends React.Component{
    render (){
        return (
            <View>
               /* {
                    this.props.people.map((person,index)=>(
                        <View key = {index}>
                            <Text>Name : {person.fname}</Text>
                            <Text>Last NAme:{person.lname}</Text>

                        </View>

                    ))
                }*/

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

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AllValues)
