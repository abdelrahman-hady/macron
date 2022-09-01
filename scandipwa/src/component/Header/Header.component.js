import { Header as SourceHeader } from
'SourceComponent/Header/Header.component';
import { isSignedIn } from 'Util/Auth';
import history from 'Util/History';

/** @namespace Scandipwa/Component/Header/Component */
export class HeaderComponent extends SourceHeader {
    render() {
        if (!isSignedIn() && location.pathname !== '/' && location.pathname !== '/styleguide') {
            history.push('/');
        }

        return super.render();
    }
}

export default HeaderComponent;
