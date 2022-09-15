/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import {
    ProductPrice as SourceProductPrice
} from 'SourceComponent/ProductPrice/ProductPrice.component';
import { formatPrice } from 'Util/Price';

import './ProductPrice.style.override.scss';

/** @namespace Scandipwa/Component/ProductPrice/Component */
export class ProductPriceComponent extends SourceProductPrice {
    static propTypes = {
        ...super.propTypes,
        priceRange: PropTypes.objectOf
    };

    static defaultProps = {
        priceRange: null
    };

    renderPrice(price, label) {
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

    render() {
        const {
            priceRange,
            priceRange: {
                wholesale_price,
                retail_price
            },
            mix
        } = this.props;

        if (!priceRange) {
            return this.renderPlaceholder();
        }

        return (
            <div
              block="ProductPrice"
              mix={ mix }
            >
                { this.renderPrice(wholesale_price, 'RRP') }
                { this.renderPrice(retail_price, 'WSP') }
            </div>
        );
    }
}

export default ProductPriceComponent;
