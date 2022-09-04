/*
 * @category  Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ContentWrapper from 'Component/ContentWrapper';
import Loader from 'Component/Loader';

/** @namespace Scandipwa/Route/StatsPage/Component */
export class StatsPageComponent extends PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool
        // isEnabled: PropTypes.bool.isRequired,
        // isMobile: PropTypes.bool.isRequired
    };

    static defaultProps = {
        isLoading: false
    };

    renderPageContent() {
        return (
            <div block="Stats Page" elem="ContentField">
                Content goes here.
            </div>
        );
    }

    renderPage() {
        return (
            <ContentWrapper label="Stats Page">
                <h1>{ __('Stats') }</h1>
                { this.renderPageContent() }
            </ContentWrapper>
        );
    }

    render() {
        const { isLoading } = this.props;

        return (
            <main block="StatsPage">
                <Loader isLoading={ isLoading } />
                { this.renderPage() }
            </main>
        );
    }
}

export default StatsPageComponent;
