/*
 * @category  Macron
 * @author    Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { connect } from 'react-redux';

import {
    mapDispatchToProps,
    mapStateToProps,
    MyAccountOrderTableRowContainer as SourceMyAccountOrderTableRowContainer
} from 'SourceComponent/MyAccountOrderTableRow/MyAccountOrderTableRow.container';

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Container */
export class MyAccountOrderTableRowContainer extends SourceMyAccountOrderTableRowContainer {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountOrderTableRowContainer);
