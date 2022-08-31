<?php

/**
 * @category    Macron
 * @package     Macron_DisableStock
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\DisableStock\Model\IsProductSalableForRequestedQtyCondition;

use Magento\InventorySalesApi\Model\GetStockItemDataInterface;
use Magento\InventorySalesApi\Api\Data\ProductSalableResultInterface;
use Magento\InventorySalesApi\Api\Data\ProductSalableResultInterfaceFactory;
use Magento\InventorySalesApi\Api\Data\ProductSalabilityErrorInterfaceFactory;
use Magento\InventorySales\Model\IsProductSalableForRequestedQtyCondition\IsSalableWithReservationsCondition as Source;

/**
 * @inheritdoc
 */
class IsSalableWithReservationsCondition extends Source
{
    /**
     * @var GetStockItemDataInterface
     */
    private GetStockItemDataInterface $getStockItemData;


    /**
     * @var ProductSalabilityErrorInterfaceFactory
     */
    private $productSalabilityErrorFactory;

    /**
     * @var ProductSalableResultInterfaceFactory
     */
    private $productSalableResultFactory;

    /**
     * @param GetStockItemDataInterface $getStockItemData
     * @param ProductSalabilityErrorInterfaceFactory $productSalabilityErrorFactory
     * @param ProductSalableResultInterfaceFactory $productSalableResultFactory
     */
    public function __construct(
        GetStockItemDataInterface $getStockItemData,
        ProductSalabilityErrorInterfaceFactory $productSalabilityErrorFactory,
        ProductSalableResultInterfaceFactory $productSalableResultFactory
    ) {
        $this->getStockItemData = $getStockItemData;
        $this->productSalabilityErrorFactory = $productSalabilityErrorFactory;
        $this->productSalableResultFactory = $productSalableResultFactory;
    }

    /**
     * @inheritdoc
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function execute(
        string $sku,
        int $stockId,
        float $requestedQty
    ): ProductSalableResultInterface {
        $stockItemData = $this->getStockItemData->execute($sku, $stockId);
        if (null === $stockItemData) {
            $errors = [
                $this->productSalabilityErrorFactory->create([
                    "code" => "is_salable_with_reservations-no_data",
                    "message" => __("The requested sku is not assigned to given stock"),
                ]),
            ];
            return $this->productSalableResultFactory->create(["errors" => $errors]);
        }

        return $this->productSalableResultFactory->create(["errors" => []]);
    }
}
