/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Invoice/Query */
export class InvoiceQuery {
    getInvoicesQuery(options) {
        const { page, pageSize } = options ?? {};
        return new Field('invoices')
            .addArgument('currentPage', 'Int', page)
            .addArgument('pageSize', 'Int', pageSize)
            .addFieldList(this._getInvoiceFields());
    }

    _getInvoiceFields() {
        return [
            'id',
            'invoice_number',
            'date',
            'firstname',
            'lastname',
            'due_date',
            'currency',
            'grand_total',
            'status'
        ];
    }
}

export default new InvoiceQuery();
