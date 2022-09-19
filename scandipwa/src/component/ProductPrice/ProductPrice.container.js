/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { TYPE_CUSTOMER } from 'Component/OrderTypePopup/OrderTypePopup.config';
import ProductListQuery from 'Query/ProductList.query';
import {
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductPriceContainer as SourceProductPriceContainer
} from 'SourceComponent/ProductPrice/ProductPrice.container';
import { fetchQuery } from 'Util/Request';

export {
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    orderType: state.CustomCartDataReducer.orderType,
    selectedCustomer: state.CustomCartDataReducer.selectedCustomer,
    closeoutDiscount: state.ConfigReducer.closeout_discount
});

/** @namespace Scandipwa/Component/ProductPrice/Container */
export class ProductPriceContainer extends SourceProductPriceContainer {
    static propTypes = {
        ...super.propTypes,
        priceRange: PropTypes.objectOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
        orderType: PropTypes.string.isRequired,
        selectedCustomer: PropTypes.string.isRequired,
        closeoutDiscount: PropTypes.string.isRequired,
        productId: PropTypes.string.isRequired
    };

    static defaultProps = {
        priceRange: null
    };

    state = {
        discountPrices: {}
    };

    __construct() {
        const { productId, orderType, selectedCustomer } = this.props;
        const customer = orderType === TYPE_CUSTOMER ? selectedCustomer : null;
        fetchQuery(ProductListQuery.getDiscountPrices(productId, customer)).then(
            /** @namespace Scandipwa/Component/ProductPrice/Container/ProductPriceContainer/__construct/fetchQuery/then */
            ({ discount_prices }) => {
                this.setState({ discountPrices: discount_prices });
            }
        );
    }

    componentDidUpdate(prevProps) {
        const { productId, orderType, selectedCustomer } = this.props;
        const { selectedCustomer: prevCustomer } = prevProps;

        if (selectedCustomer !== prevCustomer) {
            const customer = orderType === TYPE_CUSTOMER ? selectedCustomer : null;
            fetchQuery(ProductListQuery.getDiscountPrices(productId, customer)).then(
                /** @namespace Scandipwa/Component/ProductPrice/Container/ProductPriceContainer/componentDidUpdate/fetchQuery/then */
                ({ discount_prices }) => {
                    this.setState({ discountPrices: discount_prices });
                }
            );
        }
    }

    containerProps() {
        const {
            priceRange, mix, orderType, closeoutDiscount
        } = this.props;

        const { discountPrices } = this.state;

        return {
            mix,
            priceRange,
            orderType,
            closeoutDiscount,
            discountPrices
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
