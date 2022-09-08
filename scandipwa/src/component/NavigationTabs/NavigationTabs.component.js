/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    NavigationTabs as SourceNavigationTabs
} from 'SourceComponent/NavigationTabs/NavigationTabs.component';
import { isSignedIn } from 'Util/Auth';
/** @namespace Scandipwa/Component/NavigationTabs/Component */
export class NavigationTabsComponent extends SourceNavigationTabs {
    render() {
        if (isSignedIn()) {
            return super.render();
        }

        return null;
    }
}

export default NavigationTabsComponent;
