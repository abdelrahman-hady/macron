<?php
/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model;

use Macron\ErpGraphQl\Api\InvoicesRepositoryInterface;
use Macron\ErpGraphQl\Model\ResourceModel\InvoicesCollection\Collection as InvoicesCollectionFactory;
use Magento\Framework\DataObject;

class InvoicesRepository implements InvoicesRepositoryInterface
{
    /**
     * @var InvoicesCollectionFactory
     */
    private InvoicesCollectionFactory $invoicesCollectionFactory;

    /**
     * @param InvoicesCollectionFactory $invoicesCollectionFactory
     */
    public function __construct(
        InvoicesCollectionFactory $invoicesCollectionFactory,
    ) {
        $this->invoicesCollectionFactory = $invoicesCollectionFactory;
    }

    /**
     * @return array|DataObject[]
     */
    public function getList()
    {
        $collection = $this->invoicesCollectionFactory;
        $erp_invoice_cols = ['id', 'invoice_number', 'user_sap_id', 'date', 'grand_total', 'status', 'download_link'];
        $customer_entity_cols = [
            'entity_id',
            'email',
            'firstname',
            'lastname',
            'phone_number',
            'business_partner_id',
            'default_shipping'
        ];
        $customer_address_entity_cols = [
            'entity_id',
            'parent_id',
            'city as address_city',
            'company as address_company',
            'country_id as address_country_id',
            'fax as address_fax',
            'firstname as address_firstname',
            'lastname as address_lastname',
            'postcode as address_postcode',
            'street as address_street',
            'telephone as address_telephone'
        ];
        $collection->getSelect()
            ->columns($erp_invoice_cols)
            ->joinLeft(
                ['ceTable' => $collection->getTable('customer_entity')],
                'main_table.user_sap_id = ceTable.business_partner_id', $customer_entity_cols)
            ->joinLeft(
                ['caeTable' => $collection->getTable('customer_address_entity')],
                'ceTable.entity_id = caeTable.parent_id', $customer_address_entity_cols)
            ->where('ceTable.default_shipping = caeTable.entity_id');
        return $collection->getItems();
    }
}
