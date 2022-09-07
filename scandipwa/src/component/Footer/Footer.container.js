import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    FooterContainer as SourceFooterContainer,
    mapDispatchToProps,
    mapStateToProps as sourceMapStateToProps
} from 'SourceComponent/Footer/Footer.container';

export {
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/Footer/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    ...sourceMapStateToProps(state),
    isSignedIn: state.MyAccountReducer.isSignedIn
});

/** @namespace Scandipwa/Component/Footer/Container */
export class FooterContainer extends SourceFooterContainer {
    static propTypes = {
        ...super.propTypes,
        isSignedIn: PropTypes.bool.isRequired
    };

    containerProps() {
        const {
            isSignedIn
        } = this.props;

        return {
            ...super.containerProps(),
            isSignedIn
        };
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
