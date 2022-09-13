/* eslint-disable @scandipwa/scandipwa-guidelines/only-render-in-component */
import PropTypes from 'prop-types';

import ClickOutside from 'Component/ClickOutside';
import SearchOverlay from 'Component/SearchOverlay';
import {
    SearchField as SourceSearchField
} from 'SourceComponent/SearchField/SearchField.component';
import { DeviceType } from 'Type/Device.type';

import './PatchItemSearchField.style.scss';
/** @namespace Scandipwa/Component/PatchItemSearchField/Component */
export class PatchItemSearchFieldComponent extends SourceSearchField {
    static propTypes = {
        searchCriteria: PropTypes.string,
        onSearchBarFocus: PropTypes.func.isRequired,
        onSearchBarChange: PropTypes.func.isRequired,
        onSearchOutsideClick: PropTypes.func.isRequired,
        onClearSearchButtonClick: PropTypes.func.isRequired,
        isVisible: PropTypes.bool,
        isActive: PropTypes.bool,
        hideActiveOverlay: PropTypes.func,
        device: DeviceType.isRequired
    };

    closeSearch() {
        const { onSearchOutsideClick, isPatchSearch } = this.props;

        console.log('cccheck123 click outside: ', this.props);
        if (isPatchSearch) {
            return;
        }

        onSearchOutsideClick();
    }

    renderSearch() {
        const {
            searchCriteria,
            onSearchBarFocus,
            isActive
            // device
        } = this.props;

        console.log('ccheck props', this.props, this.state);

        return (
            <div
              block="SearchField"
              elem="SearchInnerWrapper"
            >
                <input
                  id="search-field"
                  ref={ this.searchBarRef }
                  block="SearchField"
                  elem="Input"
                  onFocus={ onSearchBarFocus }
                  onChange={ this.handleChange }
                  onKeyDown={ this.onSearchEnterPress }
                  value={ searchCriteria }
                  mods={ { isActive } }
                  placeholder={ __('Search products') }
                  autoComplete="off"
                  aria-label={ __('Search') }
                />
                { this.renderSearchIcon() }
                <SearchOverlay
                //   isHideOverlay={ !device.isMobile }
                  clearSearch={ this.clearSearch }
                  searchCriteria={ searchCriteria }
                />
            </div>
        );
    }

    render() {
        const {
            isVisible,
            isActive
        } = this.props;

        console.log('cccheck123', this.props);

        return (
            <div block="SearchField" mods={ { isVisible, isActive } }>
                <ClickOutside onClick={ this.closeSearch }>
                    <div block="SearchField" elem="Wrapper">
                        { this.renderSearch() }
                    </div>
                </ClickOutside>
            </div>
        );
    }
}

export default PatchItemSearchFieldComponent;
