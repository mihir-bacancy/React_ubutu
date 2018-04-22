import {ADD_PERSON} from '../constants';

const initialState = {people :[{fname:'',lname : '',add:'',city:''}]}
export default function peopleReducer(state = initialState,action){
    switch (action.type){
        case ADD_PERSON:
            return{
                people : [...state.people,action.person],
            };
        default:
            return state;
    }
}