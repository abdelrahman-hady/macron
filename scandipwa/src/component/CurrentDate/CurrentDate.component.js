/**
  * @category    Macron
  * @author      Saad Amir <saad.amir@scandiweb.com | info@scandiweb.com>
  * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
  * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
*/

import { PureComponent } from 'react';
/** @namespace Scandipwa/Component/CurrentDate/Component */
export class CurrentDateComponent extends PureComponent {
    state={
        dateToday: new Date(Date.now()).toLocaleString().split(',')[0]
    };

    render() {
        const { dateToday } = this.state;
        return (
            <span block="CurrentDate">
                { dateToday }
            </span>
        );
    }
}

export default CurrentDateComponent;
