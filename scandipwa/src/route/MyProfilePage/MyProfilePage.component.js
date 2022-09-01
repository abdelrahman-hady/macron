// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

/** @namespace Scandipwa/Route/MyProfilePage/Component */
export class MyProfilePageComponent extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };
    // eslint-disable-next-line lines-between-class-members
    renderTitle() {
        return (
            <h1>
                { __('My Profile') }
            </h1>
        );
    }

    render() {
        return (
            <div block="MyProfilePage">
                { this.renderTitle() }
            </div>
        );
    }
}

export default MyProfilePageComponent;
