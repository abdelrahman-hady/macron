<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Api\Data;

use Magento\Framework\Api\SearchResultsInterface;

interface ClientSearchResultsInterface extends SearchResultsInterface
{
    /**
     * Get items
     *
     * @return ClientInterface[]
     */
    public function getItems(): array;

    /**
     * Set items
     *
     * @param ClientInterface[] $items
     * @return $this
     */
    public function setItems(array $items): static;
}
