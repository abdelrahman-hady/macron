/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps,
    MyAccountSignInContainer as SourceMyAccountSignInContainer
} from
'SourceComponent/MyAccountSignIn/MyAccountSignIn.container';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

export const MyAccountDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/MyAccount/MyAccount.dispatcher'
);

/** @namespace Scandipwa/Component/MyAccountSignIn/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    logout: () => MyAccountDispatcher.then(
        ({ default: dispatcher }) => dispatcher.logout(false, true, dispatch)
    )
});

/** @namespace Scandipwa/Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends SourceMyAccountSignInContainer {
    static propTypes = {
        ...SourceMyAccountSignInContainer.propTypes,
        profileOverlay: PropTypes.bool,
        myProfileAction: PropTypes.func,
        getHelpAction: PropTypes.func,
        logoutAction: PropTypes.func,
        logout: PropTypes.func
    };

    static defaultProps = {
        ...SourceMyAccountSignInContainer.defaultProps,
        profileOverlay: false
    };

    containerProps() {
        const {
            profileOverlay
        } = this.props;

        return {
            ...super.containerProps,
            profileOverlay
        };
    }

    containerFunctions = {
        ...this.containerFunctions,
        myProfileAction: this.myProfileAction.bind(this),
        getHelpAction: this.getHelpAction.bind(this),
        logoutAction: this.logoutAction.bind(this)
    };

    myProfileAction() {
        history.push({ pathname: appendWithStoreCode('my-profile') });
    }

    getHelpAction() {
        history.push({ pathname: appendWithStoreCode('/') });
    }

    logoutAction() {
        const { logout } = this.props;
        this.setState({ isSignIn: false });
        history.push({ pathname: appendWithStoreCode('/') });
        logout();
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);
