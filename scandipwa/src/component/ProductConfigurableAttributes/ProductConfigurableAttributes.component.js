/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
import {
    ProductConfigurableAttributes as SourceProductConfigurableAttributes
} from 'SourceComponent/ProductConfigurableAttributes/ProductConfigurableAttributes.component';

/** @namespace Scandipwa/Component/ProductConfigurableAttributes/Component */
export class ProductConfigurableAttributesComponent extends SourceProductConfigurableAttributes {
    renderConfigurableAttributes() {
        const {
            configurable_options,
            isExpandable,
            inStock,
            handleShakeAnimationEnd,
            addToCartTriggeredWithError,
            parameters
        } = this.props;

        return Object.values(configurable_options).map((option) => {
            const {
                attribute_code,
                attribute_label,
                attribute_options,
                attribute_id
            } = option;
            const isUnselected = addToCartTriggeredWithError ? !parameters[attribute_code] : null;
            const [{ swatch_data }] = attribute_options ? Object.values(attribute_options) : [{}];
            const isSwatch = !!swatch_data;

            // render content without heading and subheading
            if (!isExpandable) {
                return isSwatch ? this.renderSwatch(option) : this.renderDropdown(option);
            }

            if (!inStock && !isSwatch) {
                return null;
            }

            // if (attribute_code === GRID_SIZE_ITEM) {
            //     return null;
            // }

            const selectedOption = parameters[attribute_code];
            const selectedOptionLabel = selectedOption ? attribute_options[selectedOption]?.label : '';

            return (
                <div key={ attribute_id }>
                    <p
                      block="ProductConfigurableAttributes"
                      elem="Title"
                      mods={ { isUnselected } }
                      onAnimationEnd={ handleShakeAnimationEnd }
                    >
                        { attribute_label }
                        { isSwatch && (
                            <span block="ProductConfigurableAttributes" elem="SelectedOptionLabel">
                                { selectedOptionLabel }
                            </span>
                        ) }
                    </p>
                    { isSwatch ? this.renderSwatch(option, isUnselected) : this.renderDropdown(option, isUnselected) }
                </div>
            );
        });
    }
}

export default ProductConfigurableAttributesComponent;
