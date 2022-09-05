/*
 * @category Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { MyAccountSignIn as SourceMyAccountSignInComponent } from
'SourceComponent/MyAccountSignIn/MyAccountSignIn.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

import VisibilityIcon from '../VisibilityIcon/VisibilityIcon.component';

import './MyAccountSignIn.override.style';

/** @namespace Scandipwa/Component/MyAccountSignIn/Component */
export class MyAccountSignInComponent extends SourceMyAccountSignInComponent {
    renderSignInForm() {
        const {
            onSignInSuccess,
            onFormError,
            handleForgotPassword,
            emailValue,
            isCheckout,
            handleEmailInput,
            isLoading,
            onPasswordVisibilityClick,
            visibilityState
        } = this.props;

        return (
            <Form
              key="sign-in"
              onSubmit={ onSignInSuccess }
              onError={ onFormError }
            >
                <Field
                  label={ __('Email') }
                  type={ FIELD_TYPE.email }
                  attr={ {
                      id: 'email',
                      name: 'email',
                      placeholder: __('Your email address'),
                      defaultValue: emailValue,
                      autocomplete: isCheckout ? 'off' : 'email'
                  } }
                  validateOn={ ['onChange'] }
                  validationRule={ {
                      isRequired: true,
                      inputType: VALIDATION_INPUT_TYPE.email
                  } }
                  events={ { onChange: handleEmailInput } }
                  addRequiredTag
                />
                <div id="InputIconWrapper">
                    <Field
                      label={ __('Password') }
                      type={ visibilityState ? FIELD_TYPE.text : FIELD_TYPE.password }
                      attr={ {
                          id: 'password',
                          name: 'password',
                          placeholder: __('Enter your password'),
                          autocomplete: 'current-password'
                      } }
                      validateOn={ ['onChange'] }
                      validationRule={ {
                          isRequired: true,
                          inputType: VALIDATION_INPUT_TYPE.password
                      } }
                      addRequiredTag
                    />
                    <VisibilityIcon onClick={ onPasswordVisibilityClick } isVisible={ visibilityState } />
                </div>
                <button
                  type="button"
                  block="Button"
                  mods={ { likeLink: true } }
                  mix={ { block: 'MyAccountOverlay', elem: 'ForgotPassword' } }
                  onClick={ handleForgotPassword }
                >
                    { __('Forgot password?') }
                </button>
                <div block="MyAccountOverlay" elem="SignInButton">
                    <button block="Button">{ __('Log In') }</button>
                </div>
                <Loader isLoading={ isLoading } />
            </Form>
        );
    }
}

export default MyAccountSignInComponent;
