/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */
/* eslint-disable react/forbid-prop-types */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import Pagination from 'Component/Pagination';
import SearchIcon from 'Component/SearchIcon';
import ShipmentsTable from 'Component/ShipmentsTable';
import { ShipmentsType, ShipmentType } from 'Type/Shipment.type';
import { getListViewAllowedOptions } from 'Util/Config';

import './Shipments.style';

/** @namespace Scandipwa/Route/Shipments/Component */
export class ShipmentsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        shipments: PropTypes.arrayOf(ShipmentsType).isRequired,
        shipmentsPerPageList: PropTypes.string.isRequired,
        shipmentsPerPage: PropTypes.number.isRequired,
        onShipmentPerPageChange: PropTypes.func.isRequired,
        onInputChange: PropTypes.func.isRequired,
        searchInput: PropTypes.string.isRequired,
        shipmentsSearchResult: PropTypes.arrayOf(ShipmentType).isRequired,
        filterOptions: PropTypes.object.isRequired,
        updateOptions: PropTypes.func.isRequired,
        availableFilters: PropTypes.object.isRequired,
        formatToFieldOptions: PropTypes.func.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    title = __('Shipments');

    renderTitle() {
        return (
            <h1 block="Shipments" elem="Title">
                { this.title }
            </h1>
        );
    }

    renderSearchBar() {
        const { onInputChange } = this.props;

        return (
            <div
              block="SearchShipment"
              elem="SearchInnerWrapper"
            >
                <div
                  block="SearchShipment"
                  elem="SearchIcon"
                >
                    <SearchIcon />
                </div>
                <Field
                  id="SearchShipment"
                  value={ 0 }
                  type={ FIELD_TYPE.text }
                  attr={ {
                      block: 'SearchShipment',
                      elem: 'SearchInput',
                      name: 'SearchShipment',
                      placeholder: __('Search by keyword')
                  } }
                  events={ {
                      onChange: onInputChange
                  } }
                />
            </div>
        );
    }

    renderShipmentsPerPage() {
        const { shipmentsPerPageList, shipmentsPerPage, onShipmentPerPageChange } = this.props;

        const shipmentsPerPageOptions = getListViewAllowedOptions(shipmentsPerPageList, shipmentsPerPage);

        return (
            <div block="ShipmentsTable" elem="PerPageDropdown">
                <Field
                  type={ FIELD_TYPE.select }
                  attr={ {
                      id: 'shipments-per-page-dropdown',
                      name: 'shipments-per-page-dropdown',
                      value: shipmentsPerPage,
                      noPlaceholder: true
                  } }
                  events={ {
                      onChange: onShipmentPerPageChange
                  } }
                  options={ shipmentsPerPageOptions }
                />
                <span>{ __('per page') }</span>
            </div>
        );
    }

    renderPagination() {
        const { isLoading, shipments: { page_info: { total_pages = 0 } = {} }, searchInput } = this.props;

        if (searchInput !== '') {
            return null;
        }

        return (
             <Pagination totalPages={ total_pages } isLoading={ isLoading } />
        );
    }

    renderSortByStatus() {
        const {
            filterOptions: { status }, availableFilters, formatToFieldOptions, updateOptions
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Sort by status') }
              mix={ { block: 'Shipments', elem: 'SortByStatus' } }
              options={ formatToFieldOptions(availableFilters.status) }
              value={ status }
              events={ {
                  onChange: (val) => {
                      updateOptions({ status: +val === 0 ? null : availableFilters.status[+val - 1] });
                  }
              } }
            />
        );
    }

    renderSortByCustomer() {
        const {
            filterOptions: { customer_name }, availableFilters, formatToFieldOptions, updateOptions
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Sort by customer') }
              mix={ { block: 'Shipments', elem: 'SortByCustomer' } }
              options={ formatToFieldOptions(availableFilters.customers) }
              value={ customer_name }
              events={ {
                  onChange: (val) => {
                      updateOptions({ customer_name: +val === 0 ? null : availableFilters.customers[+val - 1] });
                  }
              } }
            />
        );
    }

    renderTable() {
        const {
            isLoading, shipments: { items = [] }, searchInput, shipmentsSearchResult
        } = this.props;

        const shipments = searchInput !== '' ? shipmentsSearchResult : items;

        return (
         <ShipmentsTable shipments={ shipments } isLoading={ isLoading } />
        );
    }

    renderContent() {
        return (
            <ContentWrapper label="Shipments">
                { this.renderTitle() }
                { this.renderSearchBar() }
                { this.renderShipmentsPerPage() }
                { this.renderPagination() }
                { this.renderSortByStatus() }
                { this.renderSortByCustomer() }
                { this.renderTable() }
                { this.renderShipmentsPerPage() }
                { this.renderPagination() }
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="Shipments">
                <Loader isLoading={ isLoading } />
                { this.renderContent() }
            </main>
        );
    }
}

export default ShipmentsComponent;
