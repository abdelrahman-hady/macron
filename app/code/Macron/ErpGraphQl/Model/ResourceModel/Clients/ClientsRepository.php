<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\ResourceModel\Clients;

use Macron\ErpGraphQl\Api\ClientRepositoryInterface;
use Macron\ErpGraphQl\Api\Data\ClientSearchResultsInterface;
use Macron\ErpGraphQl\Api\Data\ClientSearchResultsInterfaceFactory;
use Magento\Framework\Api\SearchCriteria\CollectionProcessorInterface;
use Magento\Framework\Api\SearchCriteriaInterface;
use Magento\Framework\Api\SearchResultsInterface;

class ClientsRepository implements ClientRepositoryInterface
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
     * @var ClientSearchResultsInterfaceFactory
     */
    protected ClientSearchResultsInterfaceFactory $searchResultsFactory;

    /**
     * @param CollectionFactory $collectionFactory
     * @param CollectionProcessorInterface $collectionProcessor
     * @param ClientSearchResultsInterfaceFactory $searchResultsFactory
     */
    public function __construct(
        CollectionFactory $collectionFactory,
        CollectionProcessorInterface $collectionProcessor,
        ClientSearchResultsInterfaceFactory $searchResultsFactory
    ) {
        $this->collectionFactory = $collectionFactory;
        $this->searchResultsFactory = $searchResultsFactory;
        $this->collectionProcessor = $collectionProcessor;
    }

    /**
     * Get client list by search criteria
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
