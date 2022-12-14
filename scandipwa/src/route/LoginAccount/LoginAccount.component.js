/*
 * @category  Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { withRouter } from 'react-router-dom';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import StoreSwitcher from 'Component/StoreSwitcher';
import { LoginAccountComponent as SourceLoginAccountComponent } from
'SourceRoute/LoginAccount/LoginAccount.component';

import './LoginAccount.override.style';

/** @namespace Scandipwa/Route/LoginAccount/Component */
export class LoginAccountComponent extends SourceLoginAccountComponent {
    renderSignInWrapper() {
        return (
            <div block="LoginAccount" elem="SignInWrapper">
                { this.renderStoreSwitcher() }
                <h3>{ __('Macron') }</h3>
                { this.renderSignIn() }
            </div>
        );
    }

    renderStoreSwitcher() {
        return (
            <div block="LoginAccount" elem="Switcher">
                <StoreSwitcher />
            </div>
        );
    }

    render() {
        const {
            isLoading
        } = this.props;

        return (
            <ContentWrapper
              mix={ {
                  block: 'LoginAccount'
              } }
              label="Login page"
            >
                <div block="LoginAccount" elem="InnerWrapper">
                    <Loader isLoading={ isLoading } />
                    { this.renderSignInWrapper() }
                </div>
            </ContentWrapper>
        );
    }
}

export default withRouter(
    LoginAccountComponent
);
