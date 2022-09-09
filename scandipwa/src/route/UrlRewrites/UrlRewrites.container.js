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
    UrlRewritesContainer as SourceUrlRewritesContainer
} from 'SourceRoute/UrlRewrites/UrlRewrites.container';
import { isSignedIn } from 'Util/Auth';

export {
    mapStateToProps,
    mapDispatchToProps
};

/** @namespace Scandipwa/Route/UrlRewrites/Container */
export class UrlRewritesContainer extends SourceUrlRewritesContainer {
    componentDidMount() {
        if (isSignedIn()) {
            this.requestUrlRewrite();

            this.initialUrl = location.pathname;
        }
    }

    componentDidUpdate() {
        const { isLoading } = this.props;

        /**
         * If the latest requested URL rewrite is not related
         * to the current location, and the URL rewrites are not loading
         * request new URL rewrite.
         */
        if (this.getIsLoading() && !isLoading && isSignedIn()) {
            this.requestUrlRewrite();
        }

        /**
         * Make sure that PDP & PLP url don't have "/" in the end
         */
        this.redirectToCorrectUrl();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UrlRewritesContainer);
