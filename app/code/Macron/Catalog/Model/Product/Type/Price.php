<?php
/**
 * @category    Macron
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\Catalog\Model\Product\Type;

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
     * Product price cache tag
     */
    const CACHE_TAG = 'PRODUCT_PRICE';

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
     * @var CollectionFactory
     */
    private CollectionFactory $customerCollection;

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
        CollectionFactory $customerCollection,
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

        $this->customerCollection = $customerCollection;
        $this->resourceConnection = $resourceConnection;
    }

    /**
     * get current customer retail price by sku
     * @param $sku
     * @return string|null
     */
    public function getRetailPrice($sku): ?string
    {
        return $this->getPriceFromDb($sku, 'retail_price_list', 'erp_price_retail');
    }

    /**
     * get current customer wholesale price by sku
     * @param $sku
     * @return string|null
     */
    public function getWholesalePrice($sku): ?string
    {
        return $this->getPriceFromDb($sku, 'wholesale_price_list', 'erp_price_wholesale');
    }

    /**
     * @param $sku
     * @param $field
     * @param $tableName
     * @return string|null
     */
    public function getPriceFromDb($sku, $field, $tableName): ?string
    {
        $customerId = $this->_customerSession->getCustomer()->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);
        $priceList = $currentCustomer->getData($field);
        $connection = $this->resourceConnection->getConnection();
        $sql = "Select price FROM {$tableName} WHERE pricelist_id = '{$priceList}' AND sku like '{$sku}'";
        $result = $connection->fetchAll($sql);
        return count($result) ? $result[0]['price'] : null;
    }
}
