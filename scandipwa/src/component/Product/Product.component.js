/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable @scandipwa/scandipwa-guidelines/derived-class-names */
import ProductPrice from 'Component/ProductPrice';
import {
    Product as SourceProduct
} from 'SourceComponent/Product/Product.component';

/** @namespace Scandipwa/Component/Product/Component */
export class Product extends SourceProduct {
    renderPrice(isPreview = false) {
        const {
            getActiveProduct
        } = this.props;
        const product = getActiveProduct();

        const {
            price_range: priceRange,
            id
        } = product;

        if (!priceRange) {
            return null;
        }

        return (
            <div
              block={ this.className }
              elem="PriceWrapper"
            >
                <ProductPrice
                  meta
                  priceRange={ priceRange }
                  productId={ id }
                  isPreview={ isPreview }
                  mix={ { block: this.className, elem: 'Price' } }
                />
            </div>
        );
    }
}

export default Product;
