<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\Resolver\Query\ShipmentFilter;
use Macron\ErpGraphQl\Model\ResourceModel\Shipments\ShipmentsRepository;
use Macron\ErpGraphQl\Model\ResourceModel\Shipments\CollectionFactory;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Exception\InputException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class ShipmentsByKeyword implements ResolverInterface
{
    /**
     * @var ShipmentsRepository
     */
    protected ShipmentsRepository $shipmentRepository;

    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $shipmentsCollection;

    /**
     * @var ShipmentFilter
     */
    protected ShipmentFilter $shipmentFilter;

    /**
     * @var SearchCriteriaBuilder
     */
    protected SearchCriteriaBuilder $searchCriteriaBuilder;

    /**
     * @param ShipmentsRepository $shipmentRepository
     * @param CollectionFactory $shipmentsCollection
     * @param ShipmentFilter $shipmentFilter
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     */
    public function __construct(
        ShipmentsRepository $shipmentRepository,
        CollectionFactory $shipmentsCollection,
        ShipmentFilter $shipmentFilter,
        SearchCriteriaBuilder $searchCriteriaBuilder
    ) {
        $this->shipmentRepository = $shipmentRepository;
        $this->shipmentsCollection = $shipmentsCollection;
        $this->shipmentFilter = $shipmentFilter;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
    }

    /**
     * Get Shipments by the keyword
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array
     * @throws InputException
     * @throws GraphQlAuthorizationException
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!$context->getExtensionAttributes()->getIsCustomer()) {
            throw new GraphQlAuthorizationException(__("The current customer isn't authorized."));
        }

        $customerId = $context->getUserId();

        $fields = [
            'entity_id',
            'shipment_number',
            'status',
            'tracking_number',
            'date',
            'customer_name',
            'address'
        ];

        $filterCondition = [];
        foreach ($fields as $fieldName) {
            $filterCondition['filter'][$fieldName] = ['match' => $args['keyword']];
        }

        $filterGroups = $this->shipmentFilter->createFilterGroups($filterCondition, $customerId);
        $this->searchCriteriaBuilder->setFilterGroups($filterGroups);

        $searchResult = $this->shipmentRepository->getList($this->searchCriteriaBuilder->create(), $customerId);

        return $searchResult->getItems();
    }
}
