/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import CustomerQuery from 'Query/Customer.query';
import { updateTypeAndCustomerSelect } from 'Store/CustomCartData/CustomCartData.action';
import { hideActiveOverlay } from 'Store/Overlay/Overlay.action';
import { showPopup } from 'Store/Popup/Popup.action';
import { fetchQuery } from 'Util/Request';

import OrderTypePopup from './OrderTypePopup.component';
import {
    ORDER_CHOOSE_CUSTOMER_POPUP, ORDER_TYPE_POPUP, TYPE_CUSTOMER, TYPE_REPLENISHMENT
} from './OrderTypePopup.config';

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapStateToProps */
export const mapStateToProps = (_state) => ({
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    updateTypeAndCustomerSelect: (payload) => dispatch(updateTypeAndCustomerSelect(payload)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    showPopup: (type, payload) => dispatch(showPopup(type, payload))
});

/** @namespace Scandipwa/Component/OrderTypePopup/Container */
export class OrderTypePopupContainer extends PureComponent {
    static propTypes = {
        updateTypeAndCustomerSelect: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired,
        addProductToCart: PropTypes.func,
        showPopup: PropTypes.func.isRequired
    };

    static defaultProps = {
        addProductToCart: null
    };

    state = {
        companies: {}
    };

    containerFunctions = {
        handleCustomerClick: this.handleCustomerClick.bind(this),
        handleReplenishmentClick: this.handleReplenishmentClick.bind(this),
        onGoBack: this.onGoBack.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    componentDidMount() {
        const query = CustomerQuery.getPartnerCompanyNamesQuery();
        fetchQuery(query).then(
            /** @namespace Scandipwa/Component/OrderTypePopup/Container/OrderTypePopupContainer/componentDidMount/fetchQuery/then */
            ({ getPartnerCompanies }) => {
                this.setState({ companies: getPartnerCompanies });
            }
        );
    }

    containerProps = () => {
        const { companies } = this.state;

        return {
            companies
        };
    };

    handleCustomerClick() {
        const { showPopup } = this.props;
        showPopup(ORDER_CHOOSE_CUSTOMER_POPUP);
    }

    onGoBack() {
        const { showPopup } = this.props;
        showPopup(ORDER_TYPE_POPUP);
    }

    onSubmit(_form, fields) {
        const { updateTypeAndCustomerSelect, hideActiveOverlay, addProductToCart } = this.props;
        updateTypeAndCustomerSelect({ orderType: TYPE_CUSTOMER, selectedCustomer: fields[0].value });
        hideActiveOverlay();

        if (addProductToCart) {
            addProductToCart();
        }
    }

    handleReplenishmentClick() {
        const { updateTypeAndCustomerSelect, hideActiveOverlay, addProductToCart } = this.props;
        const { companies } = this.state;
        updateTypeAndCustomerSelect({ orderType: TYPE_REPLENISHMENT, selectedCustomer: companies.currentCustomerId });
        hideActiveOverlay();

        if (addProductToCart) {
            addProductToCart();
        }
    }

    render() {
        return (
            <OrderTypePopup
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTypePopupContainer);
