import {ADD_PERSON} from './constants';
export function addPerson(person){
    return {
        type : 'ADD_PERSON',
        person,
    };
}
