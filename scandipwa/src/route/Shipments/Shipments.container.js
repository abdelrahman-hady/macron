/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright  Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com) (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ShipmentsQuery from 'Query/Shipment.query';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { transformListViewAllowedValues } from 'Util/Config';
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
        isLoading: false
    };

    containerFunctions = {
        onShipmentsPerPageChange: this.onShipmentsPerPageChange.bind(this)
    };

    componentDidMount() {
        const { shipmentsPerPage } = this.state;

        this.updateMeta();
        this.updateBreadcrumbs();
        this.requestShipments(this._getPageFromUrl(), shipmentsPerPage);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            shipmentsPerPage, shipments: {
                page_info: {
                    total_pages = 0
                } = {}
            }
        } = this.state;
        const { shipmentsPerPage: prevShipmentsPerPage } = prevState;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (currentPage !== 1 && total_pages > 0 && currentPage > total_pages) {
            const pageParam = total_pages > 1 ? `?page=${total_pages}` : '';
            history.replace(`${SHIPMENT_URL}${pageParam}`);
        }

        if (currentPage !== prevPage || shipmentsPerPage !== prevShipmentsPerPage) {
            this.requestShipments(currentPage, shipmentsPerPage);
            scrollToTop();
        }
    }

    __construct(props) {
        super.__construct(props, 'ShipmentsContainer');

        this.updateBreadcrumbs();
    }

    async requestShipments(page, pageSize) {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments } = await fetchQuery(ShipmentsQuery.getShipmentsQuery({ page, pageSize }));

            this.setState({ shipments, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    containerProps = () => {
        const { shipmentsPerPageList } = this.props;
        const { shipments, isLoading, shipmentsPerPage } = this.state;

        return {
            shipments, isLoading, shipmentsPerPageList, shipmentsPerPage
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

    _getPageFromUrl(url) {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location) || 1);
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
