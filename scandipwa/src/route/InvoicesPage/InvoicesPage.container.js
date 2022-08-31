/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { updateMeta } from 'Store/Meta/Meta.action';

import InvoicesPage from './InvoicesPage.component';

export const BreadcrumbsDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    'Store/Breadcrumbs/Breadcrumbs.dispatcher'
);

/** @namespace Scandipwa/Route/InvoicesPage/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Route/InvoicesPage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateMeta: (meta) => dispatch(updateMeta(meta)),
    updateBreadcrumbs: (breadcrumbs) => {
        BreadcrumbsDispatcher.then(
            ({ default: dispatcher }) => dispatcher.update(breadcrumbs, dispatch)
        );
    }
});

/** @namespace Scandipwa/Route/InvoicesPage/Container */
export class InvoicesPageContainer extends PureComponent {
    static propTypes = {
        updateMeta: PropTypes.func.isRequired,
        updateBreadcrumbs: PropTypes.func.isRequired
    };

    containerFunctions = {
    };

    componentDidMount() {
        this.updateMeta();
        this.updateBreadcrumbs();
    }

    __construct(props) {
        super.__construct(props, 'InvoicesPageContainer');

        this.updateBreadcrumbs();
    }

    containerProps = () => {
    };

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

    render() {
        return (
            <InvoicesPage
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesPageContainer);
