/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @author      Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
  */

/* eslint-disable max-lines */

import { nanoid } from 'nanoid';
import { connect } from 'react-redux';

import PatchProductQuery from 'Query/PatchProduct.query';
import {
    mapDispatchToProps as sourceMapDispatchToProps
} from 'SourceComponent/Product/Product.container';
import { mapStateToProps, ProductActionsContainer as SourceProductActionsContainer }
from 'SourceComponent/ProductActions/ProductActions.container';
import { showNotification } from 'Store/Notification/Notification.action';
import { fetchQuery, getErrorMessage } from 'Util/Request';

export {
    mapStateToProps
};

/** @namespace Scandipwa/Component/ProductActions/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    ...sourceMapDispatchToProps(dispatch),
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace Scandipwa/Component/ProductActions/Container */
export class ProductActionsContainer extends SourceProductActionsContainer {
    state = {
        ...this.state,
        isAddPatchDropOpen: false,
        patchCodes: [],
        patchData: [],
        patchList: []
    };

    containerFunctions = {
        ...this.containerFunctions,
        toggleDropDown: this.toggleDropDown.bind(this),
        addAnotherPatch: this.addAnotherPatch.bind(this),
        patchSelectionChange: this.patchSelectionChange.bind(this),
        deletePatchRow: this.deletePatchRow.bind(this),
        updatePatchQuantityButton: this.updatePatchQuantityButton.bind(this),
        patchInputOnChange: this.patchInputOnChange.bind(this),
        patchCodeInputChange: this.patchCodeInputChange.bind(this),
        openSelectPatch: this.openSelectPatch.bind(this),
        closeSelectPatch: this.closeSelectPatch.bind(this),
        getFilteredPatchCodes: this.getFilteredPatchCodes.bind(this),
        getPatchListFromSku: this.getPatchListFromSku.bind(this)
    };

    componentDidMount() {
        this.requestPatchProducts();
    }

    componentDidUpdate(prevProps, prevState) {
        super.componentDidUpdate(prevProps, prevState);

        const { product: prevProduct } = prevProps;
        const { product } = this.props;

        if (product !== prevProduct) {
            this.requestPatchProducts();
            this.setState({
                patchList: this.getPatchListFromSku(product.sku)
            });
        }
    }

    containerProps() {
        const {
            isAddPatchDropOpen,
            patchList,
            patchCodes
        } = this.state;

        return {
            ...super.containerProps(),
            isAddPatchDropOpen,
            patchList,
            patchCodes
        };
    }

    getFilteredPatchCodes(key = '') {
        const pattern = new RegExp(`^${key}`, 'i');
        const { patchList, patchData } = this.state;

        const unSelectedData = patchData.filter((patch) => {
            const tryToFind = patchList.find((obj) => obj.sku === patch.sku);
            if (typeof tryToFind !== 'undefined') {
                return false;
            }

            return true;
        });

        if (key === '-' || !key || key === '') {
            this.setState({
                patchCodes: unSelectedData.map((patch) => patch.sku)
            });
        } else {
            const filteredData = unSelectedData.filter((patch) => pattern.test(patch.sku));
            this.setState({
                patchCodes: filteredData.map((patch) => patch.sku)
            });
        }
    }

    getPatchListFromSku(sku) {
        const { patchData } = this.state;

        const list = patchData.find((product) => product.sku === sku);
        if (typeof list !== 'undefined' && list.length > 0) {
            return list.patchList.map((patch) => {
                const newObj = patch;
                newObj.id = nanoid();
                newObj.quantity = 1;
                newObj.discount = 0;
                newObj.code = newObj.sku;
                newObj.line = this.calculatePatchLine(newObj.price, newObj.quantity, newObj.discount).toFixed(2);
                return newObj;
            });
        }

        return [{
            id: nanoid(),
            sku: '-',
            name: '-',
            price: '-',
            quantity: '0',
            discount: '0',
            code: '',
            line: '-'
        }];
    }

    async requestPatchProducts() {
        const { showErrorNotification } = this.props;

        try {
            const {
                patchProductCollection:
                { allPatchProducts }
            } = await fetchQuery(PatchProductQuery.getPatchProductQuery());

            this.setState({ patchData: allPatchProducts });
        } catch (e) {
            showErrorNotification(getErrorMessage(e));
        }
    }

    addAnotherPatch() {
        const { patchList } = this.state;

        this.requestPatchProducts();

        this.setState({
            patchList: [...patchList, {
                id: nanoid(),
                sku: '-',
                name: '-',
                price: '-',
                quantity: '0',
                discount: '0',
                line: '-'
            }]
        });
    }

    calculatePatchLine(price, quantity, discount) {
        // eslint-disable-next-line no-magic-numbers
        return (price * quantity) - (price * quantity * (discount / 100));
    }

    findObjFromSku(sku) {
        const { patchData } = this.state;

        const Obj = patchData.find((patch) => patch.sku === sku);
        if (typeof Obj !== 'undefined') {
            Obj.id = nanoid();
            Obj.quantity = 1;
            Obj.discount = 0;
            Obj.line = this.calculatePatchLine(Obj.price, Obj.quantity, Obj.discount).toFixed(2);
            return Obj;
        }

        return {
            id: nanoid(),
            sku: '-',
            name: '-',
            price: '-',
            quantity: '0',
            discount: '0',
            line: '-'
        };
    }

    patchCodeInputChange(e, rowId) {
        e.preventDefault();
        const { patchList } = this.state;

        this.setState({
            patchList: patchList.map((patch) => {
                if (patch.id === rowId) {
                    const patchObj = patch;
                    patchObj.code = e.target.value;
                    return patchObj;
                }

                return patch;
            })
        });
        this.getFilteredPatchCodes(e.target.value);
    }

    patchSelectionChange(e, rowId) {
        const { patchList } = this.state;
        const patchObj = this.findObjFromSku(e.target.textContent);
        this.setState({
            patchList: patchList.map((patch) => {
                if (patch.id === rowId) {
                    patchObj.code = patchObj.sku;
                    return patchObj;
                }

                return patch;
            })
        });
    }

    patchInputOnChange(e, rowId) {
        e.preventDefault();

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
                    newObj.line = this.calculatePatchLine(newObj.price, newObj.quantity, newObj.discount).toFixed(2);
                    return newObj;
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
                    newObj.line = this.calculatePatchLine(newObj.price, newObj.quantity, newObj.discount).toFixed(2);
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

    openSelectPatch(e, rowId) {
        const { patchList } = this.state;

        this.setState({
            patchList: patchList.map((patch) => {
                if (patch.id === rowId) {
                    const openRow = patchList.find((patch) => patch.id === rowId);
                    openRow.isSelectOpen = true;
                    return openRow;
                }

                return patch;
            })
        });
        this.getFilteredPatchCodes(e.target.value);
    }

    closeSelectPatch(rowId, wasOpen) {
        if (!wasOpen) {
            return;
        }
        const { patchList } = this.state;
        this.setState({
            patchList: patchList.map((patch) => {
                const openRow = patch;
                if (patch.sku !== patch.code) {
                    if (patch.sku !== '-') {
                        openRow.code = patch.sku;
                    } else {
                        openRow.code = '';
                    }
                }
                if (patch.id === rowId) {
                    openRow.isSelectOpen = false;
                    return openRow;
                }

                return openRow;
            })
        });
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
