/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import CartItem from 'Component/CartItem';
import ClientDetails from 'Component/ClientDetails';
import ConfirmDeleteOrderPopupComponent from 'Component/ConfirmDeleteOrderPopup';
import Loader from 'Component/Loader';
import {
    CartPage as SourceCartPage
} from 'SourceRoute/CartPage/CartPage.component';

/** @namespace Scandipwa/Route/CartPage/Component */
export class CartPageComponent extends SourceCartPage {
    static propTypes = {
        ...super.propTypes,
        showDeleteOrderPopup: PropTypes.func.isRequired
    };

    renderClientDetails() {
        const { totals: { items } } = this.props;
        return (
            items.length && <ClientDetails />
        );
    }

    renderCartItems() {
        const {
            totals: {
                items,
                quote_currency_code
            },
            onCartItemLoading,
            isInitialLoad
        } = this.props;

        if (!items || isInitialLoad) {
            return (
                <div block="CartPage" elem="InitialLoaderContainer">
                    <Loader isLoading />
                </div>
            );
        }

        if (!items.length) {
            return (
                <p block="CartPage" elem="Empty">{ __('Your cart is empty, select products to create an order.') }</p>
            );
        }

        return (
            <>
                <p block="CartPage" elem="TableHead" aria-hidden>
                    <span>{ __('item') }</span>
                    <span>{ __('quantity') }</span>
                    <span>{ __('subtotal') }</span>
                </p>
                <div block="CartPage" elem="Items" aria-label="List of items in cart">
                    { items.map((item) => (
                        <CartItem
                          key={ item.item_id }
                          item={ item }
                          currency_code={ quote_currency_code }
                          onCartItemLoading={ onCartItemLoading }
                          showLoader
                          isEditing
                          updateCrossSellsOnRemove
                        />
                    )) }
                </div>
            </>
        );
    }

    renderDeleteOrder() {
        const { totals: { items }, showDeleteOrderPopup } = this.props;
        return (
            items.length && (
                <div block="CartPage" elem="DeleteOrder">
                    <button block="Button" onClick={ showDeleteOrderPopup }>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="white"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                        { /* eslint-disable-next-line max-len */ }
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        { /* eslint-disable-next-line max-len */ }
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                        { __('delete order') }
                    </button>
                    <ConfirmDeleteOrderPopupComponent />
                </div>
            )
        );
    }

    renderDesktop() {
        return (
            <>
                <div block="CartPage" elem="Static">
                    { this.renderHeading() }
                    { this.renderClientDetails() }
                    { this.renderDeleteOrder() }
                    { this.renderCartItems() }
                    { this.renderDiscountCode() }
                </div>
                { this.renderTotalsSection() }
            </>
        );
    }

    renderMobile() {
        return (
            <div block="CartPage" elem="Static">
                { this.renderHeading() }
                { this.renderClientDetails() }
                { this.renderDeleteOrder() }
                { this.renderCartItems() }
                <div block="CartPage" elem="Floating">
                    { this.renderTotals() }
                </div>
                { this.renderDiscountCode() }
                { this.renderPromo() }
            </div>
        );
    }
}

export default CartPageComponent;
