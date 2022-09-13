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
    CUSTOMER_CHANGE_CONFIRMATION_POPUP,
    ORDER_CHOOSE_CUSTOMER_POPUP, ORDER_TYPE_POPUP, TYPE_CUSTOMER, TYPE_REPLENISHMENT
} from './OrderTypePopup.config';

/** @namespace Scandipwa/Component/OrderTypePopup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    selectedCustomer: state.CustomCartDataReducer.selectedCustomer
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
        showPopup: PropTypes.func.isRequired,
        selectedCustomer: PropTypes.string.isRequired
    };

    static defaultProps = {
        addProductToCart: null
    };

    state = {
        companies: {},
        fieldValue: ''
    };

    containerFunctions = {
        handleCustomerClick: this.handleCustomerClick.bind(this),
        handleReplenishmentClick: this.handleReplenishmentClick.bind(this),
        onGoBack: this.onGoBack.bind(this),
        onSubmit: this.onSubmit.bind(this),
        onConfirm: this.onConfirm.bind(this)
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
        const { hideActiveOverlay, addProductToCart } = this.props;

        return {
            companies, hideActiveOverlay, addProductToCart
        };
    };

    handleCustomerClick() {
        const { showPopup, addProductToCart } = this.props;
        const type = addProductToCart ? `${ORDER_CHOOSE_CUSTOMER_POPUP }addProductToCart` : ORDER_CHOOSE_CUSTOMER_POPUP;
        showPopup(type);
    }

    onGoBack() {
        const { showPopup, addProductToCart } = this.props;
        const type = addProductToCart ? `${ORDER_TYPE_POPUP }addProductToCart` : ORDER_TYPE_POPUP;
        showPopup(type);
    }

    onSubmit(_form, fields) {
        const {
            updateTypeAndCustomerSelect, hideActiveOverlay, addProductToCart, selectedCustomer, showPopup
        } = this.props;

        if (selectedCustomer !== '' && selectedCustomer !== fields[0].value) {
            this.setState({ fieldValue: fields[0].value });
            showPopup(CUSTOMER_CHANGE_CONFIRMATION_POPUP);
            return;
        }

        updateTypeAndCustomerSelect({ orderType: TYPE_CUSTOMER, selectedCustomer: fields[0].value });
        hideActiveOverlay();

        if (addProductToCart) {
            addProductToCart();
        }
    }

    onConfirm() {
        const { fieldValue } = this.state;
        const { updateTypeAndCustomerSelect, hideActiveOverlay } = this.props;
        updateTypeAndCustomerSelect({ orderType: TYPE_CUSTOMER, selectedCustomer: fieldValue });
        hideActiveOverlay();
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
