/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

import { Field } from 'Util/Query';

/** @namespace Scandipwa/Query/Invoice/Query */
export class InvoiceQuery {
    getInvoicesQuery() {
        return new Field('invoices')
            .addFieldList(this._getInvoiceFields());
    }

    getInvoiceQuery(invoiceId) {
        return new Field('invoice')
            .addArgument('invoice_id', 'Int!', invoiceId)
            .addFieldList(this._getInvoiceFields());
    }

    _getInvoiceFields() {
        return [
            'id',
            'invoice_number',
            'date',
            'customer',
            'address',
            'total',
            'status'
        ];
    }
}

export default new InvoiceQuery();
