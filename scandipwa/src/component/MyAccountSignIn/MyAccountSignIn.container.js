/*
 * @category Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps, MyAccountSignInContainer as SourceMyAccountSignInContainer } from
'SourceComponent/MyAccountSignIn/MyAccountSignIn.container';

/** @namespace Scandipwa/Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends SourceMyAccountSignInContainer {
    state = {
        ...super.state,
        isPasswordVisible: false
    };

     containerFunctions = {
         onSignInSuccess: this.onSignInSuccess.bind(this),
         onPasswordVisibilityClick: this.onPasswordVisibilityClick.bind(this)
     };

     containerProps() {
         const {
             state,
             onFormError,
             handleForgotPassword,
             handleCreateAccount,
             isCheckout,
             setLoadingState,
             emailValue,
             handleEmailInput,
             isLoading
         } = this.props;

         const visibilityState = this.state.isPasswordVisible;

         return {
             state,
             onFormError,
             handleForgotPassword,
             handleCreateAccount,
             isCheckout,
             setLoadingState,
             emailValue,
             handleEmailInput,
             isLoading,
             visibilityState
         };
     }

     onPasswordVisibilityClick(e) {
         e.preventDefault();
         e.stopPropagation();
         // check is made to prevent action trigger on Enter press
         if (e.target.type !== 'button') {
             this.setState({ ...this.state, isPasswordVisible: !this.state.isPasswordVisible });
         }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);