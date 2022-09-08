/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Popup from 'Component/Popup';

import { ORDER_CHOOSE_CUSTOMER_POPUP, ORDER_TYPE_POPUP } from './OrderTypePopup.config';

import './OrderTypePopup.style';

/** @namespace Scandipwa/Component/OrderTypePopup/Component */
export class OrderTypePopupComponent extends PureComponent {
    static propTypes = {
        handleCustomerClick: PropTypes.func.isRequired,
        handleReplenishmentClick: PropTypes.func.isRequired,
        renderStep: PropTypes.string.isRequired
    };

    renderFirstStep() {
        const { handleCustomerClick, handleReplenishmentClick } = this.props;
        return (
            <div block="Buttons">
                <h3>{ __('Choose the order type') }</h3>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ handleCustomerClick }
                >
                    { __('Customer order') }
                </button>
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ handleReplenishmentClick }
                >
                    { __('Replenishment order') }
                </button>
            </div>
        );
    }

    renderCustomerOrderStep() {
        return (
            <Popup
              id={ ORDER_CHOOSE_CUSTOMER_POPUP }
              clickOutside={ false }
              mix={ { block: 'OrderTypePopup' } }
            >
                <div block="Buttons">
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                //   onClick={ handleClick }
                >
                    { __('< Go back') }
                </button>
                <Field
                  type={ FIELD_TYPE.select }
                  label={ __('Sort by status') }
                  mix={ { block: 'MyAccountMyOrders', elem: 'SortByStatus' } }
                //   options={ statusOptions }
                //   value={ orderStatus }
                //   events={ {
                //       onChange: (val) => {
                //           updateOptions({ orderStatus: val });
                //       }
                //   } }
                />
                </div>
            </Popup>
        );
    }

    renderContent() {
        const { renderStep } = this.props;

        if (renderStep === 'first') {
            return this.renderFirstStep();
        }

        if (renderStep === 'customerOrderStep') {
            return this.renderCustomerOrderStep();
        }

        return null;
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
