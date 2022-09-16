/*
 * @category  Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import CartIcon from 'Component/CartIcon';
import {
    ORDER_CHOOSE_CUSTOMER_POPUP,
    TYPE_CUSTOMER
} from 'Component/OrderTypePopup/OrderTypePopup.config';
import {
    CartOverlay,
    Header as SourceHeader,
    MyAccountOverlay
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import './Header.style.override.scss';

export {
    CartOverlay,
    MyAccountOverlay
};

/** @namespace Scandipwa/Component/Header/Component */
export class HeaderComponent extends SourceHeader {
    static propTypes = {
        ...super.propTypes,
        orderType: PropTypes.string.isRequired,
        selectedCustomer: PropTypes.string.isRequired,
        showPopup: PropTypes.func.isRequired
    };

    renderActiveCustomer() {
        const { selectedCustomer, showPopup } = this.props;

        return (
            <div
              block="Header"
              elem="ActiveCustomer"
            >
                <span>{ __('Active customer') }</span>
                <div block="Header" elem="CustomerName">
                    { /* eslint-disable-next-line react/jsx-no-bind */ }
                    <button onClick={ () => showPopup(ORDER_CHOOSE_CUSTOMER_POPUP) }>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                            { /* eslint-disable-next-line max-len */ }
                            <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                        </svg>
                    </button>
                    <h4>{ selectedCustomer }</h4>
                </div>
            </div>
        );
    }

    renderDesktopIcons() {
        const { orderType } = this.props;

        return (
            <div
              block="Header"
              elem="IconsWrapper"
            >
                { orderType === TYPE_CUSTOMER && this.renderActiveCustomer() }
                { this.renderAccount() }
                { this.renderComparePageButton() }
                { this.renderMinicart() }
            </div>
        );
    }

    renderMinicartButton() {
        const {
            onMinicartButtonClick
        } = this.props;

        return (
            <button
              block="Header"
              elem="MinicartButtonWrapper"
              tabIndex="0"
              onClick={ onMinicartButtonClick }
              aria-label={ __('Cart') }
            >
                <CartIcon />
            </button>
        );
    }

    render() {
        if (isSignedIn()) {
            return super.render();
        }

        history.replace(appendWithStoreCode('/'));
        return null;
    }
}

export default HeaderComponent;
