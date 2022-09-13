/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
  */

/* eslint-disable max-lines */

import AddIcon from '@scandipwa/scandipwa/src/component/AddIcon';
import ChevronIcon from '@scandipwa/scandipwa/src/component/ChevronIcon';
import CloseIcon from '@scandipwa/scandipwa/src/component/CloseIcon';

import PRODUCT_TYPE from 'Component/Product/Product.config';
import {
    SEARCH
} from 'SourceComponent/Header/Header.config';
import { ProductActions as SourceProductActions } from 'SourceComponent/ProductActions/ProductActions.component';
import { isCrawler, isSSR } from 'Util/Browser';

import PatchItemSearchField from '../PatchItemSearchField/PatchItemSearchField.component';

import './ProductActions.extension.style.scss';
/** @namespace Scandipwa/Component/ProductActions/Component */
export class ProductActionsComponent extends SourceProductActions {
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
                        ⌗
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

    renderOptions() {
        const { patchData } = this.props;

        return (patchData.map((data) => (
            data.Sku === '-'
                ? ''
                : (
                    <option key={ data.Sku }>
                        { data.Sku }
                    </option>
                )
        )));
    }

    renderSearchField(isVisible = true) {
        const {
            searchCriteria,
            onSearchOutsideClick,
            onSearchBarFocus,
            onSearchBarChange,
            onClearSearchButtonClick,
            navigationState: { name },
            isCheckout,
            hideActiveOverlay
        } = this.props;

        const isPatchSearch = true;

        if (isCheckout) {
            return null;
        }

        return (
            <PatchItemSearchField
              key="search"
              searchCriteria={ searchCriteria }
              onSearchOutsideClick={ onSearchOutsideClick }
              onSearchBarFocus={ onSearchBarFocus }
              onSearchBarChange={ onSearchBarChange }
              onClearSearchButtonClick={ onClearSearchButtonClick }
              isVisible={ isVisible }
              isActive={ name === SEARCH }
              hideActiveOverlay={ hideActiveOverlay }
              isPatchSearch={ isPatchSearch }
            />
        );
    }

    renderPatchRow(patch) {
        const {
            patchSelectionChange,
            deletePatchRow,
            updatePatchQuantityButton,
            patchInputOnChange
        } = this.props;

        return (
            <tr key={ patch.id }>
                <td>
                    <form>
                        <div>
                            <span
                              block="ProductActions"
                              elem="PatchTable"
                              mods={ { MarginTop: true } }
                            >
                                <ChevronIcon direction="bottom" />
                            </span>
                            <select
                              block="ProductActions"
                              elem="PatchTable"
                              mods={ { Length: 'Long' } }
                              name="patchCode"
                              value={ patch.Sku }
                              /* eslint-disable-next-line react/jsx-no-bind */
                              onChange={ (e) => patchSelectionChange(e, patch.id) }
                            >
                                <option value={ patch.id }>
                                    { __('Select a patch code') }
                                </option>
                                { this.renderOptions() }
                            </select>
                        </div>
                    </form>
                </td>
                <td>{ patch.name }</td>
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                <td>{ patch.Sku !== '-' ? patch.price : '-' }</td>
                <td>
                    <div
                      block="ProductActions"
                      elem="PatchQuantityHolder"
                    >
                        <input
                          block="ProductActions"
                          elem="PatchTable"
                          mods={ { Length: 'Short' } }
                          name="quantity"
                          type="text"
                          value={ patch.quantity > 0 ? patch.quantity : '' }
                          disabled={ patch.Sku === '-' }
                        /* eslint-disable-next-line react/jsx-no-bind */
                          onChange={ (e) => patchInputOnChange(e, patch.id) }
                        />
                        <div
                          block="ProductActions"
                          elem="PatchQuantityButtonHolder"
                        >
                            <button
                            /* eslint-disable-next-line react/jsx-no-bind */
                              onClick={ () => updatePatchQuantityButton(1, patch.id) }
                              disabled={ patch.Sku === '-' }
                            >
                                +
                            </button>
                            <button
                            /* eslint-disable-next-line react/jsx-no-bind */
                              onClick={ () => updatePatchQuantityButton(-1, patch.id) }
                              disabled={ patch.Sku === '-' || patch.quantity < 2 }
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
                              elem="PatchTable"
                              mods={ { MarginTop: true } }
                            >
                                %
                            </span>
                            <input
                              block="ProductActions"
                              elem="PatchTable"
                              mods={ { Length: 'Short' } }
                              name="discount"
                              type="text"
                              value={ patch.discount > 0 ? patch.discount : '' }
                              disabled={ patch.Sku === '-' }
                              /* eslint-disable-next-line react/jsx-no-bind */
                              onChange={ (e) => patchInputOnChange(e, patch.id) }
                            />
                        </div>
                    </form>
                </td>
                { /* eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-conditional */ }
                <td>{ patch.Sku !== '-' ? patch.line : '-' }</td>
                <td>
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
                    <div
                      /* eslint-disable-next-line react/jsx-no-bind */
                      onClick={ () => deletePatchRow(patch.id) }
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
                { /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */ }
                <div
                  block="ProductActions"
                  elem="AddPatchButton"
                  onClick={ addAnotherPatch }
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
                { this.renderSearchField() }
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
