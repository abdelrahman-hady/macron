/* eslint-disable react/forbid-prop-types */
/*
 * @category  Macron
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import Loader from 'Component/Loader';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        sortOptions: PropTypes.object.isRequired,
        statusOptions: PropTypes.array.isRequired,
        updateOptions: PropTypes.func.isRequired
    };

    renderToolbar() {
        return (
            <div className="MyAccountMyOrders-Toolbar">
                { this.renderSortByStatus() }
            </div>
        );
    }

    renderSortByStatus() {
        const { sortOptions: { orderStatus }, updateOptions, statusOptions } = this.props;
        return (
            <Field
              type="select"
              label={ __('Sort by status') }
              mix={ { block: 'MyAccountMyOrders', elem: 'SortByStatus' } }
              options={ statusOptions }
              value={ orderStatus }
              events={ {
                  onChange: (val) => {
                      updateOptions({ orderStatus: val });
                  }
              } }
            />
        );
    }

    renderOrderRows() {
        const {
            orderList: { items = [] }, isLoading, sortOptions: { orderStatus }, statusOptions
        } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        if (orderStatus === 0) {
            // no filters selected -> render all orders
            return items.reduceRight(
                (acc, order) => [...acc, this.renderOrderRow(order)],
                []
            );
        }

        // Filter Orders By Status
        const [filterOption = {}] = statusOptions.filter((option) => option.id === orderStatus);
        return items.reduceRight(
            (acc, order) => {
                if (filterOption.label?.value === order.status) {
                    return [...acc, this.renderOrderRow(order)];
                }

                return Array.from(acc);
            },
            []
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderToolbar() }
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
