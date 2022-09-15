/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import Loader from '@scandipwa/scandipwa/src/component/Loader';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { EMPTY_QTY, WAREHOUSE_HQ } from './ProductStockGrid.config';

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
        isLoading: PropTypes.bool.isRequired
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

    renderHeadquarterStockRow() {
        const { getStockByWarehouse } = this.props;
        const headquarterStock = getStockByWarehouse(WAREHOUSE_HQ);

        if (headquarterStock.length === 0) {
            return this.renderDefaultRow();
        }

        return (
            <tr>
                <th>{ __('HQ') }</th>
                { headquarterStock.map((qty) => <th>{ qty === EMPTY_QTY ? '-' : qty }</th>) }
            </tr>
        );
    }

    renderDefaultRow() {
        const { attributeOptions } = this.props;

        return (
            <tr>
                <th>-</th>
                { attributeOptions.map(() => (
                    <th>-</th>
                )) }
            </tr>
        );
    }

    renderArrivalsRow() {
        const { getArrivalsByWarehouse } = this.props;
        const arrivals = getArrivalsByWarehouse(WAREHOUSE_HQ);

        return (
            <tr>
                <td>{ __('Arrivals') }</td>
                { arrivals.map((qty) => <td>{ qty === EMPTY_QTY ? '-' : qty }</td>) }
            </tr>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="ProductStockGrid">
                <Loader isLoading={ isLoading } />
                <table block="ProductStockGrid" elem="Table">
                    <thead>
                        { this.renderStockHeadingRow() }
                        { this.renderHeadquarterStockRow() }
                    </thead>
                    <tbody>
                        { this.renderArrivalsRow() }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductStockGridComponent;
