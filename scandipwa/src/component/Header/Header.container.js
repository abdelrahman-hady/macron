/*
 * @category  Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import {
    DEFAULT_HEADER_STATE,
    HeaderContainer as SourceHeaderContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/Header/Header.container';
import { showPopup } from 'Store/Popup/Popup.action';
import { isSignedIn } from 'Util/Auth';

import { CHECKOUT_ACCOUNT, CUSTOMER_ACCOUNT } from './Header.config';

export {
    DEFAULT_HEADER_STATE
};

/** @namespace Scandipwa/Component/Header/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    orderType: state.CustomCartDataReducer.orderType,
    selectedCustomer: state.CustomCartDataReducer.selectedCustomer
});

/** @namespace Scandipwa/Component/Header/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showPopup: (type, payload) => dispatch(showPopup(type, payload))
});

/** @namespace Scandipwa/Component/Header/Container */
export class HeaderContainer extends SourceHeaderContainer {
    static propTypes = {
        ...super.propTypes,
        orderType: PropTypes.string.isRequired,
        selectedCustomer: PropTypes.string.isRequired,
        showPopup: PropTypes.func.isRequired
    };

    containerProps() {
        const { orderType, selectedCustomer, showPopup } = this.props;

        return {
            ...super.containerProps(),
            orderType,
            selectedCustomer,
            showPopup
        };
    }

    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState
        } = this.props;

        if (isSignedIn()) {
            this.setState({ showMyAccountLogin: true }, () => {
                showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
                setNavigationState({
                    name: CUSTOMER_ACCOUNT,
                    title: __('Logged in'),
                    onCloseClick: this.closeOverlay
                });
            });

            return;
        }

        this.setState({ showMyAccountLogin: true }, () => {
            showOverlay(CUSTOMER_ACCOUNT_OVERLAY_KEY);
            setNavigationState({
                name: CHECKOUT_ACCOUNT,
                title: 'Sign in',
                onCloseClick: this.closeOverlay
            });
        });
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
