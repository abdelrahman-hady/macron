/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Loader from 'Component/Loader';

import { WAREHOUSE_HQ } from './ProductStockGrid.config';

import './ProductStockGrid.style';

/** @namespace Scandipwa/Component/ProductStockGrid/Component */
export class ProductStockGridComponent extends PureComponent {
    static propTypes = {
        attributeOptions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            count: PropTypes.number,
            value_string: PropTypes.string,
            swatch_data: PropTypes.shape({ type: PropTypes.string, value: PropTypes.string })
        })).isRequired,
        getStockByWarehouse: PropTypes.func.isRequired,
        getArrivalsByWarehouse: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        warehouses: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    renderStockHeadingRow() {
        const { attributeOptions } = this.props;

        return (
            <tr>
                <th>{ __('Size') }</th>
                { attributeOptions.map(({ swatch_data: { value } }) => (
                    <th>{ value }</th>
                )) }
            </tr>
        );
    }

    renderStockRow(warehouse) {
        const { attributeOptions, getStockByWarehouse } = this.props;
        const stocks = getStockByWarehouse(warehouse);

        const title = warehouse === WAREHOUSE_HQ ? __('HQ') : warehouse;

        return (
            <tr>
                <th>{ title }</th>
                { attributeOptions.map(({ value }) => (
                    <th>{ stocks[value] ?? '-' }</th>
                )) }
            </tr>
        );
    }

    renderArrivalsRow(warehouse) {
        const { attributeOptions, getArrivalsByWarehouse } = this.props;
        const arrivals = getArrivalsByWarehouse(warehouse);

        return (
            <tr>
                <td>{ __('Arrivals') }</td>
                { attributeOptions.map(({ value }) => (
                    <th>{ arrivals[value] ?? '-' }</th>
                )) }
            </tr>
        );
    }

    renderHeadquarterTable() {
        return (
            <>
                <thead>
                    { this.renderStockHeadingRow() }
                    { this.renderStockRow(WAREHOUSE_HQ) }
                </thead>
                <tbody>
                    { this.renderArrivalsRow(WAREHOUSE_HQ) }
                </tbody>
            </>
        );
    }

    renderStoreTable(warehouse) {
        return (
            <>
                <thead>
                    { this.renderStockRow(warehouse) }
                </thead>
                <tbody>
                    { this.renderArrivalsRow(warehouse) }
                </tbody>
            </>
        );
    }

    render() {
        const { isLoading, warehouses } = this.props;

        return (
            <div block="ProductStockGrid">
                <Loader isLoading={ isLoading } />
                <table block="ProductStockGrid" elem="Table">
                    { this.renderStoreTable(WAREHOUSE_HQ) }
                    { warehouses.map(this.renderStoreTable.bind(this)) }
                </table>
            </div>
        );
    }
}

export default ProductStockGridComponent;
