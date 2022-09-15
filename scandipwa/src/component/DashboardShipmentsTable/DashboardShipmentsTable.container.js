/*
 * @category  Macron
 * @author    Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ShipmentQuery from 'Query/Shipment.query';
import { showNotification } from 'Store/Notification/Notification.action';
import history from 'Util/History';
import { fetchQuery, getErrorMessage } from 'Util/Request';
import { appendWithStoreCode } from 'Util/Url';

import DashboardShipmentsTable from './DashboardShipmentsTable.component';

/** @namespace Scandipwa/Component/DashboardShipmentsTable/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/DashboardShipmentsTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/DashboardShipmentsTable/Container */
export class DashboardShipmentsTableContainer extends PureComponent {
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
        shipments: [],
        isLoading: false
    };

    componentDidMount() {
        this.requestShipments();
    }

    containerProps() {
        const { isLoading, shipments } = this.state;
        return {
            isLoading,
            shipments
        };
    }

    async requestShipments() {
        const { showErrorNotification, compactLength } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments = [] } = await fetchQuery(ShipmentQuery.getShipmentsQuery());
            this.setState({ isLoading: false });
            if (shipments.length > compactLength) {
                this.setState({ shipments: shipments.slice(0, compactLength) });
            } else {
                this.setState({ shipments });
            }
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    onViewAllButtonClick() {
        history.push({ pathname: appendWithStoreCode('shipments') });
    }

    render() {
        return (
            <DashboardShipmentsTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardShipmentsTableContainer);
