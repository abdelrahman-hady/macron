import { withRouter } from 'react-router-dom';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';
import { LoginAccountComponent as SourceLoginAccountComponent } from
'SourceRoute/LoginAccount/LoginAccount.component';

import './LoginAccount.override.style';

/** @namespace Scandipwa/Route/LoginAccount/Component */
export class LoginAccountComponent extends SourceLoginAccountComponent {
    renderSignInWrapper() {
        const { isMobile } = this.props;

        if (isMobile) {
            return this.renderSignIn();
        }

        return (
            <div block="LoginAccount" elem="SignInWrapper">
                <h3>{ __('Macron') }</h3>
                { this.renderSignIn() }
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
