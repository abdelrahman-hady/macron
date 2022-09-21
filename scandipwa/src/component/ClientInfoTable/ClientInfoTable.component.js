/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import PropTypes from 'prop-types';

import KeyValueTable from 'Component/KeyValueTable';
import { ClientType } from 'Type/Client.type';

/** @namespace Scandipwa/Component/ClientInfoTable/Component */
export class ClientInfoTableComponent extends KeyValueTable {
    static propTypes = {
        title: PropTypes.string,
        data: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                label: PropTypes.string
            })
        ).isRequired,
        client: ClientType.isRequired
    };

    static defaultProps = {
        title: ''
    };

    // eslint-disable-next-line @scandipwa/scandipwa-guidelines/only-render-in-component
    get dataPairArray() {
        const { data, client } = this.props;
        const dataPairArray = [];

        data.forEach(({ key, label }) => {
            dataPairArray.push({ key, label: `${label}:`, source: client });
        });

        return dataPairArray;
    }

    render() {
        return (
            <div block="ClientInfoTable">
                { this.renderTable() }
            </div>
        );
    }
}

export default ClientInfoTableComponent;
