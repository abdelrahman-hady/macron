/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import ShipmentQuery from 'Query/Shipment.query';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

import ShipmentsTable from './ShipmentsTable.component';

/** @namespace Scandipwa/Component/ShipmentsTable/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/ShipmentsTable/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/ShipmentsTable/Container */
export class ShipmentsTableContainer extends PureComponent {
    static propTypes = {
        showErrorNotification: PropTypes.func.isRequired
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
        const { showErrorNotification } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments = [] } = await fetchQuery(ShipmentQuery.getShipmentsQuery());
            this.setState({ shipments, isLoading: false });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
            this.setState({ isLoading: false });
        }
    }

    render() {
        return (
            <ShipmentsTable
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsTableContainer);
