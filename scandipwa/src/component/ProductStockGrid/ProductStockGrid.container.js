/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { prepareQuery } from '@scandipwa/scandipwa/src/util/Query';
import { executeGet, getErrorMessage } from '@scandipwa/scandipwa/src/util/Request';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import StockQuery from 'Query/Stock.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { ProductType } from 'Type/ProductList.type';

import ProductStockGrid from './ProductStockGrid.component';
import {
    CACHE_LIFETIME, GRID_COLOR_ITEM, GRID_SIZE_ITEM, ONE_MILLISECOND, WAREHOUSE_HQ
} from './ProductStockGrid.config';

/** @namespace Scandipwa/Component/ProductStockGrid/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    stockCacheLifetime: state.ConfigReducer.stock_cache_lifetime
});

/** @namespace Scandipwa/Component/ProductStockGrid/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showError: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/ProductStockGrid/Container */
export class ProductStockGridContainer extends PureComponent {
    static propTypes = {
        product: ProductType.isRequired,
        selectedColor: PropTypes.string,
        warehouses: PropTypes.arrayOf(PropTypes.string),
        showError: PropTypes.func.isRequired,
        stockCacheLifetime: PropTypes.number.isRequired
    };

    static defaultProps = {
        selectedColor: null,
        warehouses: []
    };

    state = {
        attributeOptions: [],
        stock: [],
        isLoading: false
    };

    containerFunctions = {
        getStockByWarehouse: this.getStockByWarehouse.bind(this),
        getArrivalsByWarehouse: this.getArrivalsByWarehouse.bind(this)
    };

    timeout = null;

    componentDidMount() {
        this.initAttributeOptions();
        this.requestStock();
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    containerProps = () => {
        const { attributeOptions, isLoading } = this.state;
        const {
            product, selectedColor, warehouses
        } = this.props;

        return {
            attributeOptions,
            product,
            selectedColor,
            isLoading,
            warehouses
        };
    };

    async requestStock() {
        const {
            product: { variants }, showError, stockCacheLifetime, warehouses, selectedColor
        } = this.props;

        if (!variants || variants.length === 0) {
            return;
        }

        const SKUs = [];
        variants.forEach(({ sku, attributes: { [GRID_COLOR_ITEM]: { attribute_value } } }) => {
            if (selectedColor && attribute_value !== selectedColor) {
                return;
            }
            SKUs.push(sku);
        });

        this.setState({ isLoading: true });

        try {
            const { pimStock: stock } = await executeGet(
                prepareQuery(StockQuery.getStockQuery(SKUs, [WAREHOUSE_HQ, ...warehouses])), 'pim_stock', CACHE_LIFETIME
            );

            this.setState({ stock, isLoading: false });

            if (stockCacheLifetime) {
                this.timeout = setTimeout(this.requestStock.bind(this), stockCacheLifetime * ONE_MILLISECOND);
            }
        } catch (e) {
            showError(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    initAttributeOptions() {
        const { product: { configurable_options: configurableOptions = {} } } = this.props;
        const configurationOption = Object.values(configurableOptions).find(
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
        const stocks = {};
        const stockItems = this._getCurrentStockItems(warehouse);

        stockItems.forEach(({ size, stockItem: { qty } }) => {
            stocks[size] = (stocks[size] ?? 0) + qty;
        });

        return stocks;
    }

    getArrivalsByWarehouse(warehouse) {
        const stocks = {};
        const stockItems = this._getCurrentStockItems(warehouse);

        stockItems.forEach(({ size, stockItem: { newArrivals } }) => {
            const initialStock = 0;
            const totalQty = newArrivals.reduce(
                (previousValue, { qty }) => previousValue + qty,
                initialStock
            );

            if (totalQty === 0) {
                return;
            }

            const { total: prevTotal = 0, newArrivals: prevArrivals = [] } = (stocks[size] ?? {});
            stocks[size] = { total: prevTotal + totalQty, newArrivals: [...prevArrivals, ...newArrivals] };
        });

        return stocks;
    }

    _getCurrentStockItems(warehouse) {
        const { attributeOptions, stock } = this.state;
        const { product: { variants } = {}, selectedColor } = this.props;

        if (!variants || stock.length === 0) {
            return [];
        }

        const items = [];
        attributeOptions.forEach(({ value: size }) => {
            const filteredVariants = variants.filter(({
                attributes: {
                    [GRID_SIZE_ITEM]: { attribute_value: sizeValue },
                    [GRID_COLOR_ITEM]: { attribute_value: colorValue }
                }
            }) => (selectedColor ? size === sizeValue && selectedColor === colorValue : size === sizeValue));

            filteredVariants.forEach(({ sku: variantSku }) => {
                const stockItem = stock.find((
                    { sku: stockSku, warehouse: stockWarehouse }
                ) => variantSku === stockSku && warehouse === stockWarehouse);

                if (!stockItem) {
                    return;
                }

                items.push({ size, stockItem });
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductStockGridContainer);
