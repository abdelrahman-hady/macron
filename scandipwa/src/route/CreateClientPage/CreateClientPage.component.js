/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Form from 'Component/Form';
import Loader from 'Component/Loader';
import transformToNameValuePair from 'Util/Form/Transform';

import { CONTACTS_FIELDS, DETAILS_FIELDS } from './CreateClientPage.config';
import { createClientForm } from './CreateClientPage.form';

import './CreateClientPage.style.scss';

/** @namespace Scandipwa/Route/CreateClientPage/Component */
export class CreateClientPageComponent extends PureComponent {
    static propTypes = {
        selectItems: PropTypes.arrayOf(PropTypes.string).isRequired,
        onSave: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    onSubmit = this.onSubmit.bind(this);

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    get fieldMap() {
        const { selectItems } = this.props;

        return createClientForm({ selectItems });
    }

    renderHeading() {
        return (
            <h1>
                { __('Create new client') }
            </h1>
        );
    }

    renderField(field) {
        // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
        return <Field { ...field } />;
    }

    renderFields(type) {
        const { title, fields } = this.fieldMap[type];

        return (
            <>
                <h3>{ `${title}:` }</h3>
                { fields.map(this.renderField.bind(this)) }
            </>
        );
    }

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    onSubmit(_form, fields) {
        const { onSave } = this.props;
        const newClient = transformToNameValuePair(fields);

        onSave(newClient);
    }

    renderForm() {
        return (
            <Form onSubmit={ this.onSubmit }>
                <div block="CreateClientPage" elem="Fields">
                  { this.renderFields(DETAILS_FIELDS) }
                  { this.renderFields(CONTACTS_FIELDS) }
                </div>
                <button
                  type={ FIELD_TYPE.submit }
                  block="Button"
                  mix={ { block: 'MyAccount', elem: 'Button' } }
                  mods={ { isHollow: true } }
                >
                    { __('Create client') }
                </button>
            </Form>
        );
    }

    renderMainContent() {
        return (
            <ContentWrapper label="Create New Client Page">
                { this.renderHeading() }
                { this.renderForm() }
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="CreateClientPage">
                 <Loader isLoading={ isLoading } />
                { this.renderMainContent() }
            </div>
        );
    }
}

export default CreateClientPageComponent;
