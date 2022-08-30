import { ProductActions as SourceProductActions } from 'SourceComponent/ProductActions/ProductActions.component';
import { isCrawler, isSSR } from 'Util/Browser';

import vectorArrow from '../../images/vectorarrowbottom.svg';

import './ProductActions.extension.style.scss';
/** @namespace Scandipwa/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
    renderAddPatchBlock() {
        return (
            <div
              block="ProductActions"
              elem="PatchDrop"
            >
                    <div className="headingHolder bottomBorder">
                        <span>
                            ⌗
                            <h4>Add Patch</h4>
                        </span>
                        <div className="iconHolder flipped">
                            <img
                              src={ vectorArrow }
                              alt=""
                            />
                        </div>
                    </div>
            </div>
        );
    }

    renderAddToCartActionBlock() {
        return (
            <div
              block="ProductActions"
              elem="AddToCartWrapper"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderQuantityChanger() }
                <div block="ProductActions" elem="ActionButtons">
                    { this.renderWishlistButton() }
                    { this.renderCompareButton() }
                </div>
            </div>
        );
    }

    renderDesktop() {
        return (
            <>
                { this.renderBrand(true) }
                { this.renderName() }
                { this.renderReviewSection() }
                { this.renderSkuAndStock() }
                { this.renderShortDescription() }
                { this.renderConfigurableOptions() }
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderTierPrices() }
                { this.renderProductAlerts() }
                { this.renderPriceWithGlobalSchema() }
                { this.renderAddToCartActionBlock() }
                { this.renderAddPatchBlock() }
                { this.renderAddToCartButton() }
            </>
        );
    }
}

export default ProductActionsComponent;
