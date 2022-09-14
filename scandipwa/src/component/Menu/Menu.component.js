/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import ConfirmDeleteOrderPopupComponent from 'Component/ConfirmDeleteOrderPopup';
import OrderTypePopup from 'Component/OrderTypePopup';
import { ORDER_TYPE_POPUP } from 'Component/OrderTypePopup/OrderTypePopup.config';
import { CONFIRM_DELETE_ORDER_POPUP } from 'Route/CartPage/CartPage.config';
import {
    Menu as SourceMenu
} from 'SourceComponent/Menu/Menu.component';
import { TotalsType } from 'Type/MiniCart.type';
import { getSortedItems } from 'Util/Menu';

import './Menu.override.style.scss';

/** @namespace Scandipwa/Component/Menu/Component */
export class MenuComponent extends SourceMenu {
    static propTypes = {
        ...super.propTypes,
        showPopup: PropTypes.func.isRequired,
        cartTotals: TotalsType.isRequired
    };

    renderPopups() {
        return (
            <>
                <OrderTypePopup />
                <ConfirmDeleteOrderPopupComponent
                  isOrderType
                />
            </>
        );
    }

    renderNewOrderButton() {
        const { showPopup, cartTotals } = this.props;

        return (
            <>
            <button
              block="Menu"
              elem="NewOrder"
              mix={ { block: 'Button', mods: { isHollow: true } } }
              // eslint-disable-next-line react/jsx-no-bind
              onClick={ () => (
                  cartTotals.items.length ? showPopup(CONFIRM_DELETE_ORDER_POPUP) : showPopup(ORDER_TYPE_POPUP)
              ) }
            >
                { __('NEW ORDER') }
            </button>
            { this.renderPopups() }
            </>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return (
                <div block="Menu" elem="MainCategories">
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                    >
                        { this.renderNewOrderButton() }
                    </ul>
                </div>
            );
        }

        const [{ children, title: mainCategoriesTitle }] = categoryArray;
        const childrenArray = getSortedItems(Object.values(children));

        return (
            <>
                <div block="Menu" elem="MainCategories">
                    { this.renderAdditionalInformation(true) }
                    <ul
                      block="Menu"
                      elem="ItemList"
                      mods={ { type: 'main' } }
                      aria-label={ mainCategoriesTitle }
                    >
                        { childrenArray.map(this.renderFirstLevel.bind(this)) }
                        { this.renderNewOrderButton() }
                    </ul>
                </div>
                { this.renderSubMenuDesktop(children) }
            </>
        );
    }
}

export default MenuComponent;
