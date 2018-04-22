import {ADD_PERSON} from './Constant';

const initialState = {people :[{fname:'hetali',lname:'shah',add:'narnpura',city:'ahmedabad'}]}
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
