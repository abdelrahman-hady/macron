import { connect } from 'react-redux';

import {
    mapDispatchToProps
} from 'SourceComponent/Product/Product.container';
import { mapStateToProps, ProductActionsContainer as SourceProductActionsContainer }
from 'SourceComponent/ProductActions/ProductActions.container';

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
            isAddPatchDropOpen: false
        };
    }

    containerProps() {
        const {
            isAddPatchDropOpen
        } = this.state;

        return {
            ...super.containerProps(),
            isAddPatchDropOpen
        };
    }

    toggleDropDown() {
        const { isAddPatchDropOpen } = this.state;
        this.setState({ isAddPatchDropOpen: !isAddPatchDropOpen });
    }

    containerFunctions = {
        ...this.containerFunctions,
        toggleDropDown: this.toggleDropDown.bind(this)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
