import * as ActionTypes from './ActionTypes';

export const Form = (state = InitialFeedback, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return state.concat(action.payload);
            
        default:
            return state;
    }
}

export const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
}