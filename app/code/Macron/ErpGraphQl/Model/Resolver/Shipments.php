<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\Stdlib\DateTime\TimezoneInterface;
use Macron\ErpGraphQl\Model\ResourceModel\Shipments\CollectionFactory;

class Shipments implements ResolverInterface
{
    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $shipmentsCollection;

     /**
     * @var TimezoneInterface
     */
    protected TimezoneInterface $timezoneInterface;

    /**
     * @param CollectionFactory $shipmentsCollection
     */
    public function __construct(CollectionFactory $shipmentsCollection, TimezoneInterface $timezoneInterface)
    {
        $this->shipmentsCollection = $shipmentsCollection;
        $this->timezoneInterface = $timezoneInterface;
    }

     /**
     * Get all customer shipments resolver
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed|null
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
        $pageSize = $args['pageSize'];
        $currentPage = $args['currentPage'];
        $date = isset($args['filter']) && isset($args['filter']['date']) ?  $args['filter']['date'] : null;
        $status = isset($args['filter']) ?  $args['filter'] : null;

        $collection = $this->shipmentsCollection
            ->create($customerId);

        if($date !== null) {
          $currentDate = $this->timezoneInterface->date()->format('Y-m-d');
          $fromDate = date('Y-m-d', strtotime($date['from']) ?? '-24 hour'); //Start Date
          $toDate = date('Y-m-d', strtotime($date['to'] ?? $currentDate)); //End Date

          $collection = $collection->addFieldToFilter('date', ['gteq' => $fromDate])
               ->addFieldToFilter('date', ['lteq' => $toDate]);
        }

        if($status !== null) {
         $collection = $collection->addFieldToFilter(
            'status',
            ['in' => $status]
         );
        }

        $collection = $collection->setPageSize($pageSize)
            ->setCurPage($currentPage);

        return [
            'items' => $collection->getData(),
            'page_info' => [
                'page_size' => $collection->getPageSize(),
                'current_page' => $collection->getCurPage(),
                'total_pages' => $collection->getLastPageNumber()
            ],
        ];
    }
}