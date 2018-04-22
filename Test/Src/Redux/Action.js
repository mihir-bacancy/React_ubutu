import {ADD_PERSON} from './Constant';
export function addPerson(person) {
    return{
        type : 'ADD_PERSON',
        person,
    };
}
