import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import { MyAccountSignIn as SourceMyAccountSignInComponent } from
'SourceComponent/MyAccountSignIn/MyAccountSignIn.component';
import { VALIDATION_INPUT_TYPE } from 'Util/Validator/Config';

// import VisibleIcon from '../../../public/svg/Visible.icon.svg';
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
            onPasswordVisibilityClick
        } = this.props;

        console.log(onPasswordVisibilityClick);
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
                  type={ FIELD_TYPE.password }
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
                <VisibilityIcon onClick={ onPasswordVisibilityClick } />
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
