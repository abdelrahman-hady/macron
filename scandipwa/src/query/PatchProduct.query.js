/*
 * @category  Macron
 * @author    Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/PatchProduct/Query */
export class PatchProductQuery {
    getPatchProductQuery() {
        return new Field('patchProductCollection')
            .addFieldList(this._getPatchProductField());
    }

    _getPatchProductField() {
        return new Field('allPatchProducts')
            .addFieldList(this._getPatchProductFields());
    }

    _getPatchProductFields() {
        return [
            'sku',
            'name',
            'price'
        ];
    }
}

export default new PatchProductQuery();
