/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { withRouter } from 'react-router-dom';

import MyAccountSignIn from 'Component/MyAccountSignIn';
import { MyAccountOverlay as SourceMyAccountOverlay }
from 'SourceComponent/MyAccountOverlay/MyAccountOverlay.component';

import {
    STATE_CONFIRM_EMAIL,
    STATE_CREATE_ACCOUNT,
    STATE_FORGOT_PASSWORD,
    STATE_FORGOT_PASSWORD_SUCCESS,
    STATE_LOGGED_IN,
    STATE_SIGN_IN
} from './MyAccountOverlay.config';

/** @namespace Scandipwa/Component/MyAccountOverlay/Component */
// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
export class MyAccountOverlay extends SourceMyAccountOverlay {
    renderMap = {
        [STATE_SIGN_IN]: {
            render: () => this.renderSignIn(),
            title: __('Sign in to your account')
        },
        [STATE_FORGOT_PASSWORD]: {
            render: () => this.renderForgotPassword(),
            title: __('Get password link')
        },
        [STATE_FORGOT_PASSWORD_SUCCESS]: {
            render: () => this.renderForgotPasswordSuccess()
        },
        [STATE_CREATE_ACCOUNT]: {
            render: () => this.renderCreateAccount(),
            title: __('Create new account')
        },
        [STATE_LOGGED_IN]: {
            render: () => this.renderProfileOverlay()
        },
        [STATE_CONFIRM_EMAIL]: {
            render: () => this.renderConfirmEmail(),
            title: __('Confirm the email')
        }
    };

    renderProfileOverlay() {
        const {
            state,
            onFormError,
            handleForgotPassword,
            handleCreateAccount,
            isCheckout,
            setLoadingState,
            onSignIn
        } = this.props;

        return (
            <MyAccountSignIn
              state={ state }
              onFormError={ onFormError }
              handleForgotPassword={ handleForgotPassword }
              handleCreateAccount={ handleCreateAccount }
              isCheckout={ isCheckout }
              setLoadingState={ setLoadingState }
              onSignIn={ onSignIn }
              profileOverlay
            />
        );
    }
}
// eslint-disable-next-line @scandipwa/scandipwa-guidelines/derived-class-names
export default withRouter(MyAccountOverlay);
