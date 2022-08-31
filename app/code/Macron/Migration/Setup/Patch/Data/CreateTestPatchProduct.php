<?php

/**
 * @category    Macron
 * @author      Deniss Dubinins <denissd@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\Migration\Setup\Patch\Data;

use Magento\Catalog\Api\CategoryLinkManagementInterface;
use Magento\Catalog\Api\Data\ProductInterfaceFactory;
use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Catalog\Model\Product;
use Magento\Catalog\Model\Product\Attribute\Source\Status;
use Magento\Catalog\Model\Product\Type;
use Magento\Catalog\Model\Product\Visibility;
use Magento\Eav\Setup\EavSetup;
use Magento\Framework\App\State;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\InventoryApi\Api\Data\SourceItemInterface;
use Magento\InventoryApi\Api\Data\SourceItemInterfaceFactory;
use Magento\InventoryApi\Api\SourceItemsSaveInterface;
use Magento\Store\Model\StoreManagerInterface;

class CreateTestPatchProduct implements DataPatchInterface
{
    protected ProductInterfaceFactory $productInterfaceFactory;
    protected ProductRepositoryInterface $productRepository;
    protected State $appState;
    protected StoreManagerInterface $storeManager;
    protected SourceItemInterfaceFactory $sourceItemFactory;
    protected SourceItemsSaveInterface $sourceItemsSaveInterface;
    protected EavSetup $eavSetup;
    protected CategoryLinkManagementInterface $categoryLink;
    protected array $sourceItems = [];

    /**
     * @param ProductInterfaceFactory $productInterfaceFactory
     * @param ProductRepositoryInterface $productRepository
     * @param State $appState
     * @param StoreManagerInterface $storeManager
     * @param SourceItemInterfaceFactory $sourceItemFactory
     * @param SourceItemsSaveInterface $sourceItemsSaveInterface
     * @param EavSetup $eavSetup
     * @param CategoryLinkManagementInterface $categoryLink
     */
    public function __construct(
        ProductInterfaceFactory $productInterfaceFactory,
        ProductRepositoryInterface $productRepository,
        State $appState,
        StoreManagerInterface $storeManager,
        SourceItemInterfaceFactory $sourceItemFactory,
        SourceItemsSaveInterface $sourceItemsSaveInterface,
        EavSetup $eavSetup,
        CategoryLinkManagementInterface $categoryLink
    ) {
        $this->productInterfaceFactory = $productInterfaceFactory;
        $this->productRepository = $productRepository;
        $this->appState = $appState;
        $this->eavSetup = $eavSetup;
        $this->storeManager = $storeManager;
        $this->sourceItemFactory = $sourceItemFactory;
        $this->sourceItemsSaveInterface = $sourceItemsSaveInterface;
        $this->categoryLink = $categoryLink;
    }

    /**
     * Add new product
     */
    public function apply(): void
    {
        $this->appState->emulateAreaCode('adminhtml', [$this, 'execute']);
    }

    public function execute(): void
    {
        $product = $this->productInterfaceFactory->create();

        if ($product->getIdBySku('12345678')) {
            return;
        }

        $attributeSetId = $this->eavSetup->getAttributeSetId(Product::ENTITY, 'Default');
        $websiteIDs = [$this->storeManager->getStore()->getWebsiteId()];
        $product->setTypeId(Type::TYPE_SIMPLE)
            ->setWebsiteIds($websiteIDs)
            ->setAttributeSetId($attributeSetId)
            ->setName('Patch X')
            ->setUrlKey('patch-product')
            ->setSku('12345678')
            ->setPrice(5.00)
            ->setVisibility(Visibility::VISIBILITY_BOTH)
            ->setStatus(Status::STATUS_ENABLED)
            ->setStockData(['use_config_manage_stock' => 1, 'is_qty_decimal' => 0, 'is_in_stock' => 0]);

        $product = $this->productRepository->save($product);

        $sourceItem = $this->sourceItemFactory->create();
        $sourceItem->setSourceCode('default');
        $sourceItem->setQuantity(1);
        $sourceItem->setSku($product->getSku());
        $sourceItem->setStatus(SourceItemInterface::STATUS_IN_STOCK);
        $this->sourceItems[] = $sourceItem;

        $this->sourceItemsSaveInterface->execute($this->sourceItems);

        $product->setData('is_patch', true);
        
        $this->productRepository->save($product);
    }

    /**
     * {@inheritDoc}
     */
    public static function getDependencies(): array
    {
        return [
            CreateIsPatchAttribute::class
        ];
    }

    /**
     * {@inheritDoc}
     */
    public function getAliases(): array
    {
        return [];
    }
}
