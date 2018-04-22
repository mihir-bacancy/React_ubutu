import {combineReducers} from 'redux';
import {reducer as formreducer} from 'redux-form';
const rootReducer = combineReducers({
    form : formreducer
})
export default rootReducer;