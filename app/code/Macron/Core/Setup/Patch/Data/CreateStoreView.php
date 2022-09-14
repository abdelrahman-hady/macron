<?php
/**
 * @category    Macron
 * @author      Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

namespace Macron\Core\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Store\Model\StoreFactory;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Store\Api\WebsiteRepositoryInterface;
use Magento\Store\Api\StoreRepositoryInterface;
use Magento\Store\Model\ResourceModel\Store;


class CreateStoreView implements DataPatchInterface {

    private $storeViews = [
        [
            'name' => 'English',
            'code' => 'us'
        ],
        [
            'name' => 'Italian',
            'code' => 'it'
        ],
        [
            'name' => 'French',
            'code' => 'fr'
        ],
        [
            'name' => 'German',
            'code' => 'de'
        ],
        [
            'name' => 'Spanish',
            'code' => 'es'
        ],
    ];


    /**
     * @var StoreFactory
     */
    private $storeFactory;
    /**
     * @var ModuleDataSetupInterface
     */
    private  $moduleDataSetup;
    /**
     * @var WebsiteRepositoryInterface
     */
    private  $websiteRepository;
    /**
     * @var StoreRepositoryInterface
     */
    private  $storeRepository;
    /**
     * @var Store
     */
    private $storeResourceModel;

    /**
     * @param StoreFactory $storeFactory
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param WebsiteRepositoryInterface $websiteRepository
     * @param StoreRepositoryInterface $storeRepository
     */
    public function __construct(
        StoreFactory $storeFactory,
        ModuleDataSetupInterface $moduleDataSetup,
        WebsiteRepositoryInterface $websiteRepository,
        StoreRepositoryInterface $storeRepository,
        Store $storeResourceModel
    ) {
        $this->storeFactory = $storeFactory;
        $this->moduleDataSetup = $moduleDataSetup;
        $this->websiteRepository = $websiteRepository;
        $this->storeRepository = $storeRepository;
        $this->storeResourceModel = $storeResourceModel;
    }

    /**
     * Creates Store Views
     * @return void
     */
    public function apply(): void
    {
        $this->moduleDataSetup->startSetup();

        $website = $this->websiteRepository->get('base');

        foreach ($this->storeViews as $storeView) {
            if (!$this->checkStoreViewExist($storeView['code'])) {
                $store = $this->storeFactory->create();
                $store->setCode($storeView['code']);
                $store->setName($storeView['name']);
                $store->setWebsite($website);
                $store->setGroupId($website->getDefaultGroupId());
                $store->setData('is_active','1');
                $this->storeResourceModel->save($store);
            }
        }

        $this->moduleDataSetup->endSetup();
    }

    private function checkStoreViewExist(String $code) {
        try {
            $store = $this->storeRepository->get($code);
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }

    /** {@inheritDoc} */
    public static function getDependencies(): array
    {
        return [];
    }

    /** {@inheritDoc} */
    public function getAliases(): array
    {
        return [];
    }
}
