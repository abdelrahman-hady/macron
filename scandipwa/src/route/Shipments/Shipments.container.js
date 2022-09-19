/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright  Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable max-lines */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ShipmentsQuery from 'Query/Shipment.query';
import { isSignedIn } from 'SourceUtil/Auth';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { transformListViewAllowedValues } from 'Util/Config';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode, getQueryParam } from 'Util/Url';

import Shipments from './Shipments.component';
import { SHIPMENT_URL, SHIPMENTS_PER_PAGE, SHIPMENTS_PER_PAGE_ITEM } from './Shipments.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/Shipments/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    shipmentsPerPageList: transformListViewAllowedValues(state.ConfigReducer.xperpage)
});

/** @namespace Scandipwa/Route/Shipments/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    setHeaderState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Route/Shipments/Container */
export class ShipmentsContainer extends PureComponent {
    static propTypes = {
        shipmentsPerPageList: PropTypes.string.isRequired,
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        location: LocationType.isRequired,
        showErrorNotification: PropTypes.func.isRequired
    };

    state = {
        shipmentsPerPage: +(BrowserDatabase.getItem(SHIPMENTS_PER_PAGE_ITEM) ?? SHIPMENTS_PER_PAGE),
        shipments: [],
        isLoading: false,
        searchInput: '',
        shipmentsSearchResult: [],
        filterOptions: {
            status: null,
            customer_name: null
        },
        availableFilters: {
            status: [],
            customers: []
        }
    };

    timer = null;

    containerFunctions = {
        onInputChange: this.onInputChange.bind(this),
        updateOptions: this.updateOptions.bind(this),
        onShipmentsPerPageChange: this.onShipmentsPerPageChange.bind(this),
        formatToFieldOptions: this.formatToFieldOptions.bind(this)
    };

    componentDidMount() {
        const { shipmentsPerPage, filterOptions } = this.state;

        this.updateMeta();
        this.updateBreadcrumbs();
        this.requestShipments(this._getPageFromUrl(), shipmentsPerPage, filterOptions).then(
            /** @namespace Scandipwa/Route/Shipments/Container/ShipmentsContainer/componentDidMount/requestShipments/then */
            () => {
                // Get Available Filter Options on First Shipments
                this.setState({ availableFilters: this.getAvailablefilterOptions() });
            }
        );
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            shipmentsPerPage, shipments: {
                page_info: {
                    total_pages = 0
                } = {}
            }, filterOptions, availableFilters
        } = this.state;
        const {
            shipmentsPerPage: prevShipmentsPerPage,
            filterOptions: prevfilterOptions,
            availableFilters: prevAvailableFilters
        } = prevState;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        const filterOptionsChanged = () => !(JSON.stringify(filterOptions) === JSON.stringify(prevfilterOptions));
        const availFiltersChanged = () => !(JSON.stringify(availableFilters) === JSON.stringify(prevAvailableFilters));

        if (currentPage !== 1 && total_pages > 0 && currentPage > total_pages) {
            const pageParam = total_pages > 1 ? `?page=${total_pages}` : '';
            history.replace(`${SHIPMENT_URL}${pageParam}`);
        }

        if (currentPage !== prevPage
            || shipmentsPerPage !== prevShipmentsPerPage
            || filterOptionsChanged()
            || availFiltersChanged()
        ) {
            this.requestShipments(currentPage, shipmentsPerPage, filterOptions).then(
                /** @namespace Scandipwa/Route/Shipments/Container/ShipmentsContainer/componentDidUpdate/requestShipments/then */
                () => {
                    // Should update available filters when page number is changed
                    if (currentPage !== prevPage) {
                        this.setState({ availableFilters: this.getAvailablefilterOptions() });
                    }
                }
            );
            scrollToTop();
        }
    }

    formatToFieldOptions(options) {
        return options.map((option, idx) => ({
            id: idx + 1,
            label: option,
            value: idx + 1
        }));
    }

    getAvailablefilterOptions() {
        const { shipments: { items = [] } } = this.state;

        const uniqueLists = {
            status: {},
            customers: {}
        };

        // list available options
        items.forEach((shipment) => {
            // add to a hash map to avoid duplicates
            const { status, customer_name } = shipment;
            if (status) {
                uniqueLists.status[status] = 1;
            }
            if (customer_name) {
                uniqueLists.customers[customer_name] = 1;
            }
        });

        return {
            status: Object.keys(uniqueLists.status),
            customers: Object.keys(uniqueLists.customers)
        };
    }

    __construct(props) {
        super.__construct(props, 'ShipmentsContainer');

        this.updateBreadcrumbs();
    }

    updateOptions(option) {
        this.setState(({ filterOptions }) => ({ filterOptions: { ...filterOptions, ...option } }));
    }

    async requestShipments(page, pageSize, filterOptions) {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments } = await fetchQuery(ShipmentsQuery.getShipmentsQuery({ page, pageSize, filterOptions }));

            this.setState({ shipments, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    containerProps = () => {
        const { shipmentsPerPageList } = this.props;
        const {
            shipments, isLoading, searchInput, shipmentsPerPage, shipmentsSearchResult, filterOptions, availableFilters
        } = this.state;

        return {
            shipments,
            isLoading,
            shipmentsPerPageList,
            shipmentsPerPage,
            searchInput,
            shipmentsSearchResult,
            filterOptions,
            availableFilters
        };
    };

    onShipmentsPerPageChange(shipmentsPerPage) {
        BrowserDatabase.setItem(shipmentsPerPage, SHIPMENTS_PER_PAGE_ITEM);

        this.setState({ shipmentsPerPage });
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Shipments') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: SHIPMENT_URL,
                name: __('Shipments')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    onInputChange(e) {
        const { value } = e.target;
        this.setState({ searchInput: value });
        const query = ShipmentsQuery.getShipmentsByKeywordQuery(value);

        this.debounce(
            () => {
                this.setState({ isLoading: true });

                try {
                    fetchQuery(query).then(
                    /** @namespace Scandipwa/Route/Shipments/Container/ShipmentsContainer/onInputChange/debounce/fetchQuery/then */
                        ({ shipmentsByKeyword }) => {
                            this.setState({ isLoading: false, shipmentsSearchResult: shipmentsByKeyword });
                        }
                    );
                } catch (error) {
                    this.setState({ isLoading: false });
                }
            }
        );
    }

    _getPageFromUrl(url) {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location) || 1);
    }

    // eslint-disable-next-line no-magic-numbers
    debounce(func, timeout = 500) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            func();
        }, timeout);
    }

    render() {
        if (!isSignedIn()) {
            history.replace(appendWithStoreCode('/'));
        }

        return (
            <Shipments
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsContainer);
