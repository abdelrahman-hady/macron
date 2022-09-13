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
     * @return array
     */
    public function getRetailPrice($sku): array
    {
        $customerId = $this->_customerSession->getCustomer()->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);
        $retailPriceList = $currentCustomer->getRetailPriceList();
        $connection = $this->resourceConnection->getConnection();
        $sql = "Select price FROM erp_price_retail WHERE pricelist_id = {$retailPriceList} AND sku = {$sku}";
        return $connection->fetchAll($sql);
    }

    /**
     * get current customer wholesale price by sku
     * @param $sku
     * @return array
     */
    public function getWholePrice($sku): array
    {
        $customerId = $this->_customerSession->getCustomer()->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);
        $wholesalePriceList = $currentCustomer->getWholesalePriceList();
        $connection = $this->resourceConnection->getConnection();
        $sql = "Select price FROM erp_price_wholesale WHERE pricelist_id = {$wholesalePriceList} AND sku = {$sku}";
        return $connection->fetchAll($sql);
    }
}
