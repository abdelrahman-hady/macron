/* eslint-disable no-magic-numbers */
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';

import {
    mapDispatchToProps
} from 'SourceComponent/Product/Product.container';
import { mapStateToProps, ProductActionsContainer as SourceProductActionsContainer }
from 'SourceComponent/ProductActions/ProductActions.container';

import { data as patchData } from './patch_sample_data';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/ProductActions/Container */
export class ProductActionsContainer extends SourceProductActionsContainer {
    __construct(props) {
        super.__construct(props, 'ProductActionsContainer');

        this.state = {
            ...this.state,
            isAddPatchDropOpen: false,
            patchData,
            patchList: [{
                id: nanoid(),
                sku: '-',
                name: '-',
                price: '-',
                quantity: '0',
                discount: '0',
                line: '-'
            }]
        };
    }

    containerProps() {
        const {
            isAddPatchDropOpen,
            patchList
        } = this.state;

        return {
            ...super.containerProps(),
            isAddPatchDropOpen,
            patchData,
            patchList
        };
    }

    addAnotherPatch() {
        const { patchList } = this.state;
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

    findObjFromSKU(SKU) {
        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < patchData.length; i++) {
            if (patchData[i].sku === SKU) {
                return patchData[i];
            }
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

    patchSelectionChange(e, rowId) {
        const { patchList } = this.state;
        const patchObj = this.findObjFromSKU(e.target.value);
        const copyList = [];
        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < patchList.length; i++) {
            if (patchList[i].id === rowId) {
                copyList.push({
                    ...patchObj
                });
            } else {
                copyList.push(patchList[i]);
            }
        }
        this.setState({
            patchList: Array.from(copyList)
        });
    }

    patchInputOnChange(e, rowId) {
        const { patchList } = this.state;
        const copyList = [];
        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < patchList.length; i++) {
            if (patchList[i].id === rowId) {
                const newObj = patchList[i];
                const { name } = e.target;
                // eslint-disable-next-line fp/no-let
                let { value } = e.target;
                if (name === 'discount') {
                    if (value < 0) {
                        value = 0;
                    } else if (value > 100) {
                        value = 100;
                    }
                }
                if (name === 'quantity') {
                    if (value < 1) {
                        value = 1;
                    }
                }
                newObj[name] = value;
                copyList.push(newObj);
            } else {
                copyList.push(patchList[i]);
            }
        }
        this.setState({
            patchList: Array.from(copyList)
        });
    }

    deletePatchRow(rowId) {
        const { patchList } = this.state;
        const copyList = [];
        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < patchList.length; i++) {
            if (patchList[i].id !== rowId) {
                copyList.push(patchList[i]);
            }
        }
        this.setState({
            patchList: Array.from(copyList)
        });
    }

    updatePatchQuantityButton(mode, rowId) {
        const { patchList } = this.state;
        const copyList = [];
        // eslint-disable-next-line fp/no-let
        for (let i = 0; i < patchList.length; i++) {
            if (patchList[i].id === rowId) {
                const newObj = patchList[i];
                if (mode > 0) {
                    newObj.quantity++;
                } else if (mode < 0 && (newObj.quantity - 1) > 0) {
                    newObj.quantity--;
                }
                copyList.push(newObj);
            } else {
                copyList.push(patchList[i]);
            }
        }
        this.setState({
            patchList: Array.from(copyList)
        });
    }

    updatePatchQuantity() {

    }

    toggleDropDown() {
        const { isAddPatchDropOpen } = this.state;
        this.setState({ isAddPatchDropOpen: !isAddPatchDropOpen });
    }

    containerFunctions = {
        ...this.containerFunctions,
        toggleDropDown: this.toggleDropDown.bind(this),
        addAnotherPatch: this.addAnotherPatch.bind(this),
        patchSelectionChange: this.patchSelectionChange.bind(this),
        deletePatchRow: this.deletePatchRow.bind(this),
        updatePatchQuantityButton: this.updatePatchQuantityButton.bind(this),
        patchInputOnChange: this.patchInputOnChange.bind(this)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
