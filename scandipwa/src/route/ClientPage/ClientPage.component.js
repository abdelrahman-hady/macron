/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import AddIcon from 'Component/AddIcon';
import ClientInfoTable from 'Component/ClientInfoTable';
import CloseIcon from 'Component/CloseIcon';
import ContentWrapper from 'Component/ContentWrapper';
import EditIcon from 'Component/EditIcon';
import Loader from 'Component/Loader';
import { ClientType } from 'Type/Client.type';

import { CONTACTS, DETAILS } from './ClientPage.config';

import './ClientPage.styles.scss';

/** @namespace Scandipwa/Route/ClientPage/Component */
export class ClientPageComponent extends PureComponent {
    static propTypes = {
        client: PropTypes.objectOf(ClientType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        onClickDelete: PropTypes.func.isRequired,
        onClickCreate: PropTypes.func.isRequired,
        onClickEdit: PropTypes.func.isRequired
    };

    dataMap = {
        [DETAILS]: [
            {
                key: 'address',
                label: __('Address')
            },
            {
                key: 'vat_number',
                label: __('VAT number')
            },
            {
                key: 'contract_expiracy_date',
                label: __('Contract')
            },
            {
                key: 'affiliation',
                label: __('Affiliation')
            },
            {
                key: 'sport',
                label: __('Sport')
            },
            {
                key: 'category',
                label: __('Category')
            },
            {
                key: 'primary_color',
                label: __('Primary color')
            },
            {
                key: 'secondary_color',
                label: __('Secondary color')
            },
            {
                key: 'current_brand',
                label: __('Current brand')
            },
            {
                key: 'coni_id',
                label: __('CONI ID')
            },
            {
                key: 'membership_no',
                label: __('Membership')
            },
            {
                key: 'distance',
                label: __('Distance from MS')
            }
        ],
        [CONTACTS]: [
            {
                key: 'contact_person',
                label: __('Contact person')
            },
            {
                key: 'mobile',
                label: __('Mobile')
            },
            {
                key: 'email',
                label: __('Email')
            }
        ]
    };

    renderHeading() {
        const { client: { company_name } } = this.props;

        return (
            <h1>
                { company_name }
            </h1>
        );
    }

    renderDetails() {
        const { client } = this.props;
        const { [DETAILS]: details } = this.dataMap;

        return <ClientInfoTable title={ __('Client details:') } data={ details } client={ client } />;
    }

    renderContacts() {
        const { client } = this.props;
        const { [CONTACTS]: contacts } = this.dataMap;

        return <ClientInfoTable title={ __('Contacts:') } data={ contacts } client={ client } />;
    }

    renderActions() {
        const { onClickDelete, onClickCreate, onClickEdit } = this.props;

        return (
            <div block="ClientPage" elem="Actions">
                <button block="Button" mods={ { isHollow: true } }>
                    { __('See quote history >') }
                </button>
                <button block="Button" mods={ { isHollow: true } } onClick={ onClickEdit }>
                      <EditIcon />
                    { __('Edit client') }
                </button>
                <button block="Button" mods={ { isHollow: true } } onClick={ onClickCreate }>
                    <AddIcon />
                    { __('Create new client') }
                </button>
                <button block="Button" mods={ { isHollow: true } } onClick={ onClickDelete }>
                    <CloseIcon />
                    { __('Delete client') }
                </button>
            </div>
        );
    }

    renderMainContent() {
        return (
            <ContentWrapper label="Client Page">
                { this.renderHeading() }
                <div block="ClientPage" elem="Content">
                    <div block="ClientPage" elem="Tables">
                        { this.renderDetails() }
                        { this.renderContacts() }
                    </div>
                    { this.renderActions() }
                </div>
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="ClientPage">
                <Loader isLoading={ isLoading } />
                { this.renderMainContent() }
            </main>
        );
    }
}

export default ClientPageComponent;
