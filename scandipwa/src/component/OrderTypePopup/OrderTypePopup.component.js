// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Popup from 'Component/Popup';

import { ORDER_TYPE_POPUP } from './OrderTypePopup.config';

import './OrderTypePopup.style';

/** @namespace Scandipwa/Component/OrderTypePopup/Component */
export class OrderTypePopupComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    renderContent() {
        return (
            <div block="Buttons">
                <h3>{ __('Choose the order type') }</h3>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                >
                    { __('Customer order') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
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
