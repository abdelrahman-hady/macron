/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import VisibleIcon from '../../../public/svg/Visible.icon.svg';

import './VisibilityIcon.style';

/** @namespace Scandipwa/Component/VisibilityIcon/Component */
export class VisibilityIconComponent extends PureComponent {
    static propTypes = {
        // isActive: PropTypes.bool
    };

    static defaultProps = {
        isActive: false
    };

    render() {
        // eslint-disable-next-line react/prop-types
        const { onClick } = this.props;

        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <button onClick={ onClick } block="VisibilityIcon" elem="Wrapper">
                <img
                  src={ VisibleIcon }
                  alt=""
                  block="VisibilityIcon"
                  elem="Icon"
                />
            </button>
        );
    }
}

export default VisibilityIconComponent;
