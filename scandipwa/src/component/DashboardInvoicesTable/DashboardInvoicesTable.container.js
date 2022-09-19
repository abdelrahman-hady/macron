/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import InvoicesQuery from 'Query/Invoice.query';
import { showNotification } from 'Store/Notification/Notification.action';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import DashboardInvoicesTableComponent from './DashboardInvoicesTable.component';

/** @namespace Scandipwa/Component/DashboardInvoicesTable/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/DashboardInvoicesTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/DashboardInvoicesTable/Container */
export class DashboardInvoicesTableContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired,
        compactLength: PropTypes.number,
        onViewAllButtonClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        compactLength: 5
    };

    containerFunctions = {
        onViewAllButtonClick: this.onViewAllButtonClick.bind(this)
    };

    state = {
        invoices: [],
        isLoading: false
    };

    componentDidMount() {
        this.requestInvoices();
    }

    containerProps() {
        const { isLoading, invoices } = this.state;
        return {
            isLoading,
            invoices
        };
    }

    async requestInvoices() {
        const { showErrorNotification, compactLength } = this.props;

        this.setState({ isLoading: true });

        try {
            const { invoices = [] } = await fetchQuery(
                InvoicesQuery.getInvoicesQuery({ page: 1, pageSize: compactLength })
            );

            this.setState({ invoices, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    onViewAllButtonClick() {
        history.push({ pathname: appendWithStoreCode('invoices') });
    }

    render() {
        return (
            <DashboardInvoicesTableComponent
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardInvoicesTableContainer);
