/*
 * @category Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
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
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

import { CHECKOUT_ACCOUNT } from './Header.config';

export {
    mapStateToProps,
    mapDispatchToProps,
    DEFAULT_HEADER_STATE
};

/** @namespace Scandipwa/Component/Header/Container */
export class HeaderContainer extends SourceHeaderContainer {
    // overridden to change the Account Button Path to my profile page instead of  account
    onMyAccountButtonClick() {
        const {
            showOverlay,
            setNavigationState,
            history
        } = this.props;

        if (isSignedIn()) {
            history.push({ pathname: appendWithStoreCode('my-profile') });

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

    // overridden to direct the user to a cart page instead of to open minicart
    onMinicartButtonClick() {
        history.push({ pathname: appendWithStoreCode('/cart') });
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderContainer));
