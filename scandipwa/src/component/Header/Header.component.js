import {
    CartOverlay,
    Header as SourceHeader,
    MyAccountOverlay
} from 'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';

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

        return null;
    }
}

export default HeaderComponent;
