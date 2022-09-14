/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { GRID_COLOR_ITEM, GRID_SIZE_ITEM } from 'Component/ProductStockGrid/ProductStockGrid.config';
import { AttributesType, ProductType } from 'Type/ProductList.type';

import './ProductStockGrid.style';

/** @namespace Scandipwa/Component/ProductStockGrid/Component */
export class ProductStockGridComponent extends PureComponent {
    static propTypes = {
        configurationOptions: AttributesType.isRequired,
        product: ProductType.isRequired,
        selectedColor: PropTypes.string
    };

    static defaultProps = {
        selectedColor: ''
    };

    renderStockHeadingRow(attributeOptions) {
        return (
            <thead>
                <tr>
                    <th>{ __('Size') }</th>
                    { attributeOptions.map(({ swatch_data: { value } }) => (
                        <th>{ value }</th>
                    )) }
                </tr>
            </thead>
        );
    }

    renderGridContent(attributeOptions) {
        const { product: { variants } = {}, selectedColor } = this.props;

        if (!variants) {
            return null;
        }

        const stocks = {};
        variants.forEach(({
            attributes: {
                [GRID_SIZE_ITEM]: { attribute_value: sizeValue },
                [GRID_COLOR_ITEM]: { attribute_value: colorValue }
            }, salable_qty
        }) => {
            stocks[`${colorValue}-${sizeValue}`] = salable_qty;
        });

        return (
            <tbody>
                <tr>
                    <td>{ __('HQ') }</td>
                    { attributeOptions.map(({ value }) => (
                        <td>{ stocks[`${selectedColor}-${value}`] }</td>
                    )) }
                </tr>
                <tr>
                    <td>{ __('Arrivals') }</td>
                    { attributeOptions.map(() => (
                        <td>-</td>
                    )) }
                </tr>
            </tbody>
        );
    }

    render() {
        const { configurationOptions } = this.props;
        const configurationOption = Object.values(configurationOptions).find(
            ({ attribute_code }) => attribute_code === GRID_SIZE_ITEM
        );

        if (!configurationOption) {
            return null;
        }

        const { attribute_options } = configurationOption;
        const attributeOptions = Object.values(attribute_options);

        return (
            <table block="ProductStockGrid" elem="Table">
                { this.renderStockHeadingRow(attributeOptions) }
                { this.renderGridContent(attributeOptions) }
            </table>
        );
    }
}

export default ProductStockGridComponent;
