/*
 * @category Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { CustomerType } from 'Type/Account.type';

import './MyProfilePage.style.scss';

/** @namespace Scandipwa/Route/MyProfilePage/Component */
export class MyProfilePageComponent extends PureComponent {
    static propTypes = {
        customer: CustomerType.isRequired,
        isAllAddressesShown: PropTypes.bool.isRequired,
        showAllAddresses: PropTypes.func.isRequired,
        accountmanageremail: PropTypes.string.isRequired
    };
    // eslint-disable-next-line lines-between-class-members
    renderTitle() {
        const {
            customer: { company_name }
        } = this.props;

        if (!company_name) {
            return null;
        }

        return <h1>{ company_name }</h1>;
    }

    renderAddressItem(address) {
        if (!address) {
            return null;
        }
        const { street, country_id, city } = address;
        return `${street[0]} ${city} ${country_id} `;
    }

    renderInvoicingBlock() {
        const {
            customer: { addresses = [] }
        } = this.props;
        const defaultBillingAddress = addresses.filter(
            (address) => address.default_billing
        )[0];

        return (
            <div>
                <h2>{ __('Invoicing address') }</h2>
                <p>{ this.renderAddressItem(defaultBillingAddress) }</p>
            </div>
        );
    }

    renderAddressBlock() {
        const {
            customer: { addresses = [] },
            showAllAddresses,
            isAllAddressesShown
        } = this.props;
        const defaultShippingAddresses = addresses.filter(
            (address) => !address.default_billing
        );
        const addressesCount = defaultShippingAddresses.length;
        const minNumberOfAddresses = 3;
        const numberOfAddressesShown = !isAllAddressesShown
            ? minNumberOfAddresses
            : defaultShippingAddresses.length;

        return (
            <div>
                <h2>{ __('Delivery address') }</h2>
                { defaultShippingAddresses
                    .slice(0, numberOfAddressesShown)
                    .map((address) => (
                        <p>{ this.renderAddressItem(address) }</p>
                    )) }
                { !isAllAddressesShown && addressesCount > minNumberOfAddresses && (
                    <button onClick={ showAllAddresses }>
                        { __('See all addresses') }
                    </button>
                ) }
            </div>
        );
    }

    renderAccountManagerBlock() {
        const { accountmanageremail } = this.props;
        return (
            <div>
                <p>
                    { /* eslint-disable-next-line max-len */ }
                    { __(`If any information is not correct please contact your account manager: ${accountmanageremail}`) }
                </p>
            </div>
        );
    }

    renderContactInfoBlock() {
        const {
            customer: { email, phone_number }
        } = this.props;

        return (
            <div>
                <h2>{ __('My Contact Information') }</h2>
                <div>
                    <p>{ __('Telephone:') }</p>
                    <p>{ phone_number }</p>
                </div>
                <div>
                    <p>{ __('Email:') }</p>
                    <p>{ email }</p>
                </div>
            </div>
        );
    }

    renderFirstColumn() {
        return (
            <div>
                { this.renderInvoicingBlock() }
                { this.renderAddressBlock() }
                { this.renderAccountManagerBlock() }
            </div>
        );
    }

    renderSecondColumn() {
        return <div>{ this.renderContactInfoBlock() }</div>;
    }

    render() {
        const { customer: { id } } = this.props;
        if (!id) {
            return null;
        }

        return (
            <div block="MyProfilePage">
                { this.renderTitle() }
                <div block="MyProfilePage" elem="Main_Content">
                { this.renderFirstColumn() }
                { this.renderSecondColumn() }
                </div>
            </div>
        );
    }
}

export default MyProfilePageComponent;
