/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    CheckoutBillingContainer as SourceCheckoutBillingContainer,
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps
} from 'SourceComponent/CheckoutBilling/CheckoutBilling.container';
import { updateOrderType } from 'Store/OrderType/OrderType.action';
import transformToNameValuePair from 'Util/Form/Transform';

export {
    mapStateToProps
};

/** @namespace Scandipwa/Component/CheckoutBilling/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    updateOrderType: (notes) => dispatch(updateOrderType(notes))
});

/** @namespace Scandipwa/Component/CheckoutBilling/Container */
export class CheckoutBillingContainer extends SourceCheckoutBillingContainer {
    static propTypes = {
        ...super.propTypes,
        updateOrderType: PropTypes.func.isRequired
    };

    onBillingSuccess(form, fields, asyncData) {
        const { savePaymentInformation, updateOrderType } = this.props;
        const { isSameAsShipping } = this.state;

        const extractedFields = transformToNameValuePair(fields);
        const address = this._getAddress(extractedFields);
        const paymentMethod = this._getPaymentData(extractedFields, asyncData);

        savePaymentInformation({
            billing_address: address,
            paymentMethod,
            same_as_shipping: isSameAsShipping
        });
        updateOrderType('');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutBillingContainer);
