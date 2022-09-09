/*
 * @category  Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { CUSTOMER_ACCOUNT_OVERLAY_KEY } from 'Component/MyAccountOverlay/MyAccountOverlay.config';
import {
    DEFAULT_HEADER_STATE,
    HeaderContainer as SourceHeaderContainer,
    mapDispatchToProps,
    mapStateToProps
} from 'SourceComponent/Header/Header.container';
import { isSignedIn } from 'Util/Auth';

import { CHECKOUT_ACCOUNT, CUSTOMER_ACCOUNT } from './Header.config';

export {
    mapStateToProps,
    mapDispatchToProps,
    DEFAULT_HEADER_STATE
};

/** @namespace Scandipwa/Component/Header/Container */
export class HeaderContainer extends SourceHeaderContainer {
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
                    title: 'Logged in',
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
