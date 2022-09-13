/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
*/

import { PureComponent } from 'react';

import CurrentDate from './CurrentDate.component';

/** @namespace Scandipwa/Component/CurrentDate/Container */
export class CurrentDateContainer extends PureComponent {
    static propTypes = {
    };

    containerFunctions = {
    };

    containerProps() {
    }

    render() {
        return (
            <CurrentDate
              { ...this.containerFunctions }
              { ...this.containerProps() }
            />
        );
    }
}

export default CurrentDateContainer;
