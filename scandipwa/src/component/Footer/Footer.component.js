import PropTypes from 'prop-types';

import {
    Footer as SourceFooter
} from 'SourceComponent/Footer/Footer.component';
import { isSignedIn } from 'Util/Auth';

/** @namespace Scandipwa/Component/Footer/Component */
export class FooterComponent extends SourceFooter {
    static propTypes = {
        ...super.propTypes,
        isSignedIn: PropTypes.bool.isRequired
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    shouldComponentUpdate(nextProps) {
        const {
            device: {
                isMobile
            },
            isVisibleOnMobile,
            copyright,
            newsletterActive,
            isSignedIn
        } = this.props;

        const {
            device: {
                isMobile: nextIsMobile
            },
            isVisibleOnMobile: nextIsVisibleOnMobile,
            copyright: nextCopyright,
            newsletterActive: nextNewsletterActive,
            isSignedIn: nextIsSignedIn
        } = nextProps;

        return isMobile !== nextIsMobile
            || isVisibleOnMobile !== nextIsVisibleOnMobile
            || copyright !== nextCopyright
            || newsletterActive !== nextNewsletterActive
            || isSignedIn !== nextIsSignedIn;
    }

    render() {
        if (isSignedIn()) {
            return super.render();
        }

        return null;
    }
}

export default FooterComponent;
