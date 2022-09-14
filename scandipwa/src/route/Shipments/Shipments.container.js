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
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import Shipments from './Shipments.component';
import { SHIPMENT_URL } from './Shipments.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/Shipments/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
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
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired
    };

    state = {
        shipments: [],
        isLoading: false,
        searchInput: '',
        shipmentsSearchResult: []
    };

    timer = null;

    containerFunctions = {
        onInputChange: this.onInputChange.bind(this)
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.requestShipments();
    }

    __construct(props) {
        super.__construct(props, 'ShipmentsContainer');

        this.updateBreadcrumbs();
    }

    async requestShipments() {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments } = await fetchQuery(ShipmentsQuery.getShipmentsQuery());

            this.setState({ shipments, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    containerProps = () => {
        const {
            shipments, isLoading, searchInput, shipmentsSearchResult
        } = this.state;

        return {
            shipments, isLoading, searchInput, shipmentsSearchResult
        };
    };

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
