/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { AttributesType, ProductType } from 'Type/ProductList.type';
import { StockType } from 'Type/Stock.type';

import ProductStockGrid from './ProductStockGrid.component';
import { GRID_COLOR_ITEM, GRID_SIZE_ITEM } from './ProductStockGrid.config';

/** @namespace Scandipwa/Component/ProductStockGrid/Container */
export class ProductStockGridContainer extends PureComponent {
    static propTypes = {
        configurationOptions: AttributesType.isRequired,
        product: ProductType.isRequired,
        selectedColor: PropTypes.string,
        stock: PropTypes.arrayOf(StockType).isRequired,
        isLoading: PropTypes.bool.isRequired,
        warehouses: PropTypes.arrayOf(PropTypes.string)
    };

    static defaultProps = {
        selectedColor: null,
        warehouses: []
    };

    state = {
        attributeOptions: []
    };

    containerFunctions = {
        getStockByWarehouse: this.getStockByWarehouse.bind(this),
        getArrivalsByWarehouse: this.getArrivalsByWarehouse.bind(this)
    };

    componentDidMount() {
        this.initAttributeOptions();
    }

    containerProps = () => {
        const { attributeOptions } = this.state;
        const {
            product, selectedColor, stock, isLoading, warehouses
        } = this.props;

        return {
            attributeOptions,
            product,
            selectedColor,
            stock,
            isLoading,
            warehouses
        };
    };

    initAttributeOptions() {
        const { configurationOptions } = this.props;
        const configurationOption = Object.values(configurationOptions).find(
            ({ attribute_code }) => attribute_code === GRID_SIZE_ITEM
        );

        if (!configurationOption) {
            return;
        }

        const { attribute_options } = configurationOption;
        const attributeOptions = Object.values(attribute_options);

        this.setState({ attributeOptions });
    }

    getStockByWarehouse(warehouse) {
        const stockItems = this._getCurrentStockItems(warehouse);

        const stocks = {};
        stockItems.forEach(({ value, stockItem }) => {
            if (!stockItem) {
                return;
            }

            const { qty } = stockItem;
            stocks[value] = (stocks[value] ?? 0) + qty;
        });

        return stocks;
    }

    getArrivalsByWarehouse(warehouse) {
        const stockItems = this._getCurrentStockItems(warehouse);

        const stocks = {};
        stockItems.forEach(({ value, stockItem }) => {
            if (!stockItem) {
                return;
            }

            const { newArrivals } = stockItem;
            const initialStock = 0;
            const totalQty = newArrivals.reduce(
                (previousValue, { qty }) => previousValue + qty,
                initialStock
            );

            if (totalQty === 0) {
                return;
            }

            stocks[value] = (stocks[value] ?? 0) + totalQty;
        });

        return stocks;
    }

    _getCurrentStockItems(warehouse) {
        const { attributeOptions } = this.state;
        const { product: { variants } = {}, selectedColor, stock } = this.props;

        if (!variants || stock.length === 0) {
            return [];
        }

        const items = [];
        attributeOptions.forEach(({ value }) => {
            const filteredVariants = variants.filter(({
                attributes: {
                    [GRID_SIZE_ITEM]: { attribute_value: sizeValue },
                    [GRID_COLOR_ITEM]: { attribute_value: colorValue }
                }
            }) => (selectedColor ? value === sizeValue && selectedColor === colorValue : value === sizeValue));

            filteredVariants.forEach(({ sku: variantSku }) => {
                const stockItem = stock.find((
                    { sku: stockSku, warehouse: stockWarehouse }
                ) => variantSku === stockSku && warehouse === stockWarehouse);

                items.push({ value, stockItem });
            });
        });

        return items;
    }

    render() {
        const { attributeOptions } = this.state;

        if (attributeOptions.length === 0) {
            return null;
        }

        return (
            <ProductStockGrid
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ProductStockGridContainer;
