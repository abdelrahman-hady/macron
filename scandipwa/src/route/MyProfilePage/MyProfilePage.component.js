/*
 * @category Macron
 * @author    Shehab Mohsen <shehab.mohsen@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

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
