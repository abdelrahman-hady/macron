/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps,
    mapStateToProps as sourceMapStateToProps,
    ProductCardContainer as SourceProductCardContainer
} from 'SourceComponent/ProductCard/ProductCard.container';

/** @namespace Scandipwa/Component/ProductCard/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state)
});

/** @namespace Scandipwa/Component/ProductCard/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch)
});

/** @namespace Scandipwa/Component/ProductCard/Container */
export class ProductCardContainer extends SourceProductCardContainer {
    containerProps() {
        const { parameters } = this.state;

        return {
            ...super.containerProps(),
            parameters
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCardContainer);
