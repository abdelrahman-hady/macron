/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ClientsQuery from 'Query/Client.query';
import { updateMeta } from 'Store/Meta/Meta.action';
import { changeNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { showNotification } from 'Store/Notification/Notification.action';
import { LocationType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import { scrollToTop } from 'Util/Browser';
import BrowserDatabase from 'Util/BrowserDatabase';
import { transformListViewAllowedValues } from 'Util/Config';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode, getQueryParam } from 'Util/Url';

import MyClientsPage from './MyClientsPage.component';
import { CLIENTS_PER_PAGE, CLIENTS_PER_PAGE_ITEM, MY_CLIENTS_URL } from './MyClientsPage.config';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/MyClientsPage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    clientsPerPageList: transformListViewAllowedValues(state.ConfigReducer.xperpage)
});

/** @namespace Scandipwa/Route/MyClientsPage/Container/mapDispatchToProps */
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

/** @namespace Scandipwa/Route/MyClientsPage/Container */
export class MyClientsPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        clientsPerPageList: PropTypes.string.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        location: LocationType.isRequired
    };

    state = {
        clientsPerPage: +(BrowserDatabase.getItem(CLIENTS_PER_PAGE_ITEM) ?? CLIENTS_PER_PAGE),
        clientList: [],
        isLoading: false,
        searchInput: '',
        clientListSearchResult: []
    };

    timer = null;

    containerFunctions = {
        onCreateClientHandler: this.onCreateClientHandler.bind(this),
        onClientsPerPageChange: this.onClientsPerPageChange.bind(this),
        onInputChange: this.onInputChange.bind(this)
    };

    componentDidMount() {
        const { clientsPerPage } = this.state;

        this.updateMeta();
        this.updateBreadcrumbs();
        this.requestClients(this._getPageFromUrl(), clientsPerPage);
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            clientsPerPage, clientList: {
                page_info: {
                    total_pages = 0
                } = {}
            }
        } = this.state;
        const { clientsPerPage: prevClientsPerPage } = prevState;
        const { clientsPerPageList } = this.props;
        const { location: prevLocation } = prevProps;

        const prevPage = this._getPageFromUrl(prevLocation);
        const currentPage = this._getPageFromUrl();

        if (clientsPerPageList.length > 0 && !clientsPerPageList.includes(clientsPerPage)) {
            if (clientsPerPageList.includes(CLIENTS_PER_PAGE)) {
                this.setState({ clientsPerPage: CLIENTS_PER_PAGE });
            } else {
                this.setState({ clientsPerPage: clientsPerPageList[0] });
            }

            return;
        }

        if (currentPage !== 1 && total_pages > 0 && currentPage > total_pages) {
            const pageParam = total_pages > 1 ? `?page=${ total_pages }` : '';
            history.replace(`${ MY_CLIENTS_URL }${ pageParam }`);
        }

        if (currentPage !== prevPage || clientsPerPage !== prevClientsPerPage) {
            this.requestClients(currentPage, clientsPerPage);
            scrollToTop();
        }
    }

    __construct(props) {
        super.__construct(props, 'MyClientsPageContainer');

        this.updateBreadcrumbs();
    }

    containerProps = () => {
        const { clientsPerPageList } = this.props;
        const {
            clientList, isLoading, clientsPerPage, searchInput, clientListSearchResult
        } = this.state;

        return {
            clientList,
            isLoading,
            clientsPerPageList,
            clientsPerPage,
            searchInput,
            clientListSearchResult
        };
    };

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('My clients') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: MY_CLIENTS_URL,
                name: __('My clients')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    async requestClients(page, pageSize) {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { clients: clientList } = await fetchQuery(ClientsQuery.getClientsQuery({ page, pageSize }));

            this.setState({ clientList, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    onCreateClientHandler() {
        history.push(appendWithStoreCode(`${MY_CLIENTS_URL}/create-client`));
    }

    onClientsPerPageChange(clientsPerPage) {
        BrowserDatabase.setItem(clientsPerPage, CLIENTS_PER_PAGE_ITEM);

        this.setState({ clientsPerPage });
    }

    _getPageFromUrl(url) {
        const { location: currentLocation } = this.props;
        const location = url || currentLocation;

        return +(getQueryParam('page', location) || 1);
    }

    onInputChange(e) {
        const { value } = e.target;
        this.setState({ searchInput: value });
        const query = ClientsQuery.getClientsByKeywordQuery(value);

        this.debounce(
            () => {
                this.setState({ isLoading: true });

                try {
                    fetchQuery(query).then(
                    /** @namespace Scandipwa/Route/MyClientsPage/Container/MyClientsPageContainer/onInputChange/debounce/fetchQuery/then */
                        ({ clientsByKeyword }) => {
                            this.setState({ isLoading: false, clientListSearchResult: clientsByKeyword });
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
            <MyClientsPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyClientsPageContainer);
