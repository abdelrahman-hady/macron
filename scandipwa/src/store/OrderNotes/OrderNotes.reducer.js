import { UPDATE_NOTES } from './OrderNotes.action';

/** @namespace Scandipwa/Store/OrderNotes/Reducer/getInitialState */
export const getInitialState = () => ({
    note: '',
    internalNote: ''
});

/** @namespace Scandipwa/Store/OrderNotes/Reducer/OrderNotesReducer */
export const OrderNotesReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case UPDATE_NOTES:
        const { payload: { note, internalNote } } = action;

        return {
            ...state,
            note,
            internalNote
        };

    default:
        return state;
    }
};

export default OrderNotesReducer;
