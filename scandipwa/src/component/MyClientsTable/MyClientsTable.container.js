/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ClientsQuery from 'Query/Client.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

import MyClientsTable from './MyClientsTable.component';

/** @namespace Scandipwa/Component/MyClientsTable/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/MyClientsTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/MyClientsTable/Container */
export class MyClientsTableContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired
    };

    state = {
        clients: [],
        isLoading: false
    };

    componentDidMount() {
        this.requestClients();
    }

    containerProps() {
        const { isLoading, clients } = this.state;

        return {
            isLoading,
            clients
        };
    }

    async requestClients() {
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { clients = [] } = await fetchQuery(ClientsQuery.getClientsQuery());

            this.setState({ clients, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <MyClientsTable
              { ...this.containerProps() }
            />
        );
    }
}

export default MyClientsTableContainer;
