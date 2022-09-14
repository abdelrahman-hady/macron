/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable max-len */
import PropTypes from 'prop-types';

import {
    ProductCard as SourceProductCard
} from 'SourceComponent/ProductCard/ProductCard.component';

import { GRID_COLOR_ITEM, GRID_SIZE_ITEM } from './ProductCard.config';

import './ProductCard.override.style.scss';

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
        const items = new Map();
        const { product: { variants }, parameters: { [GRID_COLOR_ITEM]: color } = {} } = this.props;
        const confOptions = this.getConfigurableAttributes();

        if (!variants) {
            return null;
        }

        variants.forEach(({ attributes: { [GRID_SIZE_ITEM]: { attribute_value: sizeValue }, [GRID_COLOR_ITEM]: { attribute_value: colorValue } }, salable_qty }) => {
            items[`${colorValue}-${sizeValue}`] = salable_qty;
        });

        return Object.values(confOptions).map(({ attribute_options, attribute_code }) => {
            if (attribute_code !== GRID_SIZE_ITEM) {
                return null;
            }

            return (
                <table block="ProductCard" elem="Table">
                    <thead>
                        <tr>
                            <th>{ __('Size') }</th>
                            { Object.values(attribute_options).map(({ swatch_data: { value } }) => (
                                <th>{ value }</th>
                            )) }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ __('HQ') }</td>
                            { Object.values(attribute_options).map(({ value }) => (
                                <td>{ items[`${color}-${value}`] }</td>
                            )) }
                        </tr>
                        <tr>
                            <td>{ __('Arrivals') }</td>
                            { Object.values(attribute_options).map(() => (
                                <td>-</td>
                            )) }
                        </tr>
                    </tbody>
                </table>
            );
        });
    }
}

export default ProductCardComponent;
