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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import Loader from 'Component/Loader';
import Pagination from 'Component/Pagination';
import ShipmentsTable from 'Component/ShipmentsTable';
import { ShipmentsType } from 'Type/Shipment.type';

/** @namespace Scandipwa/Route/Shipments/Component */
export class ShipmentsComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
        shipments: ShipmentsType.isRequired,
        shipmentsPerPageList: PropTypes.string.isRequired,
        shipmentsPerPage: PropTypes.number.isRequired,
        onShipmentPerPageChange: PropTypes.func.isRequired
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

    renderShipmentsPerPage() {
        const { shipmentsPerPageList, shipmentsPerPage, onShipmentPerPageChange } = this.props;

        const shipmentsPerPageOptions = [];

        if (shipmentsPerPageList) {
            shipmentsPerPageList.split(',').forEach((value) => {
                const perPage = +value;
                shipmentsPerPageOptions.push({ id: perPage, label: perPage, value: perPage });
            });
        } else {
            shipmentsPerPageOptions.push({ label: shipmentsPerPage, value: shipmentsPerPage });
        }

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
        const { isLoading, shipments: { pageInfo: { total_pages = 0 } = {} } } = this.props;

        return (
             <Pagination totalPages={ total_pages } isLoading={ isLoading } />
        );
    }

    renderContent() {
        const { isLoading, shipments: { items = [] } } = this.props;

        return (
          <ContentWrapper label="Shipments">
             { this.renderTitle() }
             { this.renderShipmentsPerPage() }
             { this.renderPagination() }
            <ShipmentsTable shipments={ items } isLoading={ isLoading } />
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
