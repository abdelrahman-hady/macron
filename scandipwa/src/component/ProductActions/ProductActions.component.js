/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-conditional */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
  * @author      Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
  */

import PropTypes from 'prop-types';

import AddIcon from 'Component/AddIcon';
import ChevronIcon from 'Component/ChevronIcon';
import ClickOutside from 'Component/ClickOutside';
import CloseIcon from 'Component/CloseIcon';
import PRODUCT_TYPE from 'Component/Product/Product.config';
import ProductStockGrid from 'Component/ProductStockGrid';
import { GRID_COLOR_ITEM } from 'Component/ProductStockGrid/ProductStockGrid.config';
import { customerWarehouses } from 'Component/ProductStockGrid/warehouses_sample_data';
import { ProductActions as SourceProductActions } from 'SourceComponent/ProductActions/ProductActions.component';
import { StockType } from 'Type/Stock.type';
import { isCrawler, isSSR } from 'Util/Browser';
import { formatPrice } from 'Util/Price';

import './ProductActions.extension.style.scss';
/** @namespace Scandipwa/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
    static propTypes = {
        ...super.propTypes,
        parameters: PropTypes.objectOf(PropTypes.string).isRequired,
        stock: PropTypes.arrayOf(StockType).isRequired,
        stockLoading: PropTypes.bool.isRequired
    };

    renderAddPatchBlock() {
        const {
            isAddPatchDropOpen,
            toggleDropDown
        } = this.props;

        return (
            <div>
                <div
                  block="ProductActions"
                  elem="PatchHeadingHolder"
                  role="presentation"
                  onClick={ toggleDropDown }
                  onKeyDown={ toggleDropDown }
                >
                    <span>
                        ???
                        <h4
                          block="ProductActions"
                          elem="PatchHeading"
                        >
                            { __('Add Patch') }
                        </h4>
                    </span>
                    <div
                      block="ProductActions"
                      elem="PatchIconHolder"
                    >
                        <ChevronIcon direction={ isAddPatchDropOpen ? 'top' : 'bottom' } />
                    </div>
                </div>
                { isAddPatchDropOpen && this.renderPatchTable() }
            </div>
        );
    }

    renderPatchRow(patch) {
        const {
            deletePatchRow,
            updatePatchQuantityButton,
            patchInputOnChange,
            patchCodeInputChange,
            patchSelectionChange,
            openSelectPatch,
            closeSelectPatch,
            patchCodes
        } = this.props;

        return (
            <tr key={ patch.id }>
                <td>
                    <form>
                        <div>
                            <span
                              block="ProductActions"
                              elem="PatchInput"
                              mods={ { MarginTop: true } }
                            >
                                <ChevronIcon direction="bottom" />
                            </span>

                            <ClickOutside onClick={ () => closeSelectPatch(patch.id, patch.isSelectOpen) }>
                                <input
                                  block="ProductActions"
                                  elem="PatchInput"
                                  mods={ { Length: 'Long' } }
                                  name="patchCode"
                                  placeholder={ __('Select a patch code') }
                                  value={ patch.code }
                                  onChange={ (e) => patchCodeInputChange(e, patch.id) }
                                  onClick={ (e) => openSelectPatch(e, patch.id) }
                                  autoComplete="off"
                                />
                                <div
                                  block="ProductActions"
                                  elem="PatchInput"
                                  mods={ { isHidden: !patch.isSelectOpen } }
                                >
                                    { patchCodes.map((code) => (
                                        <div
                                          onClick={ (e) => patchSelectionChange(e, patch.id) }
                                          onKeyDown={ (e) => patchSelectionChange(e, patch.id) }
                                          role="presentation"
                                        >
                                            { code }
                                        </div>
                                    )) }
                                </div>
                            </ClickOutside>
                        </div>
                    </form>
                </td>
                <td>{ patch.name }</td>
                <td>{ patch.sku !== '-' ? formatPrice(patch.price) : '-' }</td>
                <td>
                    <div
                      block="ProductActions"
                      elem="PatchQuantityHolder"
                    >
                        <input
                          block="ProductActions"
                          elem="PatchInput"
                          mods={ { Length: 'Short' } }
                          name="quantity"
                          type="text"
                          value={ patch.quantity > 0 ? patch.quantity : '' }
                          disabled={ patch.sku === '-' }
                          onChange={ (e) => patchInputOnChange(e, patch.id) }
                        />
                        <div
                          block="ProductActions"
                          elem="PatchQuantityButtonHolder"
                        >
                            <button
                              onClick={ () => updatePatchQuantityButton(1, patch.id) }
                              disabled={ patch.sku === '-' }
                            >
                                +
                            </button>
                            <button
                              onClick={ () => updatePatchQuantityButton(-1, patch.id) }
                              disabled={ patch.sku === '-' || patch.quantity < 2 }
                            >
                                -
                            </button>
                        </div>
                    </div>
                </td>
                <td>
                    <form>
                        <div>
                            <span
                              block="ProductActions"
                              elem="PatchInput"
                              mods={ { MarginTop: true } }
                            >
                                %
                            </span>
                            <input
                              block="ProductActions"
                              elem="PatchInput"
                              mods={ { Length: 'Short' } }
                              name="discount"
                              type="text"
                              value={ patch.discount > 0 ? patch.discount : '' }
                              disabled={ patch.sku === '-' }
                              onChange={ (e) => patchInputOnChange(e, patch.id) }
                            />
                        </div>
                    </form>
                </td>
                <td>{ patch.sku !== '-' ? patch.line : '-' }</td>
                <td>
                    <div
                      onClick={ () => deletePatchRow(patch.id) }
                      onKeyDown={ () => deletePatchRow(patch.id) }
                      role="presentation"
                    >
                        <CloseIcon />
                    </div>
                </td>
            </tr>
        );
    }

    renderPatchRows() {
        const {
            patchList
        } = this.props;

        return patchList.map((patch) => (
            this.renderPatchRow(patch)
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
                        <th>{ __('Patch Code') }</th>
                        <th>{ __('Name') }</th>
                        <th>{ __('Price') }</th>
                        <th>{ __('Quantity') }</th>
                        <th>{ __('Discount') }</th>
                        <th>{ __('Line total:') }</th>
                        <th>{ }</th>
                    </tr>
                    { this.renderPatchRows() }
                </table>
                <br />
                <div
                  block="ProductActions"
                  elem="AddPatchButton"
                  onClick={ addAnotherPatch }
                  onKeyDown={ addAnotherPatch }
                  role="presentation"
                >
                    <div>
                        <AddIcon />
                    </div>
                    <h4
                      block="ProductActions"
                      elem="PatchHeading"
                    >
                        { __('Add Another Patch') }
                    </h4>
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

    renderStockGrid() {
        const {
            product, parameters: { [GRID_COLOR_ITEM]: selectedColor } = {}, stock, stockLoading
        } = this.props;

        return (
            <ProductStockGrid
              configurationOptions={ this.getConfigurableAttributes() }
              product={ product }
              selectedColor={ selectedColor }
              stock={ stock }
              isLoading={ stockLoading }
              warehouses={ customerWarehouses }
            />
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
                { this.renderStockGrid() }
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
                { this.renderStockGrid() }
                { this.renderCustomAndBundleOptions() }
                { this.renderGroupedOptions() }
                { this.renderDownloadableSamples() }
                { this.renderDownloadableLinks() }
                { this.renderAddToCartMobile() }
                { this.renderAddPatchBlock() }
                { this.renderAddToCartButton() }
            </>
        );
    }
}

export default ProductActionsComponent;
