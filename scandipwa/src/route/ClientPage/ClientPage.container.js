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
import { HistoryType, MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { fetchMutation, fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

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
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    state = {
        client: {},
        isLoading: false
    };

    containerFunctions = {
        onClickDelete: this.onClickDelete.bind(this),
        onClickCreate: this.onClickCreate.bind(this),
        onClickEdit: this.onClickEdit.bind(this)
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

    updateMeta(title) {
        const { updateMeta } = this.props;
        updateMeta({ title });
    }

    async requestClient() {
        const { showErrorNotification, match: { params: { clientId } } } = this.props;

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

    async onClickDelete() {
        const { showErrorNotification, history } = this.props;
        const { client: { entity_id: clientId } } = this.state;

        try {
            await fetchMutation(ClientsQuery.getDeleteClientMutation(clientId));

            history.replace(appendWithStoreCode(MY_CLIENTS_URL));
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
        }
    }

    onClickCreate() {
        history.push(appendWithStoreCode(`${MY_CLIENTS_URL}/create-client`));
    }

    onClickEdit() {
        const { client: { entity_id: clientId } } = this.state;

        history.push(appendWithStoreCode(`${MY_CLIENTS_URL}/edit/${clientId}`));
    }

    render() {
        if (!isSignedIn()) {
            history.replace(appendWithStoreCode('/'));
        }

        return (
            <ClientPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientPageContainer);
