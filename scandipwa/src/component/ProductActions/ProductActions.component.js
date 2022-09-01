/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PRODUCT_TYPE from 'Component/Product/Product.config';
import { ProductActions as SourceProductActions } from 'SourceComponent/ProductActions/ProductActions.component';
import { isCrawler, isSSR } from 'Util/Browser';

import vectorArrow from '../../images/vectorarrowbottom.svg';
import vectorBin from '../../images/vectorbin.svg';
import vectorPlus from '../../images/vectorplus.svg';

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
                        <div className={ isAddPatchDropOpen ? 'iconHolder ic-sm opened' : 'iconHolder ic-sm' }>
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

    renderPatchRows() {
        const {
            patchList,
            patchData,
            patchSelectionChange,
            deletePatchRow,
            updatePatchQuantityButton,
            patchInputOnChange
        } = this.props;

        return patchList.map((patch) => (
                <tr key={ patch.id }>
                    <td className="span-4 p-0">
                        <form>
                            <div>
                                <span>
                                    <img src={ vectorArrow } alt="" />
                                </span>
                                <select
                                  name="patchCode"
                                  className="long"
                                  value={ patch.sku }
                                  onChange={ (e) => patchSelectionChange(e, patch.id) }
                                >
                                    <option value={ patch.id }>
                                        Select a patch code
                                    </option>
                                    { patchData.map((data) => (
                                        data.sku === '-'
                                            ? ''
                                            : (
                                            <option key={ data.sku }>
                                            { data.sku }
                                            </option>
                                            )
                                    )) }
                                </select>
                            </div>
                        </form>
                    </td>
                    <td>{ patch.name }</td>
                    <td>{ patch.price }</td>
                    <td className="p-0">
                        <div className="quantityHolder">
                            <input
                              className="short"
                              name="quantity"
                              type="text"
                              value={ patch.quantity > 0 ? patch.quantity : '' }
                              disabled={ patch.sku === '-' }
                              onChange={ (e) => patchInputOnChange(e, patch.id) }
                            />
                            <div className="buttonHolder">
                                <button
                                  onClick={ () => updatePatchQuantityButton(1, patch.id) }
                                  disabled={ patch.sku === '-' }
                                >
                                +
                                </button>
                                <button
                                  onClick={ () => updatePatchQuantityButton(-1, patch.id) }
                                  disabled={ patch.sku === '-' || patch.quantity === 1 }
                                >
                                -
                                </button>
                            </div>
                        </div>
                    </td>
                    <td className="p-0">
                        <form>
                            <div>
                                <span>%</span>
                                <input
                                  className="short m-sides"
                                  name="discount"
                                  type="text"
                                  value={ patch.discount > 0 ? patch.discount : '' }
                                  disabled={ patch.sku === '-' }
                                  onChange={ (e) => patchInputOnChange(e, patch.id) }
                                />
                            </div>
                        </form>
                    </td>
                    <td>{ patch.line }</td>
                    <td className="span-1">
                        <div className="iconHolder ic-sm" onClick={ () => deletePatchRow(patch.id) }>
                            <img
                              src={ vectorBin }
                              alt=""
                            />
                        </div>
                    </td>
                </tr>
        ));
    }

    renderPatchTable() {
        const {
            addAnotherPatch
        } = this.props;

        return (
            <>
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

                    { this.renderPatchRows() }
            </table>
            <br />
            <div className="addPatchBtn" onClick={ addAnotherPatch }>
                <div className="iconHolder ic-lg">
                    <img
                      src={ vectorPlus }
                      alt=""
                    />
                </div>
                <h4>Add Another Patch</h4>
            </div>
            </>
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

    renderAddToCartMobile() {
        return (
            <div
              block="ProductActions"
              elem="AddToCartFixed"
              mods={ { isPrerendered: isSSR() || isCrawler() } }
            >
                { this.renderQuantityChanger() }
                { this.renderWishlistButton() }
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

    renderMobile() {
        const { product: { type_id: type } } = this.props;
        const isWithoutPriceTotal = type === PRODUCT_TYPE.grouped;

        return (
            <>
                { this.renderTierPrices() }
                <div block="ProductActions" elem="ActionsWrapper" mods={ { isWithoutPriceTotal } }>
                    { this.renderPriceWithGlobalSchema() }
                    { this.renderSkuAndStock() }
                </div>
                <div block="ProductActions" elem="ActionsWrapper">
                    { this.renderReviewSection() }
                    { this.renderCompareButton() }
                </div>
                { this.renderBrand(true) }
                { this.renderShortDescription() }
                { this.renderProductAlerts() }
                { this.renderConfigurableOptions() }
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderAddToCartMobile() }
                { this.renderAddPatchBlock() }
                { this.renderAddToCartButton() }
                { this.renderBorder() }
            </>
        );
    }
}

export default ProductActionsComponent;
