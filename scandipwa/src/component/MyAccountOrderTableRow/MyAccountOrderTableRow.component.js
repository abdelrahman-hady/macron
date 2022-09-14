/*
 * @category  Macron
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { OrderType } from 'Type/Order.type';
import { formatPrice } from 'Util/Price';

import './MyAccountOrderTableRow.style';

/** @namespace Scandipwa/Component/MyAccountOrderTableRow/Component */
export class MyAccountOrderTableRowComponent extends PureComponent {
    static propTypes = {
        order: OrderType.isRequired,
        onViewClick: PropTypes.func.isRequired
    };

    render() {
        const {
            order: {
                created_at,
                status,
                increment_id,
                user_customer_name,
                total: {
                    grand_total: {
                        value,
                        currency
                    } = {}
                } = {}
            },
            onViewClick
        } = this.props;
        const incrementID = increment_id ? `#${increment_id}` : '';
        const totalValue = value ? formatPrice(value, currency) : '';
        return (
            <tr onClick={ onViewClick } block="MyAccountOrderTableRow">
                <td>{ incrementID }</td>
                <td>{ user_customer_name }</td>
                <td>{ created_at }</td>
                <td>{ status }</td>
                <td block="hidden-mobile">
                    { totalValue }
                </td>
            </tr>
        );
    }
}

export default MyAccountOrderTableRowComponent;
