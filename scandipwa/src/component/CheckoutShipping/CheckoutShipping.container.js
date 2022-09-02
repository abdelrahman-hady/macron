import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    CheckoutShippingContainer as SourceCheckoutShippingContainer,
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/CheckoutShipping/CheckoutShipping.container';
import {
    trimCheckoutAddress
} from 'Util/Address';
import transformToNameValuePair from 'Util/Form/Transform';

export {
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/CheckoutShipping/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    note: state.CustomCartDataReducer.note,
    internalNote: state.CustomCartDataReducer.internalNote
});

/** @namespace Scandipwa/Component/CheckoutShipping/Container */
export class CheckoutShippingContainer extends SourceCheckoutShippingContainer {
    static propTypes = {
        ...super.propTypes,
        note: PropTypes.string.isRequired,
        internalNote: PropTypes.string.isRequired
    };

    onShippingSuccess(form, fields) {
        const {
            saveAddressInformation,
            updateShippingFields,
            addressLinesQty,
            selectedStoreAddress,
            customer: { default_shipping },
            note,
            internalNote
        } = this.props;

        const {
            selectedCustomerAddressId,
            selectedShippingMethod
        } = this.state;

        const formattedFields = transformToNameValuePair(fields);

        // Joins streets into one variable
        if (addressLinesQty > 1) {
            formattedFields.street = [];
            // eslint-disable-next-line fp/no-loops,fp/no-let
            for (let i = 0; i < addressLinesQty; i++) {
                if (formattedFields[`street_${i}`]) {
                    formattedFields.street.push(formattedFields[`street_${i}`]);
                }
            }
        }

        const formFields = trimCheckoutAddress(formattedFields);

        const shippingAddress = selectedCustomerAddressId
            ? this._getAddressById(selectedCustomerAddressId)
            : formFields;

        const {
            carrier_code: shipping_carrier_code,
            method_code: shipping_method_code
        } = selectedShippingMethod;

        const isInStoreDelivery = Object.keys(selectedStoreAddress).length > 0;

        const data = {
            billing_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress, true) : shippingAddress,
            shipping_address: isInStoreDelivery ? this.getStoreAddress(shippingAddress) : shippingAddress,
            shipping_carrier_code,
            shipping_method_code
        };

        data.shipping_address.internal_note = internalNote;
        data.shipping_address.reference_note = note;

        saveAddressInformation(data);
        const shippingMethod = `${shipping_carrier_code}_${shipping_method_code}`;
        const { street = [] } = formattedFields;

        updateShippingFields({
            ...(
                street.length
                || (default_shipping && parseInt(default_shipping, 10) === data.shipping_address.id)
                    ? formattedFields : data.shipping_address
            ),
            shippingMethod
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutShippingContainer);
