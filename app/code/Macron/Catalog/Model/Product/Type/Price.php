<?php
/**
 * @category    Macron
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\Catalog\Model\Product\Type;

use Magento\Catalog\Api\Data\ProductTierPriceExtensionFactory;
use Magento\Catalog\Api\Data\ProductTierPriceInterfaceFactory;
use Magento\Catalog\Model\Product\Type\Price as SourcePrice;
use Magento\CatalogRule\Model\ResourceModel\RuleFactory;
use Magento\Customer\Api\GroupManagementInterface;
use Magento\Customer\Model\Session;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\DB\Adapter\AdapterInterface;
use Magento\Framework\Event\ManagerInterface;
use Magento\Framework\Pricing\PriceCurrencyInterface;
use Magento\Framework\Stdlib\DateTime\TimezoneInterface;
use Magento\Store\Model\StoreManagerInterface;

class Price extends SourcePrice
{
    /**
     * @var ProductTierPriceExtensionFactory
     */
    private $tierPriceExtensionFactory;

    /**
     * @var ResourceConnection
     */
    private ResourceConnection $resourceConnection;

    /**
     * @var AdapterInterface
     */
    protected AdapterInterface $connection;

    /**
     * @param RuleFactory $ruleFactory
     * @param StoreManagerInterface $storeManager
     * @param TimezoneInterface $localeDate
     * @param Session $customerSession
     * @param ManagerInterface $eventManager
     * @param PriceCurrencyInterface $priceCurrency
     * @param GroupManagementInterface $groupManagement
     * @param ProductTierPriceInterfaceFactory $tierPriceFactory
     * @param ScopeConfigInterface $config
     * @param ProductTierPriceExtensionFactory|null $tierPriceExtensionFactory
     * @param ResourceConnection $resourceConnection
     */
    public function __construct(
        RuleFactory $ruleFactory,
        StoreManagerInterface $storeManager,
        TimezoneInterface $localeDate,
        Session $customerSession,
        ManagerInterface $eventManager,
        PriceCurrencyInterface $priceCurrency,
        GroupManagementInterface $groupManagement,
        ProductTierPriceInterfaceFactory $tierPriceFactory,
        ScopeConfigInterface $config,
        ProductTierPriceExtensionFactory $tierPriceExtensionFactory = null,
        ResourceConnection $resourceConnection
    ) {
        parent::__construct(
            $ruleFactory,
            $storeManager,
            $localeDate,
            $customerSession,
            $eventManager,
            $priceCurrency,
            $groupManagement,
            $tierPriceFactory,
            $config,
            $tierPriceExtensionFactory
        );
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
     * @return float|int
     */
    public function getYourWsp($sku, $currentCustomer, $mcrProductLine): float|int
    {
        $wsp = $this->getPriceFromDb($sku, $currentCustomer, 'wholesale_price_list', 'erp_price_wholesale');
        $businessPartnerId = $currentCustomer->getBusinessPartnerId();

        return $this->getDiscountedPriceFromDb($mcrProductLine, $businessPartnerId, $wsp);
    }

    /**
     * calculate customer rrp value
     * @param $sku
     * @param $endCustomer
     * @param $currentCustomer
     * @param $mcrProductLine
     * @return float|int
     */
    public function getCustomerRrp($sku, $endCustomer, $currentCustomer, $mcrProductLine): float|int
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

        return count($result) ? $result['price'] : null;
    }

    /**
     * @param $mcrProductLine
     * @param $businessPartnerId
     * @param $priceType
     * @return float|int
     */
    public function getDiscountedPriceFromDb($mcrProductLine, $businessPartnerId, $priceType): float|int
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
        $discount = count($result) ? $result['discount_amount'] : 0;

        return (int)$priceType - ((int)$priceType * ((int)$discount / 100));
    }
}
