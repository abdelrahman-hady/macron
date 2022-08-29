import {
    CartItem as SourceCartItem
} from 'SourceComponent/CartItem/CartItem.component';
import Field from 'SourceComponent/Field';
import FIELD_TYPE from 'SourceComponent/Field/Field.config';
import { VALIDATION_INPUT_TYPE } from 'SourceUtil/Validator/Config';
import { DEFAULT_MAX_PRODUCTS } from 'Util/Product/Extract';

/** @namespace Scandipwa/Component/CartItem/Component */
export class CartItemComponent extends SourceCartItem {
    renderQuantityChangeField() {
        const {
            item: {
                sku,
                qty,
                product: {
                    stock_item: {
                        qty_increments: qtyIncrement = 1
                    } = {}
                } = {}
            } = {},
            minSaleQuantity,
            maxSaleQuantity,
            handleChangeQuantity,
            isProductInStock,
            isCartOverlay
        } = this.props;

        if (!isProductInStock) {
            return <div block="CartItem" elem="QuantityWrapper" mods={ { isPlaceholder: true } } />;
        }

        const visibleQty = qty === DEFAULT_MAX_PRODUCTS ? 0 : qty;

        return (
            <div
              block="CartItem"
              elem="QuantityWrapper"
              mods={ { isCartOverlay } }
              onClick={ this.quantityClickHandler }
              onKeyDown={ this.quantityClickHandler }
              role="button"
              tabIndex="-1"
            >
                <Field
                  id="item_qty"
                  type={ FIELD_TYPE.numberWithControls }
                  attr={ {
                      id: `${sku}_item_qty`,
                      name: `${sku}_item_qty`,
                      defaultValue: visibleQty,
                      min: minSaleQuantity,
                      max: maxSaleQuantity,
                      step: qtyIncrement
                  } }
                  value={ visibleQty }
                  events={ {
                      onChange: handleChangeQuantity
                  } }
                  validationRule={ {
                      inputType: VALIDATION_INPUT_TYPE.numeric,
                      range: {
                          min: minSaleQuantity,
                          max: maxSaleQuantity
                      }
                  } }
                  validateOn={ ['onChange'] }
                  mix={ { block: 'CartItem', elem: 'Qty' } }
                />
            </div>
        );
    }
}

export default CartItemComponent;
