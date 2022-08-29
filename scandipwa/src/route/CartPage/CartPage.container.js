import { connect } from 'react-redux';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'SourceComponent/MyAccountOverlay/MyAccountOverlay.config';
import {
    CartPageContainer as SourceCartPageContainer,
    mapDispatchToProps,
    mapStateToProps
} from 'SourceRoute/CartPage/CartPage.container';
import { CHECKOUT_URL } from 'SourceRoute/Checkout/Checkout.config';
import { ACCOUNT_URL } from 'SourceRoute/MyAccount/MyAccount.config';
import { isSignedIn } from 'SourceUtil/Auth';
import { scrollToTop } from 'SourceUtil/Browser';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Route/CartPage/Container */
export class CartPageContainer extends SourceCartPageContainer {
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
