/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import ProductStockGrid from 'Component/ProductStockGrid';
import { GRID_COLOR_ITEM } from 'Component/ProductStockGrid/ProductStockGrid.config';
import { customerWarehouses } from 'Component/ProductStockGrid/warehouses_sample_data';
import {
    ProductCard as SourceProductCard
} from 'SourceComponent/ProductCard/ProductCard.component';

/** @namespace Scandipwa/Component/ProductCard/Component */
export class ProductCardComponent extends SourceProductCard {
    static propTypes = {
        ...super.propTypes,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired
    };

    renderCardListContent() {
        const {
            children, layout, renderContent, product: { name }
        } = this.props;

        if (renderContent) {
            return renderContent(this.contentObject);
        }

        return this.renderCardLinkWrapper((
            <div block="ProductCard" elem="Link">
                <div block="ProductCard" elem="FigureReview">
                    <figure block="ProductCard" elem="Figure">
                        { this.renderPicture() }
                    </figure>
                </div>
                <div block="ProductCard" elem="Content" mods={ { layout } }>
                    <div block="ProductCard" elem="MainInfo">
                        { this.renderReviews() }
                        { this.renderBrand() }
                        { this.renderMainDetails() }
                    </div>
                    <div block="ProductCard" elem="AttributeWrapper">
                        { this.renderPrice() }
                        { this.renderConfigurableOptions() }
                        { this.renderStockGrid() }
                    </div>
                    <div block="ProductCard" elem="ActionWrapper" mods={ { loaded: !!name } }>
                        { this.renderAddToCart() }
                        { this.renderProductActions() }
                    </div>
                    <div block="ProductCard" elem="AdditionalContent">
                        { children }
                    </div>
                </div>
            </div>
        ));
    }

    renderStockGrid() {
        const {
            product, parameters: { [GRID_COLOR_ITEM]: selectedColor } = {}
        } = this.props;

        return (
            <ProductStockGrid
              product={ product }
              warehouses={ customerWarehouses }
              selectedColor={ selectedColor }
            />
        );
    }
}

export default ProductCardComponent;
