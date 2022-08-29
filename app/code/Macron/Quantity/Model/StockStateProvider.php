<?php

/**
 * @category    Macron
 * @package     Macron_Quantity
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\Quantity\Model;

use Magento\CatalogInventory\Api\Data\StockItemInterface;
use Magento\CatalogInventory\Model\StockStateProvider as Source;

class StockStateProvider extends Source
{
    /**
     * Check quantity
     *
     * @param StockItemInterface $stockItem
     * @param int|float $qty
     * @return bool
     */
    public function checkQty(StockItemInterface $stockItem, $qty): bool
    {
        return true;
    }
}
