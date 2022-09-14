<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\ResourceModel\Shipments;

use Macron\ErpGraphQl\Api\ShipmentRepositoryInterface;
use Macron\ErpGraphQl\Api\Data\ShipmentSearchResultsInterface;
use Macron\ErpGraphQl\Api\Data\ShipmentSearchResultsInterfaceFactory;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;

class ShipmentsRepository implements ShipmentRepositoryInterface
{
    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $collectionFactory;

    /**
     * @var CollectionProcessorInterface
     */
    protected CollectionProcessorInterface $collectionProcessor;

    /**
     * @var ShipmentSearchResultsInterfaceFactory
     */
    protected ShipmentSearchResultsInterfaceFactory $searchResultsFactory;

    /**
     * @param CollectionFactory $collectionFactory
     * @param CollectionProcessorInterface $collectionProcessor
     * @param ShipmentSearchResultsInterfaceFactory $searchResultsFactory
     */
    public function __construct(
        CollectionFactory $collectionFactory,
        CollectionProcessorInterface $collectionProcessor,
        ShipmentSearchResultsInterfaceFactory $searchResultsFactory
    ) {
        $this->collectionFactory = $collectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
        $this->collectionProcessor = $collectionProcessor;
    }

    /**
     * Get shipments by search criteria
     *
     * @param SearchCriteriaInterface $searchCriteria
     * @param int $customerId
     * @return SearchResultsInterface
     */
    public function getList(SearchCriteriaInterface $searchCriteria, int $customerId): SearchResultsInterface
    {
        $collection = $this->collectionFactory->create($customerId);
        $this->collectionProcessor->process($searchCriteria, $collection);

        $collection->load();

        $searchResults = $this->searchResultsFactory->create();

        $searchResults->setSearchCriteria($searchCriteria);
        $searchResults->setItems($collection->getItems());

        return $searchResults;
    }
}
