/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'SourceComponent/MyAccountOverlay/MyAccountOverlay.config';
import {
    CartPageContainer as SourceCartPageContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps
} from 'SourceRoute/CartPage/CartPage.container';
import { CHECKOUT_URL } from 'SourceRoute/Checkout/Checkout.config';
import { ACCOUNT_URL } from 'SourceRoute/MyAccount/MyAccount.config';
import { isSignedIn } from 'SourceUtil/Auth';
import { scrollToTop } from 'SourceUtil/Browser';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { showPopup } from 'Store/Popup/Popup.action';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

import { CONFIRM_DELETE_ORDER_POPUP } from './CartPage.config';

export {
    mapStateToProps
};

/** @namespace Scandipwa/Route/CartPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showDeleteOrderPopup: () => dispatch(showPopup(CONFIRM_DELETE_ORDER_POPUP))
});

/** @namespace Scandipwa/Route/CartPage/Container */
export class CartPageContainer extends SourceCartPageContainer {
    static propTypes = {
        ...super.propTypes,
        showDeleteOrderPopup: PropTypes.func.isRequired
    };

    containerProps() {
        const {
            showDeleteOrderPopup
        } = this.props;

        return {
            showDeleteOrderPopup,
            ...super.containerProps()
        };
    }

    isProductsQuantitySelected() {
        const { totals: { items = [] } = {} } = this.props;
        return items.some((item) => item.qty === DEFAULT_MAX_PRODUCTS);
    }

    onCheckoutButtonClick(e) {
        const {
            history,
            guest_checkout,
            showOverlay,
            showNotification,
            device,
            totals: { items = [] } = {}
        } = this.props;

        // to prevent outside-click handler trigger
        e.nativeEvent.stopImmediatePropagation();

        if (this.isProductsQuantitySelected()) {
            showNotification('info', __('Please select product quantity'));
            return;
        }

        if (this.hasOutOfStockProductsInCartItems(items)) {
            return;
        }

        if (guest_checkout) {
            history.push({
                pathname: appendWithStoreCode(CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        if (isSignedIn()) {
            history.push({
                pathname: appendWithStoreCode(CHECKOUT_URL)
            });
            scrollToTop();

            return;
        }

        // fir notification whatever device that is
        showNotification('info', __('Please sign-in to complete checkout!'));

        if (device.isMobile) { // for all mobile devices, simply switch route
            history.push({ pathname: appendWithStoreCode(ACCOUNT_URL) });

            return;
        }

        // for desktop, just open customer overlay
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);
