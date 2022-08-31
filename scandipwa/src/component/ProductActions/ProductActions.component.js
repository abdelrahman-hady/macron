/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ProductActions as SourceProductActions } from 'SourceComponent/ProductActions/ProductActions.component';
import { isCrawler, isSSR } from 'Util/Browser';

import vectorArrow from '../../images/vectorarrowbottom.svg';
import vectorBin from '../../images/vectorbin.svg';

import './ProductActions.extension.style.scss';
/** @namespace Scandipwa/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
    renderAddPatchBlock() {
        const {
            isAddPatchDropOpen,
            toggleDropDown
        } = this.props;

        return (
            <div
              block="ProductActions"
              elem="PatchDrop"
            >
                    <div
                      className={ isAddPatchDropOpen ? 'headingHolder' : 'headingHolder bottomBorder' }
                      onClick={ toggleDropDown }
                    >
                        <span>
                            ⌗
                            <h4>Add Patch</h4>
                        </span>
                        <div className={ isAddPatchDropOpen ? 'iconHolder opened' : 'iconHolder' }>
                            <img
                              src={ vectorArrow }
                              alt=""
                            />
                        </div>
                    </div>
                    { isAddPatchDropOpen && this.renderPatchTable() }
            </div>
        );
    }

    renderPatchTable() {
        return (
            <table
              block="ProductActions"
              elem="PatchTable"
            >
                <tr>
                    <th className="span-4">Patch Code</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Line total:</th>
                    <th className="span-1">{ }</th>
                </tr>
                <tr>
                    <td className="span-4 p-0">
                        <form>
                            <select name="patchCode" className="long">
                                { /** TODO: Insert Icon */ }
                                <option value="12345678">12345678</option>
                                <option value="87654321">87654321</option>
                            </select>
                        </form>
                    </td>
                    <td>Patch X</td>
                    <td>5.00</td>
                    <td className="p-0">
                        <div className="quantityHolder">
                            <input className="short" name="discount" type="text" value="1034" />
                            <div className="buttonHolder">
                                <button>+</button>
                                <button>-</button>
                            </div>
                        </div>
                    </td>
                    <td className="p-0">
                        <input className="discount" name="discount" type="text" value={ `${'123'}%` } />
                    </td>
                    <td className="tac">25.00</td>
                    <td className="span-1">
                        <div className="iconHolder">
                            <img
                              src={ vectorBin }
                              alt=""
                            />
                        </div>
                    </td>
                </tr>
            </table>
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

    renderBorder() {
        const {
            isAddPatchDropOpen
        } = this.props;

        if (!isAddPatchDropOpen) {
            return '';
        }

        return <div className="someHeight bottomBorder" />;
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
                { this.renderBorder() }
            </>
        );
    }
}

export default ProductActionsComponent;
