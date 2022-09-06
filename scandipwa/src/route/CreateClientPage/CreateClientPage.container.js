/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { fetchMutation, getErrorMessage } from '@scandipwa/scandipwa/src/util/Request';
import { appendWithStoreCode } from '@scandipwa/scandipwa/src/util/Url';
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ClientQuery from 'Query/Client.query';
import { MY_CLIENTS_URL } from 'Route/MyClientsPage/MyClientsPage.config';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
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
        showErrorNotification: PropTypes.func.isRequired
    };

    state = {
        selectItems: [],
        isLoading: false
    };

    containerFunctions = {
        onSave: this.onSave.bind(this)
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
        this.fetchSelectItems();
    }

    containerProps = () => {
        const { selectItems, isLoading } = this.state;

        return { selectItems, isLoading };
    };

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Create new client') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/create-client',
                name: __('Create new client')
            },
            {
                url: MY_CLIENTS_URL,
                name: __('My clients')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    async fetchSelectItems() {
        this.setState({ selectItems: ['item1', 'item2'] });
    }

    async onSave(newClient) {
        const { showErrorNotification } = this.props;

        const trimmedClient = Object.fromEntries(Object.entries(newClient).filter(([_, value]) => value !== ''));

        this.setState({ isLoading: true });

        try {
            await fetchMutation(ClientQuery.getCreateClientMutation(trimmedClient));

            history.replace(appendWithStoreCode(`${MY_CLIENTS_URL}`));
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
