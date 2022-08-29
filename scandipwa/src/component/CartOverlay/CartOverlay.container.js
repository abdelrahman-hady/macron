import { connect } from 'react-redux';

import {
    CartOverlayContainer as SourceCartOverlayContainer,
    mapDispatchToProps,
    mapStateToProps
} from 'SourceComponent/CartOverlay/CartOverlay.container';
import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'SourceComponent/MyAccountOverlay/MyAccountOverlay.config';
import { CHECKOUT_URL } from 'SourceRoute/Checkout/Checkout.config';
import { isSignedIn } from 'SourceUtil/Auth';
import { scrollToTop } from 'SourceUtil/Browser';
import history from 'SourceUtil/History';
import { appendWithStoreCode } from 'SourceUtil/Url';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/CartOverlay/Container */
export class CartOverlayContainer extends SourceCartOverlayContainer {
    isProductsQuantitySelected() {
        const { totals } = this.props;
        return totals.items.some((item) => item.qty === DEFAULT_MAX_PRODUCTS);
    }

    handleCheckoutClick(e) {
        const {
            guest_checkout,
            showOverlay,
            showNotification,
            setNavigationState,
            hideActiveOverlay,
            totals
        } = this.props;

        // to prevent outside-click handler trigger
        e.nativeEvent.stopImmediatePropagation();

        const hasOutOfStockProductsInCart = this.hasOutOfStockProductsInCartItems(totals.items);

        if (this.isProductsQuantitySelected()) {
            showNotification('info', __('Please select product quantity'));
            return;
        }

        if (hasOutOfStockProductsInCart) {
            showNotification('error', __('Cannot proceed to checkout. Remove out of stock products first.'));
            e.preventDefault();

            return;
        }

        // Guest checkout enabled or user is signed in => proceed to the checkout
        if (guest_checkout || isSignedIn()) {
            hideActiveOverlay();
            history.push({ pathname: appendWithStoreCode(CHECKOUT_URL) });
            scrollToTop();

            return;
        }

        // there is no mobile, as cart overlay is not visible here
        showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
        showNotification('info', __('Please sign-in to complete checkout!'));
        setNavigationState({ name: CUSTOMER_ACCOUNT_OVERLAY_KEY, title: 'Sign in' });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlayContainer);
