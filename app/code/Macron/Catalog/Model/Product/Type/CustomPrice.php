<?php
/**
 * @category    Macron
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\Catalog\Model\Product\Type;

use Magento\Framework\App\ResourceConnection;
use Magento\Framework\DB\Adapter\AdapterInterface;

class CustomPrice
{
    /**
     * @var AdapterInterface
     */
    protected AdapterInterface $connection;

    /**
     * @param ResourceConnection $resourceConnection
     */
    public function __construct(
        ResourceConnection $resourceConnection
    ) {
        $this->resourceConnection = $resourceConnection;
        $this->connection = $this->resourceConnection->getConnection();
    }

    /**
     * get current customer retail price by sku
     * @param $sku
     * @param $currentCustomer
     * @return string|null
     */
    public function getRetailPrice($sku, $currentCustomer): ?string
    {
        return $this->getPriceFromDb($sku, $currentCustomer, 'retail_price_list', 'erp_price_retail');
    }

    /**
     * get current customer wholesale price by sku
     * @param $sku
     * @param $currentCustomer
     * @return string|null
     */
    public function getWholesalePrice($sku, $currentCustomer): ?string
    {
        return $this->getPriceFromDb($sku, $currentCustomer, 'wholesale_price_list', 'erp_price_wholesale');
    }

    /**
     * calculate your wsp value
     * @param $sku
     * @param $currentCustomer
     * @param $mcrProductLine
     * @return int
     */
    public function getYourWsp($sku, $currentCustomer, $mcrProductLine): int
    {
        $wsp = $this->getPriceFromDb($sku, $currentCustomer, 'wholesale_price_list', 'erp_price_wholesale');
        $businessPartnerId = $currentCustomer->getBusinessPartnerId();

        return $this->getDiscountedPriceFromDb($mcrProductLine, $businessPartnerId, $wsp);
    }

    /**
     * @param $sku
     * @param $endCustomer
     * @param $currentCustomer
     * @param $mcrProductLine
     * @return int
     */
    public function getCustomerRrp($sku, $endCustomer, $currentCustomer, $mcrProductLine): int
    {
        $rrp = $this->getPriceFromDb($sku, $currentCustomer, 'retail_price_list', 'erp_price_retail');
        $businessPartnerId = $endCustomer->getBusinessPartnerId();

        return $this->getDiscountedPriceFromDb($mcrProductLine, $businessPartnerId, $rrp);
    }

    /**
     * @param $sku
     * @param $currentCustomer
     * @param $field
     * @param $tableName
     * @return string|null
     */
    public function getPriceFromDb($sku, $currentCustomer, $field, $tableName): ?string
    {
        $priceList = $currentCustomer->getData($field);
        $table = $this->connection->getTableName($tableName);
        $sql = $this->connection->select()->from(
            $table,
            'price'
        )->where('pricelist_id = :pricelist_id')->where('sku = :sku');
        $bind = [':pricelist_id' => $priceList, ':sku' => $sku];
        $result = $this->connection->fetchOne($sql, $bind);

        return $result ? $result['price'] : null;
    }

    /**
     * @param $mcrProductLine
     * @param $businessPartnerId
     * @param $wsp
     * @return Int
     */
    public function getDiscountedPriceFromDb($mcrProductLine, $businessPartnerId, $wsp): int
    {
        $table = $this->connection->getTableName('customer_entity_discounts');
        $sql = $this->connection->select()->from(
            $table,
            'discount_amount'
        )->where(
            'business_line = :business_line'
        )->where(
            'business_partner_id = :business_partner_id'
        );
        $bind = [':business_line' => $mcrProductLine, ':business_partner_id' => $businessPartnerId];
        $result = $this->connection->fetchOne($sql, $bind);
        $discount = $result ? $result['discount_amount'] : 0;

        return (int)$wsp - (int)$discount;
    }
}
