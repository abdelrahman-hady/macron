/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ORDER_TYPE_POPUP } from 'Component/OrderTypePopup/OrderTypePopup.config';
import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MenuContainer as SourceMenuContainer
} from 'SourceComponent/Menu/Menu.container';
import { showPopup } from 'Store/Popup/Popup.action';

export {
    mapStateToProps
};

/** @namespace Scandipwa/Component/Menu/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showOrderTypePopup: (payload) => dispatch(showPopup(ORDER_TYPE_POPUP, payload))
});

/** @namespace Scandipwa/Component/Menu/Container */
export class MenuContainer extends SourceMenuContainer {
    static propTypes = {
        ...super.propTypes,
        showOrderTypePopup: PropTypes.func.isRequired
    };

    containerProps() {
        const { showOrderTypePopup } = this.props;
        return {
            ...super.containerProps(),
            showOrderTypePopup
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
