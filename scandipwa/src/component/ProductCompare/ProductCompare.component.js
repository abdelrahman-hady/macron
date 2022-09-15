/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import ProductPrice from 'Component/ProductPrice';
import {
    ProductCompare as SourceProductCompare
} from 'SourceComponent/ProductCompare/ProductCompare.component';

/** @namespace Scandipwa/Component/ProductCompare/Component */
export class ProductCompareComponent extends SourceProductCompare {
    renderProductPrice(product) {
        const { isInStock } = this.props;

        if (!isInStock(product)) {
            return (
                <div block="ProductCompareAttributeRow" elem="OutOfStock">{ __('Out of stock') }</div>
            );
        }

        const {
            price_range,
            type_id,
            id
        } = product;

        return (
            <ProductPrice
              priceRange={ price_range }
              key={ id }
              priceType={ type_id }
              mix={ { block: 'ProductCompareAttributeRow', elem: 'Price' } }
              isPreview
            />
        );
    }
}

export default ProductCompareComponent;
