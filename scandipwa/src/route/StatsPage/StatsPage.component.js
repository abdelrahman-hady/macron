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
                <h1>__(Stats)</h1>
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
