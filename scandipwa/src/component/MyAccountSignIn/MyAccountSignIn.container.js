import { connect } from 'react-redux';

import { mapDispatchToProps, mapStateToProps, MyAccountSignInContainer as SourceMyAccountSignInContainer } from
'SourceComponent/MyAccountSignIn/MyAccountSignIn.container';

/** @namespace Scandipwa/Component/MyAccountSignIn/Container */
export class MyAccountSignInContainer extends SourceMyAccountSignInContainer {
    state = {
        ...super.state,
        isPasswordVisible: false
    };

    containerFunctions = {
        ...super.containerFunctions,
        onPasswordVisibilityClick: this.onPasswordVisibilityClick.bind(this)
    };

    onPasswordVisibilityClick() {
        alert('called');
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountSignInContainer);
