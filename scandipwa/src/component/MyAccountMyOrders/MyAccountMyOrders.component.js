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
              events={ { onChange: (val) => updateOptions({ orderStatus: val }) } }
            />
            </div>
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
