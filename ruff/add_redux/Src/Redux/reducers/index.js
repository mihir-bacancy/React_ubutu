import {combineReducers} from 'redux';
import people from './people';
import {reducer as formreducer} from 'redux-form';
const rootReducer = combineReducers({
    people,
    form : formreducer
})
export default rootReducer;