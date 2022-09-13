/* eslint-disable max-lines */
/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
  */

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    mapDispatchToProps as sourceMapDispatchToProps
} from 'Component/Product/Product.container';
import { MENU, SEARCH } from 'SourceComponent/Header/Header.config';
import {
    mapStateToProps as sourceMapStateToProps,
    ProductActionsContainer as SourceProductActionsContainer
} from 'SourceComponent/ProductActions/ProductActions.container';
import { changeNavigationState, goToPreviousNavigationState } from 'Store/Navigation/Navigation.action';
import { TOP_NAVIGATION_TYPE } from 'Store/Navigation/Navigation.reducer';
import { hideActiveOverlay, toggleOverlayByKey } from 'Store/Overlay/Overlay.action';
import { appendWithStoreCode } from 'Util/Url';

import { data as patchData } from './patch_sample_data';

/** @namespace Scandipwa/Component/ProductActions/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    navigationState: state.NavigationReducer[TOP_NAVIGATION_TYPE].navigationState
});

/** @namespace Scandipwa/Component/ProductActions/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showOverlay: (overlayKey) => dispatch(toggleOverlayByKey(overlayKey)),
    hideActiveOverlay: () => dispatch(hideActiveOverlay()),
    setNavigationState: (stateName) => dispatch(changeNavigationState(TOP_NAVIGATION_TYPE, stateName)),
    goToPreviousNavigationState: () => dispatch(goToPreviousNavigationState(TOP_NAVIGATION_TYPE))
});

/** @namespace Scandipwa/Component/ProductActions/Container */
export class ProductActionsContainer extends SourceProductActionsContainer {
    state = {
        ...this.state,
        isAddPatchDropOpen: false,
        patchData,
        searchCriteria: '',
        patchList: [{
            id: nanoid(),
            Sku: '-',
            name: '-',
            price: '-',
            quantity: '0',
            discount: '0',
            line: '-'
        }]
    };

    static propTypes = {
        ...SourceProductActionsContainer.propTypes,
        addAnotherPatch: PropTypes.func.isRequired,
        findObjFromSku: PropTypes.func.isRequired,
        patchSelectionChange: PropTypes.func.isRequired,
        patchInputOnChange: PropTypes.func.isRequired,
        deletePatchRow: PropTypes.func.isRequired,
        updatePatchQuantityButton: PropTypes.func.isRequired,
        goToPreviousNavigationState: PropTypes.func.isRequired,
        showOverlay: PropTypes.func.isRequired,
        hideActiveOverlay: PropTypes.func.isRequired
    };

    containerFunctions = {
        ...this.containerFunctions,
        toggleDropDown: this.toggleDropDown.bind(this),
        addAnotherPatch: this.addAnotherPatch.bind(this),
        patchSelectionChange: this.patchSelectionChange.bind(this),
        deletePatchRow: this.deletePatchRow.bind(this),
        updatePatchQuantityButton: this.updatePatchQuantityButton.bind(this),
        patchInputOnChange: this.patchInputOnChange.bind(this),
        onSearchBarChange: this.onSearchBarChange.bind(this),
        onSearchBarFocus: this.onSearchBarFocus.bind(this),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(this)
    };

    containerProps() {
        const {
            activeOverlay,
            navigationState
        } = this.props;

        const {
            isAddPatchDropOpen,
            patchList,
            searchCriteria
        } = this.state;

        return {
            ...super.containerProps(),
            isAddPatchDropOpen,
            patchData,
            patchList,
            searchCriteria,
            activeOverlay,
            navigationState
        };
    }

    onSearchBarChange({ target: { value: searchCriteria } }) {
        this.setState({ searchCriteria });
        console.log('ccheck i got clicked', searchCriteria);
    }

    onSearchBarFocus() {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            navigationState: { name },
            device
        } = this.props;

        if (
            (!device.isMobile && name === SEARCH)
            || (device.isMobile && name !== MENU)
        ) {
            return;
        }

        showOverlay(SEARCH);

        setNavigationState({
            name: SEARCH,
            onBackClick: () => {
                showOverlay(MENU);
                goToPreviousNavigationState();
            }
        });
    }

    onSearchOutsideClick() {
        const {
            goToPreviousNavigationState,
            navigationState: { name }
        } = this.props;

        if (name === SEARCH) {
            this.hideSearchOverlay();
            goToPreviousNavigationState();
        }
    }

    addAnotherPatch() {
        const { patchList } = this.state;
        this.setState({
            patchList: [...patchList, {
                id: nanoid(),
                Sku: '-',
                name: '-',
                price: '-',
                quantity: '0',
                discount: '0',
                line: '-'
            }]
        });
    }

    findObjFromSku(Sku) {
        const Obj = patchData.find((patch) => patch.Sku === Sku);
        if (typeof Obj !== 'undefined') {
            return Obj;
        }

        return {
            id: nanoid(),
            Sku: '-',
            name: '-',
            price: '-',
            quantity: '0',
            discount: '0',
            line: '-'
        };
    }

    patchSelectionChange(e, rowId) {
        const { patchList } = this.state;
        const patchObj = this.findObjFromSku(e.target.value);

        this.setState({
            patchList: patchList.map((patch) => {
                if (patch.id === rowId) {
                    return patchObj;
                }

                return patch;
            })
        });
    }

    patchInputOnChange(e, rowId) {
        const { patchList } = this.state;
        const { name } = e.target;
        // eslint-disable-next-line fp/no-let
        let { value } = e.target;

        this.setState({
            patchList: patchList.map((patch) => {
                const newObj = patch;
                if (patch.id === rowId) {
                    if (name === 'discount') {
                        if (value < 0) {
                            value = 0;
                        // eslint-disable-next-line no-magic-numbers
                        } else if (value > 100) {
                        // eslint-disable-next-line no-magic-numbers
                            value = 100;
                        }
                    }
                    if (name === 'quantity') {
                        if (value < 1) {
                            value = 1;
                        }
                    }
                    newObj[name] = value;
                }

                return patch;
            })
        });
    }

    deletePatchRow(rowId) {
        const { patchList } = this.state;

        this.setState({
            patchList: patchList.filter((patch) => patch.id !== rowId)
        });
    }

    updatePatchQuantityButton(mode, rowId) {
        const { patchList } = this.state;

        this.setState({
            patchList: patchList.map((patch) => {
                if (patch.id === rowId) {
                    const newObj = patch;
                    if (mode > 0) {
                        newObj.quantity++;
                    } else if (mode < 0 && (newObj.quantity - 1) > 0) {
                        newObj.quantity--;
                    }

                    return newObj;
                }

                return patch;
            })
        });
    }

    toggleDropDown() {
        const { isAddPatchDropOpen } = this.state;
        this.setState({ isAddPatchDropOpen: !isAddPatchDropOpen });
    }

    getNavigationState() {
        const { navigationState } = this.props;

        const { pathname } = location;
        const { state: historyState } = window.history || {};
        const { state = {} } = historyState || {};

        // TODO: something here breaks /<STORE CODE> from being opened, and / when, the url-based stores are enabled.

        const activeRoute = Object.keys(this.routeMap)
            .find((route) => (
                route !== '/'
                || pathname === appendWithStoreCode('/')
                || pathname === '/'
            ) && pathname.includes(route));

        if (state.category || state.product || state.page || state.popupOpen) { // keep state if it category is in state
            return navigationState;
        }

        return this.routeMap[activeRoute] || this.default_state;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
