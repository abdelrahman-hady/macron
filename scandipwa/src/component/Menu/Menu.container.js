/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    MenuContainer as SourceMenuContainer
} from 'SourceComponent/Menu/Menu.container';
import { showPopup } from 'Store/Popup/Popup.action';
import { TotalsType } from 'Type/MiniCart.type';

/** @namespace Scandipwa/Component/Menu/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    cartTotals: state.CartReducer.cartTotals
});

/** @namespace Scandipwa/Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showPopup: (type, payload) => dispatch(showPopup(type, payload))
});

/** @namespace Scandipwa/Component/Menu/Container */
export class MenuContainer extends SourceMenuContainer {
    static propTypes = {
        ...super.propTypes,
        showPopup: PropTypes.func.isRequired,
        cartTotals: TotalsType.isRequired
    };

    containerProps() {
        const { showPopup, cartTotals } = this.props;
        return {
            ...super.containerProps(),
            showPopup,
            cartTotals
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
