/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Popup from 'Component/Popup';

import { ORDER_TYPE_POPUP, TYPE_CUSTOMER, TYPE_REPLENISHMENT } from './OrderTypePopup.config';

import './OrderTypePopup.style';

/** @namespace Scandipwa/Component/OrderTypePopup/Component */
export class OrderTypePopupComponent extends PureComponent {
    static propTypes = {
        handleClick: PropTypes.func.isRequired
    };

    renderContent() {
        const { handleClick } = this.props;
        return (
            <div block="Buttons">
                <h3>{ __('Choose the order type') }</h3>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleClick(TYPE_CUSTOMER) }
                >
                    { __('Customer order') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={ () => handleClick(TYPE_REPLENISHMENT) }
                >
                    { __('Replenishment order') }
                </button>
            </div>
        );
    }

    render() {
        return (
            <div block="OrderTypePopup">
                <Popup
                  id={ ORDER_TYPE_POPUP }
                  clickOutside={ false }
                  mix={ { block: 'OrderTypePopup' } }
                >
                { this.renderContent() }
                </Popup>
            </div>
        );
    }
}

export default OrderTypePopupComponent;
