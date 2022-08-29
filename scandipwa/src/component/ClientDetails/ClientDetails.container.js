/*
 * @category  Macron
 * @author    Mariam Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

// import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import ClientDetails from './ClientDetails.component';

/** @namespace Scandipwa/Component/ClientDetails/Container */
export class ClientDetailsContainer extends PureComponent {
    static propTypes = {
        // TODO: implement prop-types
    };

    containerFunctions = {
        // getData: this.getData.bind(this)
    };

    containerProps = () => {
        // isDisabled: this._getIsDisabled()
    };

    render() {
        return (
            <ClientDetails
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default ClientDetailsContainer;
