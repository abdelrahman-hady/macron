/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
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
        showErrorNotification: PropTypes.func.isRequired,
        isCompact: PropTypes.bool,
        compactLength: PropTypes.number,
        onViewAllButtonClick: PropTypes.func.isRequired
    };

    static defaultProps = {
        isCompact: false,
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
        const { isCompact } = this.props;

        return {
            isLoading,
            shipments,
            isCompact
        };
    }

    async requestShipments() {
        const { showErrorNotification, isCompact, compactLength } = this.props;

        this.setState({ isLoading: true });

        try {
            const { shipments = [] } = await fetchQuery(ShipmentQuery.getShipmentsQuery());
            this.setState({ isLoading: false });
            if (isCompact && shipments.length >= compactLength) {
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
            <ShipmentsTable
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsTableContainer);
