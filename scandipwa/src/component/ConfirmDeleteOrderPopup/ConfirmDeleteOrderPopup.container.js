/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { ORDER_TYPE_POPUP } from 'Component/OrderTypePopup/OrderTypePopup.config';
import { updateTypeAndCustomerSelect } from 'Store/CustomCartData/CustomCartData.action';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';

import ConfirmDeleteOrderPopup from './ConfirmDeleteOrderPopup.component';

export const CartDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Cart/Cart.dispatcher'
);

/** @namespace Scandipwa/Component/ConfirmDeleteOrderPopup/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/ConfirmDeleteOrderPopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    clearCart: () => CartDispatcher.then(
        ({ default: dispatcher }) => dispatcher.clearCart(dispatch)
    ),
    updateTypeAndCustomerSelect: (payload) => dispatch(updateTypeAndCustomerSelect(payload)),
    hideActivePopup: () => dispatch(hideActivePopup()),
    showPopup: (type, payload) => dispatch(showPopup(type, payload))
});

/** @namespace Scandipwa/Component/ConfirmDeleteOrderPopup/Container */
export class ConfirmDeleteOrderPopupContainer extends PureComponent {
    static propTypes = {
        clearCart: PropTypes.func.isRequired,
        updateTypeAndCustomerSelect: PropTypes.func.isRequired,
        hideActivePopup: PropTypes.func.isRequired,
        isOrderType: PropTypes.bool,
        showPopup: PropTypes.func.isRequired
    };

    static defaultProps = {
        isOrderType: false
    };

    containerFunctions = {
        handleDeleteOrder: this.handleDeleteOrder.bind(this)
    };

    async handleDeleteOrder() {
        const {
            clearCart, updateTypeAndCustomerSelect, hideActivePopup, showPopup, isOrderType
        } = this.props;

        try {
            hideActivePopup();
            await clearCart();
        } finally {
            updateTypeAndCustomerSelect({ orderType: '', selectedCustomer: '' });

            if (isOrderType) {
                showPopup(ORDER_TYPE_POPUP);
            }
        }
    }

    render() {
        return (
            <ConfirmDeleteOrderPopup
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDeleteOrderPopupContainer);
