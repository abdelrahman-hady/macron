import {
    MyAccountQuery as SourceMyAccountQuery
} from 'SourceQuery/MyAccount.query';

/** @namespace Scandipwa/Query/MyAccount/Query */
export class MyAccountQuery extends SourceMyAccountQuery {
    _getCustomerFields() {
        return [
            'created_at',
            'confirmation_required',
            'group_id',
            'prefix',
            'firstname',
            'middlename',
            'lastname',
            'company_name',
            'phone_number',
            'suffix',
            'email',
            'default_billing',
            'default_shipping',
            'dob',
            'taxvat',
            'id',
            'is_subscribed',
            this._getAddressesField()
        ];
    }
}

export default new MyAccountQuery();
