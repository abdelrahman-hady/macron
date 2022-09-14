<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface ShipmentSearchResultsInterface extends SearchResultsInterface
{
    /**
     * Get items
     *
     * @return ShipmentInterface[]
     */
    public function getItems(): array;

    /**
     * Set items
     *
     * @param ShipmentInterface[] $items
     * @return $this
     */
    public function setItems(array $items): static;
}
