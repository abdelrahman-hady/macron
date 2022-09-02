/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import OrderTypePopup from 'Component/OrderTypePopup';
import {
    AddToCart as SourceAddToCart
} from 'SourceComponent/AddToCart/AddToCart.component';

/** @namespace Scandipwa/Component/AddToCart/Component */
export class AddToCartComponent extends SourceAddToCart {
    render() {
        const {
            mix,
            layout,
            isDisabled,
            isAdding,
            handleButtonClick,
            addProductToCart
        } = this.props;

        return (
            <>
            <button
              onClick={ handleButtonClick }
              block="Button AddToCart"
              mix={ mix }
              mods={ { layout } }
              disabled={ isDisabled || isAdding }
            >
                { this.renderCartIcon() }
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                <span>{ isAdding ? __('Adding...') : __('Add to cart') }</span>
            </button>
            <OrderTypePopup
              addProductToCart={ addProductToCart }
            />
            </>
        );
    }
}

export default AddToCartComponent;
