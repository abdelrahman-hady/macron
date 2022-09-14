/*
 * @category  Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

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
    static propTypes = {
        ...SourceMyAccountSignInComponent.propTypes,
        profileOverlay: PropTypes.bool,
        myProfileAction: PropTypes.func,
        getHelpAction: PropTypes.func,
        logoutAction: PropTypes.func
    };

    renderProfileOverlay() {
        const {
            myProfileAction,
            getHelpAction,
            logoutAction
        } = this.props;

        return (
            <div
              block="MyAccountOverlay"
              elem="ProfileOverlay"
            >
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
                <span onClick={ myProfileAction }>{ __('My Profile') }</span>
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
                <span onClick={ getHelpAction }>{ __('Help') }</span>
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
                <span onClick={ logoutAction }>{ __('Logout') }</span>
            </div>
        );
    }

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

    render() {
        const { profileOverlay } = this.props;
        if (profileOverlay) {
            return this.renderProfileOverlay();
        }

        return (
            <>
                { this.renderSignInForm() }
                { this.renderAdditionalField() }
            </>
        );
    }
}

export default MyAccountSignInComponent;
