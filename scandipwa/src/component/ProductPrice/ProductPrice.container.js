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
    mapStateToProps,
    ProductPriceContainer as SourceProductPriceContainer
} from 'SourceComponent/ProductPrice/ProductPrice.container';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/ProductPrice/Container */
export class ProductPriceContainer extends SourceProductPriceContainer {
    static propTypes = {
        ...super.propTypes,
        priceRange: PropTypes.objectOf
    };

    static defaultProps = {
        priceRange: null
    };

    containerProps() {
        const { priceRange, mix } = this.props;

        return {
            mix,
            priceRange
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPriceContainer);
