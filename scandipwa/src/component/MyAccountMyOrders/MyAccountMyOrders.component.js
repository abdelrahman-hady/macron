/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import Pagination from 'Component/Pagination';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';
import { OrdersConfigType } from 'Type/Order.type';

import './MyAccountMyOrders.override.style.scss';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        ordersConfig: OrdersConfigType.isRequired,
        ordersPerPage: PropTypes.number.isRequired
    };

    renderPagination() {
        const {
            isLoading,
            orderList: {
                pageInfo: {
                    total_pages = 0
                } = {}
            }
        } = this.props;

        return (
            <Pagination
              isLoading={ isLoading }
              totalPages={ total_pages }
              mix={ { block: 'MyAccountMyOrders', elem: 'Pagination' } }
            />
        );
    }

    renderOrdersPerPage() {
        const { ordersConfig: { xperpage }, onOrderPerPageChange, ordersPerPage } = this.props;

        const xperpageOptions = [];

        if (xperpage) {
            xperpage.split(',').forEach((value) => {
                xperpageOptions.push({ id: value, label: value, value });
            });
        } else {
            xperpageOptions.push({ label: ordersPerPage, value: ordersPerPage });
        }

        return (
            <div block="MyAccountMyOrders" elem="PerPageDropdown">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'orders-per-page-dropdown',
                      name: 'orders-per-page-dropdown',
                      value: ordersPerPage,
                      noPlaceholder: true
                  } }
                  events={ {
                      onChange: onOrderPerPageChange
                  } }
                  options={ xperpageOptions }
                />
                <span>{ __('per page') }</span>
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderOrdersPerPage() }
                { this.renderTable() }
                { this.renderPagination() }
                { this.renderOrdersPerPage() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
