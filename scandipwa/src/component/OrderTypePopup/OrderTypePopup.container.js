/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateOrderType } from 'Store/CustomCartData/CustomCartData.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';

// import history from 'Util/History';
import OrderTypePopup from './OrderTypePopup.component';
// import { ORDER_CHOOSE_CUSTOMER_POPUP, TYPE_CUSTOMER, TYPE_REPLENISHMENT } from './OrderTypePopup.config';
import { ORDER_CHOOSE_CUSTOMER_POPUP } from './OrderTypePopup.config';

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateOrderType: (notes) => dispatch(updateOrderType(notes)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showPopup: (payload) => dispatch(showPopup(ORDER_CHOOSE_CUSTOMER_POPUP, payload))
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container */
export class OrderTypePopupContainer extends PureComponent {
    static propTypes = {
        updateOrderType: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        addProductToCart: PropTypes.func
    };

    static defaultProps = {
        addProductToCart: null
    };

    state = {
        renderStep: 'first'
    };

    containerFunctions = {
        handleCustomerClick: this.handleCustomerClick.bind(this),
        handleReplenishmentClick: this.handleReplenishmentClick.bind(this)
    };

    containerProps = () => {
        const { renderStep } = this.state;

        return {
            renderStep
        };
    };

    handleCustomerClick() {
        showPopup();

        // const { updateOrderType, hideActiveOverlay, addProductToCart } = this.props;
        // updateOrderType(orderType);
        // hideActiveOverlay();
        // history.goBack();

        // if (addProductToCart) {
        //     addProductToCart();
        // }
    }

    handleReplenishmentClick() {

    }

    render() {
        return (
            <OrderTypePopup
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTypePopupContainer);
