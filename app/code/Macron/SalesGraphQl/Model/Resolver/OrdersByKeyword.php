<?php
/**
 * @category    Macron
 * @package     Macron_SalesGraphQl
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\SalesGraphQl\Model\Resolver;

use Magento\Framework\Exception\InputException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Sales\Api\OrderRepositoryInterface;
use Magento\Sales\Model\ResourceModel\Order\CollectionFactory;
use Magento\SalesGraphQl\Model\Resolver\CustomerOrders\Query\OrderFilter;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\SalesGraphQl\Model\Formatter\Order as OrderFormatter;

class OrdersByKeyword implements ResolverInterface
{
    /**
     * @var OrderRepositoryInterface
     */
    protected OrderRepositoryInterface $orderRepository;

    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $orderCollection;

    /**
     * @var OrderFilter
     */
    protected OrderFilter $orderFilter;

    /**
     * @var SearchCriteriaBuilder
     */
    protected SearchCriteriaBuilder $searchCriteriaBuilder;

    /**
     * @var OrderFormatter
     */
    protected OrderFormatter $orderFormatter;

    /**
     * @param OrderRepositoryInterface $orderRepository
     * @param CollectionFactory $orderCollection
     * @param OrderFilter $orderFilter
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     * @param OrderFormatter $orderFormatter
     */
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        CollectionFactory $orderCollection,
        OrderFilter $orderFilter,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        OrderFormatter $orderFormatter,
    ) {
        $this->orderRepository = $orderRepository;
        $this->orderCollection = $orderCollection;
        $this->orderFilter = $orderFilter;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->orderFormatter = $orderFormatter;
    }

    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed|null
     * @throws GraphQlInputException
     * @throws InputException
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        $userId = $context->getUserId();
        $store = $context->getExtensionAttributes()->getStore();
        $fields = [
            'increment_id',
            'sap_order_id',
            'user_sap_id',
            'user_customer_sap_id',
            'user_customer_name',
            'sales_business_pool_id',
            'sales_business_pool_name',
            'internal_note',
            'status',
            'user_customer_name',
            'reference_note',
            'grand_total'
        ];

        $filterCondition = [];
        foreach ($fields as $fieldName) {
            $filterCondition['filter'][$fieldName] = ['match' => $args['keyword']];
        }
        $filterCondition['search'] = 'search';
        $filterGroups = $this->orderFilter->createFilterGroups($filterCondition, $userId, (int)$store->getId());
        $this->searchCriteriaBuilder->setFilterGroups($filterGroups);
        $this->searchCriteriaBuilder->setCurrentPage($args['currentPage']);
        $this->searchCriteriaBuilder->setPageSize($args['pageSize']);

        $searchResult = $this->orderRepository->getList($this->searchCriteriaBuilder->create());
        $maxPages = (int)ceil($searchResult->getTotalCount() / $searchResult->getPageSize());
        $ordersArray = [];
        foreach ($searchResult->getItems() as $orderModel) {
            $ordersArray[] = $this->orderFormatter->format($orderModel);
        }

        return [
            'total_count' => $searchResult->getTotalCount(),
            'items' => $ordersArray,
            'page_info' => [
                'page_size' => $searchResult->getPageSize(),
                'current_page' => $searchResult->getCurPage(),
                'total_pages' => $maxPages,
            ]
        ];
    }
}
