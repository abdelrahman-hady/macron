/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateOrderType } from 'Store/CustomCartData/CustomCartData.action';
import { hideActivePopup } from 'Store/Overlay/Overlay.action';

import OrderTypePopup from './OrderTypePopup.component';

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateOrderType: (notes) => dispatch(updateOrderType(notes)),
    hideActivePopup: () => dispatch(hideActivePopup())
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container */
export class OrderTypePopupContainer extends PureComponent {
    static propTypes = {
        updateOrderType: PropTypes.func.isRequired,
        hideActivePopup: PropTypes.func.isRequired
    };

    containerFunctions = {
        handleClick: this.handleClick.bind(this)
    };

    handleClick(orderType) {
        const { updateOrderType, hideActivePopup } = this.props;
        updateOrderType(orderType);
        hideActivePopup();
    }

    render() {
        return (
            <OrderTypePopup
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTypePopupContainer);
