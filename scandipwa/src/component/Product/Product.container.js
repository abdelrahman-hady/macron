import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    ProductContainer as SourceProductContainer
} from 'SourceComponent/Product/Product.container';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

export {
    mapDispatchToProps,
    mapStateToProps
};

/** @namespace Scandipwa/Component/Product/Container */
export class ProductContainer extends SourceProductContainer {
    state = {
        // Used for customizable & bundle options
        enteredOptions: this.setDefaultProductOptions('defaultEnteredOptions', 'enteredOptions'),
        selectedOptions: this.setDefaultProductOptions('defaultSelectedOptions', 'selectedOptions'),
        addToCartTriggeredWithError: false,
        // Used for downloadable
        downloadableLinks: [],

        quantity: 0,

        // Used to add to the base price a selected option prices
        adjustedPrice: {},

        // Used for configurable product - it can be ether parent or variant
        selectedProduct: null,
        // eslint-disable-next-line react/destructuring-assignment
        parameters: this.props.parameters
    };

    async addToCart() {
        this.updateSelectedValues();
        const { showError } = this.props;

        if (this.hasError()) {
            return;
        }

        const { addProductToCart, cartId } = this.props;
        const products = this.getMagentoProduct();

        const transformProducts = [];
        products.forEach((product) => {
            if (product.quantity === 0) {
                transformProducts.push({ ...product, quantity: DEFAULT_MAX_PRODUCTS });
                return;
            }

            transformProducts.push(product);
        });

        await addProductToCart({ products: transformProducts, cartId })
            .catch(
                /** @namespace Scandipwa/Component/Product/Container/ProductContainer/addToCart/addProductToCart/catch */
                (error) => {
                    if (error) {
                        showError(error);
                    }
                }
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
