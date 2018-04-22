import {
    NOTIFICATION_PUSH,
    NOTIFICATION_POP,
    CURRENT_USER_SET,
    LOADER_SET,
    LAST_ACTION_SET
} from "ReduxActions";

export const toast = (state = [], action) => {
    switch (action.type) {
        case NOTIFICATION_PUSH:
            return [...state, action.text];

        case NOTIFICATION_POP:
            return state.length > 0 ? state.slice(1) : state;

        default:
            return state;
    }
};

export const currentUser = (state = null, action) => {
    switch (action.type) {
        case CURRENT_USER_SET:
            return action.user;

        default:
            return state;
    }
};

export const loader = (state = {}, action) => {
    switch (action.type) {
        case LOADER_SET:
            return action.state;

        default:
            return false;
    }
};

export const lastAction = (state = null, action) => {
    switch (action.type) {
        case LAST_ACTION_SET:
            return action.state;

        default:
            return state;
    }
};
