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
                Sku: '-',
                name: '-',
                price: '-',
                quantity: '0',
                discount: '0',
                line: '-'
            }]
        };
    }

    static propTypes = {
        ...SourceProductActionsContainer.propTypes,
        addAnotherPatch: PropTypes.func.isRequired,
        findObjFromSku: PropTypes.func.isRequired,
        patchSelectionChange: PropTypes.func.isRequired,
        patchInputOnChange: PropTypes.func.isRequired,
        deletePatchRow: PropTypes.func.isRequired,
        updatePatchQuantityButton: PropTypes.func.isRequired
    };

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
