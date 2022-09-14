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
use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\Customer\Model\Session;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Event\ManagerInterface;
use Magento\Framework\Pricing\PriceCurrencyInterface;
use Magento\Framework\Stdlib\DateTime\TimezoneInterface;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\App\ResourceConnection;

class Price extends SourcePrice
{
    /**
     * @var array
     */
    protected static $attributeCache = [];

    /**
     * Core event manager proxy
     *
     * @var ManagerInterface
     */
    protected $_eventManager;

    /**
     * Customer session
     *
     * @var Session
     */
    protected $_customerSession;

    /**
     * @var TimezoneInterface
     */
    protected $_localeDate;

    /**
     * Store manager
     *
     * @var StoreManagerInterface
     */
    protected $_storeManager;

    /**
     * Rule factory
     *
     * @var RuleFactory
     */
    protected $_ruleFactory;

    /**
     * @var PriceCurrencyInterface
     */
    protected $priceCurrency;

    /**
     * @var GroupManagementInterface
     */
    protected $_groupManagement;

    /**
     * @var ProductTierPriceInterfaceFactory
     */
    protected $tierPriceFactory;

    /**
     * @var ScopeConfigInterface
     */
    protected $config;

    /**
     * @var ProductTierPriceExtensionFactory
     */
    private $tierPriceExtensionFactory;

    /**
     * @var ResourceConnection
     */
    private ResourceConnection $resourceConnection;

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
        $connection = $this->resourceConnection->getConnection();
        $businessPartnerId = $currentCustomer->getBusinessPartnerId();
        $sql = "SELECT discount_amount FROM customer_entity_discounts WHERE business_line = '{$mcrProductLine}' AND business_partner_id = '{$businessPartnerId}'";
        $result = $connection->fetchAll($sql);
        $discount = count($result) ? $result[0]['discount_amount'] : 0;
        return (int)$wsp - (int)$discount;
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
        $connection = $this->resourceConnection->getConnection();
        $sql = "SELECT price FROM {$tableName} WHERE pricelist_id = '{$priceList}' AND sku like '{$sku}'";
        $result = $connection->fetchAll($sql);
        return count($result) ? $result[0]['price'] : null;
    }
}
