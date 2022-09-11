/*
 * @category  Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import CartIcon from 'Component/CartIcon';
import {
    CartOverlay,
    Header as SourceHeader,
    MyAccountOverlay
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';

export {
    CartOverlay,
    MyAccountOverlay
};

/** @namespace Scandipwa/Component/Header/Component */
export class HeaderComponent extends SourceHeader {
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
        if (!isSignedIn() && location.pathname !== '/') {
            history.replace('/');
        }

        return super.render();
    }
}

export default HeaderComponent;
