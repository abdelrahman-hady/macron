/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import ProductPrice from 'Component/ProductPrice';
import TextPlaceholder from 'Component/TextPlaceholder';
import {
    GroupedProductsItem as SourceGroupedProductsItem
} from 'SourceComponent/GroupedProductsItem/GroupedProductsItem.component';

/** @namespace Scandipwa/Component/GroupedProductsItem/Component */
export class GroupedProductsItemComponent extends SourceGroupedProductsItem {
    renderTitle() {
        const {
            product: {
                name,
                price_range: priceRange
            }
        } = this.props;

        return (
            <div block="GroupedProductsItem" elem="Title">
                <p>
                    <TextPlaceholder content={ name } />
                </p>
                <ProductPrice
                  priceRange={ priceRange }
                  mix={ { block: 'GroupedProductsItem', elem: 'Price' } }
                />
            </div>
        );
    }
}

export default GroupedProductsItemComponent;
