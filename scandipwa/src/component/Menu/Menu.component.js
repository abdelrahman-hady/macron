import PropTypes from 'prop-types';

import OrderTypePopup from 'Component/OrderTypePopup';
import {
    Menu as SourceMenu
} from 'SourceComponent/Menu/Menu.component';
import { getSortedItems } from 'Util/Menu';

import './Menu.override.style.scss';

/** @namespace Scandipwa/Component/Menu/Component */
export class MenuComponent extends SourceMenu {
    static propTypes = {
        ...super.propTypes,
        showOrderTypePopup: PropTypes.func.isRequired
    };

    renderPopup() {
        return (
            <OrderTypePopup />
        );
    }

    renderNewOrderButton() {
        const { showOrderTypePopup } = this.props;
        return (
            <>
            <button
              block="Menu"
              elem="NewOrder"
              mix={ { block: 'Button', mods: { isHollow: true } } }
              onClick={ showOrderTypePopup }
            >
                { __('NEW ORDER') }
            </button>
            { this.renderPopup() }
            </>
        );
    }

    renderTopLevel() {
        const { menu } = this.props;
        const categoryArray = Object.values(menu);

        if (!categoryArray.length) {
            return null;
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
