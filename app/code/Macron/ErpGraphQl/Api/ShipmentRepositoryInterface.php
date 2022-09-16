<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Api;

use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;

interface ShipmentRepositoryInterface
{
    /**
     * Get shipments by search criteria
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @param int $customerId
     * @return SearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria, int $customerId): SearchResultsInterface;
}
