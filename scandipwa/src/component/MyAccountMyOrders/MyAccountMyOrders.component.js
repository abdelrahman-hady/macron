import PropTypes from 'prop-types';

import Loader from 'Component/Loader';
import SearchIcon from 'Component/SearchIcon';
import Field from 'SourceComponent/Field';
import FIELD_TYPE from 'SourceComponent/Field/Field.config';
import {
    MyAccountMyOrders as SourceMyAccountMyOrders
} from 'SourceComponent/MyAccountMyOrders/MyAccountMyOrders.component';

import './MyAccountMyOrders.override.style.scss';

/** @namespace Scandipwa/Component/MyAccountMyOrders/Component */
export class MyAccountMyOrdersComponent extends SourceMyAccountMyOrders {
    static propTypes = {
        ...super.propTypes,
        onInputChange: PropTypes.func.isRequired
    };

    renderSearchBar() {
        const { onInputChange } = this.props;
        return (
            <div
              block="searchOrder"
              elem="SearchInnerWrapper"
            >
                <div
                  block="searchOrder"
                  elem="searchIcon"
                >
                    <SearchIcon />
                </div>
                <Field
                  id="searchOrder"
                  block="searchOrder"
                  elem="searchInput"
                  type={ FIELD_TYPE.text }
                  attr={ {
                      name: 'searchOrder',
                      placeholder: __('Search by keyword')
                  } }
                  events={ {
                      onChange: onInputChange
                  } }
                />
            </div>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <div block="MyAccountMyOrders">
                <Loader isLoading={ isLoading } />
                { this.renderSearchBar() }
                { this.renderTable() }
                { this.renderPagination() }
            </div>
        );
    }
}

export default MyAccountMyOrdersComponent;
