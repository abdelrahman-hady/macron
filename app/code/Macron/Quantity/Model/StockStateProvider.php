<?php

namespace Macron\Quantity\Model;

use Magento\CatalogInventory\Api\Data\StockItemInterface;

class StockStateProvider extends \Magento\CatalogInventory\Model\StockStateProvider
{

    /**
     * Check quantity
     *
     * @param StockItemInterface $stockItem
     * @param int|float $qty
     * @exception \Magento\Framework\Exception\LocalizedException
     * @return bool
     */
    public function checkQty(StockItemInterface $stockItem, $qty)
    {
        return true;
    }
}
