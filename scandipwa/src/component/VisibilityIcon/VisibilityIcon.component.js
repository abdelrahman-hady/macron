/*
 * @category Macron
 * @author    Lena Sinichenkova <lena.sinichenkova@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import hidePasswordIcon from '../../../public/svg/Visible.icon.svg';

import './VisibilityIcon.style';

/** @namespace Scandipwa/Component/VisibilityIcon/Component */
export class VisibilityIconComponent extends PureComponent {
    static propTypes = {
        isVisible: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        onClick: () => {},
        isVisible: false
    };

    render() {
        const { onClick, isVisible } = this.props;

        return (
            <button
              type="button"
              onClick={ onClick }
              block="VisibilityButton"
              elem="IconWrapper"
            >
                <img
                  src={ isVisible ? hidePasswordIcon : hidePasswordIcon }
                  alt=""
                  block="VisibilityButton"
                  elem="Icon"
                />
            </button>
        );
    }
}

export default VisibilityIconComponent;
