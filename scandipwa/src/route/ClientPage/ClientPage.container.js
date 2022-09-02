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
import { MY_CLIENTS_URL } from 'Route/MyClientsPage/MyClientsPage.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { MatchType } from 'Type/Router.type';
import { fetchQuery, getErrorMessage } from 'Util/Request';

import ClientPage from './ClientPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/ClientPage/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Route/ClientPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Route/ClientPage/Container */
export class ClientPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        match: MatchType.isRequired
    };

    state = {
        client: {},
        isLoading: false
    };

    containerFunctions = {
    };

    componentDidMount() {
        this.requestClient();
        this.updateBreadcrumbs();
    }

    containerProps() {
        const { client, isLoading } = this.state;

        return {
            client,
            isLoading
        };
    }

    updateBreadcrumbs(companyName) {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: MY_CLIENTS_URL,
                name: __('My clients')
            }
        ];

        if (companyName) {
            breadcrumbs.unshift({
                url: `${MY_CLIENTS_URL}/:clientId`,
                name: companyName
            });
        }

        updateBreadcrumbs(breadcrumbs);
    }

    async requestClient() {
        const { showErrorNotification } = this.props;
        const { match: { params: { clientId } } } = this.props;

        this.setState({ isLoading: true });

        try {
            const { client } = await fetchQuery(ClientsQuery.getClientQuery(clientId));

            const { company_name: companyName } = client;

            this.updateMeta(companyName);
            this.updateBreadcrumbs(companyName);

            this.setState({ client, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    updateMeta(title) {
        const { updateMeta } = this.props;
        updateMeta({ title });
    }

    render() {
        return (
            <ClientPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPageContainer);