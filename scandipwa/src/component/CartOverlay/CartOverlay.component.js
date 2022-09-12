/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { CartOverlay as SourceCartOverlayComponent } from 'SourceComponent/CartOverlay/CartOverlay.component';

/** @namespace Scandipwa/Component/CartOverlay/Component */
export class CartOverlayComponent extends SourceCartOverlayComponent {
    renderNoCartItems() {
        return (
            <p block="CartOverlay" elem="Empty">
                { __('Your cart is empty, select products to create an order.') }
            </p>
        );
    }
}
export default CartOverlayComponent;
