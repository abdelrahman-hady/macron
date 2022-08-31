import { UPDATE_ORDER_TYPE } from './OrderType.action';

/** @namespace Scandipwa/Store/OrderType/Reducer/getInitialState */
export const getInitialState = () => ({
    orderType: ''
});

/** @namespace Scandipwa/Store/OrderType/Reducer/OrderTypeReducer */
export const OrderTypeReducer = (state = getInitialState(), action) => {
    switch (action.type) {
    case UPDATE_ORDER_TYPE:
        const { orderType } = action;

        return {
            ...state,
            orderType
        };

    default:
        return state;
    }
};

export default OrderTypeReducer;
