/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright  Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

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

import './Shipments.style';

/** @namespace Scandipwa/Route/Shipments/Component */
export class ShipmentsComponent extends PureComponent {
    static propTypes = {
        shipments: PropTypes.arrayOf(ShipmentsType).isRequired,
        isLoading: PropTypes.bool,
        onInputChange: PropTypes.func.isRequired,
        searchInput: PropTypes.string.isRequired,
        shipmentsSearchResult: PropTypes.arrayOf(ShipmentType).isRequired
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

    renderPagination() {
        const { isLoading, shipments: { pageInfo: { total_pages = 2 } = {} }, searchInput } = this.props;

        if (searchInput !== '') {
            return null;
        }

        return (
             <Pagination totalPages={ total_pages } isLoading={ isLoading } />
        );
    }

    renderContent() {
        const {
            isLoading, shipments: items, searchInput, shipmentsSearchResult
        } = this.props;

        const shipments = searchInput !== '' ? shipmentsSearchResult : items;

        return (
            <ContentWrapper label="Shipments">
                { this.renderTitle() }
                { this.renderSearchBar() }
                <ShipmentsTable shipments={ shipments } isLoading={ isLoading } />
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
