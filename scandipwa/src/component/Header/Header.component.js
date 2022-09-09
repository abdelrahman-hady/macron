/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    CartOverlay,
    Header as SourceHeader,
    MyAccountOverlay
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

export {
    CartOverlay,
    MyAccountOverlay
};

/** @namespace Scandipwa/Component/Header/Component */
export class HeaderComponent extends SourceHeader {
    render() {
        if (isSignedIn()) {
            return super.render();
        }

        history.replace(appendWithStoreCode('/'));
        return null;
    }
}

export default HeaderComponent;
