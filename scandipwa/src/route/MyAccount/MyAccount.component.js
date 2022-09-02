/*
 * @category  Macron
 * @author    Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

/* eslint-disable react/jsx-no-bind */
/* eslint-disable @scandipwa/scandipwa-guidelines/no-jsx-variables */
/* eslint-disable max-len */
/* eslint-disable @scandipwa/scandipwa-guidelines/jsx-no-props-destruction */

import { MyAccount as SourceMyAccount } from 'SourceRoute/MyAccount/MyAccount.component';
import { isSignedIn } from 'Util/Auth';

/** @namespace Scandipwa/Route/MyAccount/Component */
export class MyAccountComponent extends SourceMyAccount {
    renderContent() {
        if (!isSignedIn()) {
            return this.renderLoginOverlay();
        }

        return null;
    }
}

export default MyAccountComponent;
