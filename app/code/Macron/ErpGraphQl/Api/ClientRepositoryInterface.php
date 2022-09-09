<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Api;

use Macron\ErpGraphQl\Api\Data\ClientSearchResultsInterface;
use Magento\Framework\Api\SearchCriteriaInterface;

interface ClientRepositoryInterface
{
    /**
     * Get client list by search criteria
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @param int $customerId
     * @return ClientSearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria, int $customerId);
}
