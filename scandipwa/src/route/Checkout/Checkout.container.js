import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    CheckoutContainer as SourceCheckoutContainer,
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceRoute/Checkout/Checkout.container';

export {
    mapDispatchToProps
};

/** @namespace Scandipwa/Route/Checkout/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    note: state.OrderNotesReducer.note,
    internalNote: state.OrderNotesReducer.internalNote
});

/** @namespace Scandipwa/Route/Checkout/Container */
export class CheckoutContainer extends SourceCheckoutContainer {
    static propTypes = {
        ...super.propTypes,
        note: PropTypes.string.isRequired,
        internalNote: PropTypes.string.isRequired
    };

    containerProps() {
        const {
            note,
            internalNote
        } = this.props;

        return {
            ...super.containerProps(),
            note,
            internalNote
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
