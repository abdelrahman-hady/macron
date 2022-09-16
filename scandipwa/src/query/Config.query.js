/*
 * @category  Macron
 * @author    Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import {
    ConfigQuery as SourceConfigQuery
} from 'SourceQuery/Config.query';
import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Config/Query */
export class ConfigQuery extends SourceConfigQuery {
    getQuery() {
        return new Field('storeConfig')
            .addFieldList([...this._getStoreConfigFields(), ...this._getMacronStoreConfigFields()]);
    }

    _getMacronStoreConfigFields() {
        return [
            'xperpage',
            'stock_cache_lifetime'
        ];
    }
}

export default new ConfigQuery();
