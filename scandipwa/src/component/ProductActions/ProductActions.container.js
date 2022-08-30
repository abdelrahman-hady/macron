import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    ProductActionsContainer as SourceProductActionsContainer
} from 'SourceComponent/ProductActions/ProductActions.container';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/ProductActions/Container */
export class ProductActionsContainer extends SourceProductActionsContainer {
    /*
    __construct(props) {
        super.__construct(props, 'ProductActionsContainer');

        this.state = {
            isAddPatchDropOpen: true
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

    */
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionsContainer);
