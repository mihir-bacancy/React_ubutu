
import React, { Component } from 'react';
import { TextInput, TouchableOpacity, Text, View } from 'react-native';
import { createStore, combineReducers } from 'redux';

const todo = ( state, action ) => {
    switch ( action.type ) {
        case 'addTodo':
            return {
                id: action.id,
                text: action.text,
                completed: false,
            };
        case 'toggleTodo':
            if(state.id !== action.id){
                return state;
            }
            else{
                return {
                    ...state,
                    completed: !state.completed
                };
            }
        default:
            return state;
    }
};

const todos = ( state = [], action ) => {
    switch ( action.type ) {
        case 'addTodo':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'toggleTodo':
            return state.map( t => todo(t, action));
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos
});

let store = createStore(todoApp);

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            str: [],
            arr: [],
            nme: ''
        }
    }

    _enterTodo = (a) => {
        this.setState({
            nme: a,
        })
    };

    _showData = async () => {
        this.state.arr.push('a');
        await store.dispatch({type: 'addTodo', id: this.state.arr.length-1, text: this.state.nme});
        this.enterTodo.setNativeProps({text:''});
        this.setState({
            str: store.getState()
        });
    };

    _toggleTodo = async (txt) => {
        await store.dispatch({type: 'toggleTodo', id: txt.id});
        this.setState({
            str: await store.getState()
        });
    };

    render(){
        return(
            <View style={{padding: 20, backgroundColor: '#fff', flex: 1}}>

                <View>
                    <TextInput
                        placeholder={'Enter todo'}
                        ref={component => this.enterTodo = component}
                        onChangeText={(a) => this._enterTodo(a)}
                    />
                    <TouchableOpacity
                        onPress={this._showData}
                        style={{
                            borderRadius: 3,
                            borderColor: '#000',
                            alignItems: 'center',
                            borderWidth: .5,
                            width: 100,
                            backgroundColor: '#ddd'
                        }}
                    >
                        <Text>Add Todos</Text>
                    </TouchableOpacity>
                </View>

                <View style={{padding: 10, paddingTop: 10, borderWidth: .5}}>
                    {
                        (this.state.str.todos === undefined)
                            ? <Text/>
                            : this.state.str.todos.map((td) => {
                                return (
                                    <View style={{}}>
                                        <Text
                                            onPress={() => this._toggleTodo(td)}
                                            style={{
                                                textDecorationLine: (td.completed === true)
                                                    ? 'line-through'
                                                    : 'none'
                                            }}
                                        >
                                            {td.text}
                                        </Text>
                                    </View>
                                );
                            })
                    }
                </View>
            </View>
        );
    }
}

export default App;