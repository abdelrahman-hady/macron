import Field from 'Component/Field';
import Loader from 'Component/Loader';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    renderToolbar() {
        const { sortOptions: { orderStatus }, updateOptions, statusOptions } = this.props;
        return (
            <div className="MyAccountMyOrders-Toolbar">
            <Field
              type="select"
              label={ __('Sort by status') }
              mix={ { block: 'MyAccountMyOrders', elem: 'SortByStatus' } }
              options={ statusOptions }
              value={ orderStatus }
              events={ {
                  onChange: async (val) => {
                      await updateOptions({ orderStatus: val });
                      this.renderOrderRows();
                  }
              } }
            />
            </div>
        );
    }

    renderOrderRows() {
        const {
            orderList: { items = [] }, isLoading, sortOptions: { orderStatus }, statusOptions
        } = this.props;

        if (!isLoading && !items.length) {
            return this.renderNoOrders();
        }

        const orders = items.length
            ? items
            : Array.from({ length: 10 }, (_, id) => ({ base_order_info: { id } }));

        if (orderStatus === 0) {
            // no filters selected -> render all orders
            return orders.reduceRight(
                (acc, e) => [...acc, e.status === orderStatus ? this.renderOrderRow(e) : null],
                []
            );
        }

        // Filter Orders By Status
        const [filterOption = {}] = statusOptions.filter((option) => option.id === orderStatus);
        return orders.reduceRight(
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
