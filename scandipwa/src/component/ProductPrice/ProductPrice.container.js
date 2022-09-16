/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductPriceContainer as SourceProductPriceContainer
} from 'SourceComponent/ProductPrice/ProductPrice.container';

export {
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/ProductPrice/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    orderType: state.CustomCartDataReducer.orderType,
    closeoutDiscount: state.ConfigReducer.closeout_discount
});

/** @namespace Scandipwa/Component/ProductPrice/Container */
export class ProductPriceContainer extends SourceProductPriceContainer {
    static propTypes = {
        ...super.propTypes,
        priceRange: PropTypes.objectOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))),
        orderType: PropTypes.string.isRequired,
        closeoutDiscount: PropTypes.string.isRequired
    };

    static defaultProps = {
        priceRange: null
    };

    containerProps() {
        const {
            priceRange, mix, orderType, closeoutDiscount
        } = this.props;

        return {
            mix,
            priceRange,
            orderType,
            closeoutDiscount
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
