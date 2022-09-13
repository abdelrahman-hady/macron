/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Popup from 'Component/Popup';
import { CONFIRM_DELETE_ORDER_POPUP } from 'Route/CartPage/CartPage.config';

/** @namespace Scandipwa/Component/ConfirmDeleteOrderPopup/Component */
export class ConfirmDeleteOrderPopupComponent extends PureComponent {
    static propTypes = {
        handleDeleteOrder: PropTypes.func.isRequired
    };

    renderPopupContent() {
        const { handleDeleteOrder } = this.props;
        return (
            <div block="Buttons">
                <h3><b>{ __('All the items added to the order will be lost') }</b></h3>
                <h3>{ __('Are you sure you want to start a new order?') }</h3>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                >
                    { __('Add to quote and continue') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ handleDeleteOrder }
                >
                    { __('Yes, start a new order') }
                </button>
            </div>
        );
    }

    render() {
        return (
            <div block="ConfirmDeleteOrderPopup">
                <Popup
                  id={ CONFIRM_DELETE_ORDER_POPUP }
                  clickOutside={ false }
                  mix={ { block: 'OrderDeletePopup' } }
                >
                    { this.renderPopupContent() }
                </Popup>
            </div>
        );
    }
}

export default ConfirmDeleteOrderPopupComponent;
