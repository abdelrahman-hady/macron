/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { fetchMutation, fetchQuery, getErrorMessage } from '@scandipwa/scandipwa/src/util/Request';
import { appendWithStoreCode } from '@scandipwa/scandipwa/src/util/Url';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ClientQuery from 'Query/Client.query';
import { MY_CLIENTS_URL } from 'Route/MyClientsPage/MyClientsPage.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { MatchType } from 'Type/Router.type';
import { scrollToTop } from 'Util/Browser';
import history from 'Util/History';

import CreateClientPage from './CreateClientPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/CreateClientPage/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Route/CreateClientPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Route/CreateClientPage/Container */
export class CreateClientPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        isEdit: PropTypes.bool,
        match: MatchType.isRequired
    };

    static defaultProps = {
        isEdit: false
    };

    state = {
        clientOptions: {},
        isLoading: false,
        isOptionsLoading: false,
        client: {}
    };

    containerFunctions = {
        onSave: this.onSave.bind(this)
    };

    componentDidMount() {
        const { isEdit } = this.props;

        if (!isEdit) {
            this.updateMeta();
            this.updateBreadcrumbs();
        }

        this.requestSelectItems();

        if (isEdit) {
            this.requestClient();
        }
    }

    containerProps = () => {
        const { isEdit } = this.props;
        const {
            clientOptions, isLoading, client, isOptionsLoading
        } = this.state;

        return {
            clientOptions, isLoading, isEdit, client, isOptionsLoading
        };
    };

    updateMeta(companyName = '') {
        const { updateMeta, isEdit } = this.props;

        updateMeta({ title: isEdit ? companyName : __('Create new client') });
    }

    updateBreadcrumbs(clientId, companyName = '') {
        const { updateBreadcrumbs, isEdit } = this.props;
        const breadcrumbs = [
            {
                url: MY_CLIENTS_URL,
                name: __('My clients')
            }
        ];

        if (isEdit) {
            const subBreadcrumbs = [
                {
                    url: `${MY_CLIENTS_URL}/edit/${clientId}/`,
                    name: __('Edit')
                },
                {
                    url: `${MY_CLIENTS_URL}/${clientId}`,
                    name: companyName
                }
            ];

            breadcrumbs.unshift(...subBreadcrumbs);
        } else {
            breadcrumbs.unshift({
                url: '/create-client',
                name: __('Create new client')
            });
        }

        updateBreadcrumbs(breadcrumbs);
    }

    async requestSelectItems() {
        const { showErrorNotification } = this.props;

        this.setState({ isOptionsLoading: true });

        try {
            const { clientOptions } = await fetchQuery(ClientQuery.getClientOptionsQuery());

            this.setState({ clientOptions, isOptionsLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isOptionsLoading: false });
        }
    }

    async requestClient() {
        const { showErrorNotification, match: { params: { clientId } } } = this.props;

        this.setState({ isLoading: true });

        try {
            const { client } = await fetchQuery(ClientQuery.getClientQuery(clientId));
            const { company_name: companyName } = client;

            this.updateMeta(companyName);
            this.updateBreadcrumbs(clientId, companyName);

            this.setState({ client, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    async onSave(newClient) {
        const { showErrorNotification, isEdit } = this.props;
        const { client: { entity_id: clientId } } = this.state;

        const trimmedClient = Object.fromEntries(Object.entries(newClient).filter(([_, value]) => value !== ''));

        this.setState({ isLoading: true });

        try {
            const mutation = isEdit
                ? ClientQuery.getUpdateClientMutation({ ...trimmedClient, entity_id: clientId })
                : ClientQuery.getCreateClientMutation(trimmedClient);

            await fetchMutation(mutation);

            const url = isEdit ? `${MY_CLIENTS_URL}/${clientId}` : MY_CLIENTS_URL;
            history.replace(appendWithStoreCode(url));
            scrollToTop();
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <CreateClientPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateClientPageContainer);
