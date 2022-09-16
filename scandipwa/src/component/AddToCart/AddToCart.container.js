/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ORDER_TYPE_POPUP_ADD_TO_CART } from 'Component/OrderTypePopup/OrderTypePopup.config';
import {
    AddToCartContainer as SourceAddToCartContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/AddToCart/AddToCart.container';
import { showPopup } from 'Store/Popup/Popup.action';

/** @namespace Scandipwa/Component/AddToCart/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    orderType: state.CustomCartDataReducer.orderType
});

/** @namespace Scandipwa/Component/AddToCart/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showOrderTypePopup: (payload) => dispatch(showPopup(ORDER_TYPE_POPUP_ADD_TO_CART, payload))
});

/** @namespace Scandipwa/Component/AddToCart/Container */
export class AddToCartContainer extends SourceAddToCartContainer {
    static propTypes = {
        ...super.propTypes,
        orderType: PropTypes.string.isRequired,
        showOrderTypePopup: PropTypes.func.isRequired
    };

    handleButtonClick(e) {
        const { withLink, orderType, showOrderTypePopup } = this.props;

        if (orderType === '') {
            showOrderTypePopup();
            return;
        }

        // Prevent container Link from triggering redirect
        if (!withLink) {
            e.stopPropagation();
            e.preventDefault();
        }

        this.addProductToCart();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartContainer);
