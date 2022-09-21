/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import { TYPE_CUSTOMER } from 'Component/OrderTypePopup/OrderTypePopup.config';
import {
    ProductPrice as SourceProductPrice
} from 'SourceComponent/ProductPrice/ProductPrice.component';
import { formatPrice } from 'Util/Price';

import './ProductPrice.style.override.scss';

/** @namespace Scandipwa/Component/ProductPrice/Component */
export class ProductPriceComponent extends SourceProductPrice {
    static propTypes = {
        ...super.propTypes,
        priceRange: PropTypes.objectOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
        orderType: PropTypes.string.isRequired,
        closeoutDiscount: PropTypes.string.isRequired,
        discountPrices: PropTypes.objectOf.isRequired
    };

    static defaultProps = {
        priceRange: null
    };

    renderPrice(price, label) {
        if (price) {
            const {
                value, currency
            } = price;

            return (
                <div block={ label }>
                    { this.renderPriceBadge(label) }
                    <br />
                    <span
                      block="ProductPrice"
                      elem="PriceValue"
                    >
                        { formatPrice(value, currency) }
                    </span>
                </div>
            );
        }

        return null;
    }

    render() {
        const {
            priceRange,
            priceRange: {
                wholesale_price,
                retail_price
            },
            mix,
            discountPrices: {
                your_wsp,
                customer_rrp
            },
            orderType,
            closeoutDiscount
        } = this.props;

        if (!priceRange || !your_wsp) {
            return this.renderPlaceholder();
        }

        // eslint-disable-next-line no-magic-numbers
        const discountAmount = parseFloat(your_wsp.value) * (parseFloat(closeoutDiscount) / 100);
        const extraDiscount = { value: parseFloat(your_wsp.value) - discountAmount, currency: your_wsp.currency };

        return (
            <div
              block="ProductPrice"
              mix={ mix }
            >
                { this.renderPrice(retail_price, __('RRP')) }
                { orderType === TYPE_CUSTOMER && this.renderPrice(customer_rrp, __('Customer RRP')) }
                { this.renderPrice(wholesale_price, __('WSP')) }
                { this.renderPrice(your_wsp, __('Your WSP')) }
                { this.renderPrice(extraDiscount, __('Extra discount')) }
            </div>
        );
    }
}

export default ProductPriceComponent;
