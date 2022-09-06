/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountTabListContainer as SourceMyAccountTabListContainer
} from 'SourceComponent/MyAccountTabList/MyAccountTabList.container';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Component/MyAccountTabList/Container */
export class MyAccountTabListContainer extends SourceMyAccountTabListContainer {
    async handleLogout() {
        const { onSignOut, logout } = this.props;

        await logout();
        onSignOut();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountTabListContainer);
