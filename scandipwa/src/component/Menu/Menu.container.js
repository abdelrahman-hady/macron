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
