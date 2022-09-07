/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import InvoicesQuery from 'Query/Invoice.query';
import { updateMeta } from 'Store/Meta/Meta.action';
import { showNotification } from 'Store/Notification/Notification.action';
import { HistoryType, MatchType } from 'Type/Router.type';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import InvoicesPage from './InvoicesPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/InvoicesPage/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
    // TODO add the state to be passed to component
});

/** @namespace Scandipwa/Route/InvoicesPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    },
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Route/InvoicesPage/Container */
export class InvoicesPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        match: MatchType.isRequired,
        history: HistoryType.isRequired
    };

    state = {
        invoices: [],
        isLoading: false
    };

    containerFunctions = {
    };

    componentDidMount() {
        this.requestInvoices();
        this.updateMeta();
        // ToDo check if 'updateBreadcrumbs' is not needed as it is already invoked in __construct
        this.updateBreadcrumbs();
    }

    __construct(props) {
        super.__construct(props, 'InvoicesPageContainer');
        this.updateBreadcrumbs();
    }

    containerProps() {
        const { invoices, isLoading } = this.state;

        return {
            invoices,
            isLoading
        };
    }

    updateMeta() {
        const { updateMeta } = this.props;
        updateMeta({ title: __('Invoices') });
    }

    updateBreadcrumbs() {
        const { updateBreadcrumbs } = this.props;
        const breadcrumbs = [
            {
                url: '/invoices',
                name: __('Invoices')
            }
        ];

        updateBreadcrumbs(breadcrumbs);
    }

    async requestInvoices() {
        const { showErrorNotification, match: { params: { invoiceId } } } = this.props;

        this.setState({ isLoading: true });

        try {
            const { invoices } = await fetchQuery(InvoicesQuery.getInvoiceQuery(invoiceId));

            const { company_name: companyName } = invoices;

            this.updateMeta(companyName);
            this.updateBreadcrumbs(companyName);

            this.setState({ invoices, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    render() {
        if (!isSignedIn()) {
            history.replace(appendWithStoreCode('/'));
        }

        return (
            <InvoicesPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPageContainer);
