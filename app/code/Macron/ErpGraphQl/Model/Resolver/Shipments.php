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
use Macron\ErpGraphQl\Model\ResourceModel\Shipments\CollectionFactory;

class Shipments implements ResolverInterface
{
    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $shipmentsCollection;

    /**
     * @param CollectionFactory $shipmentsCollection
     */
    public function __construct(CollectionFactory $shipmentsCollection)
    {
        $this->shipmentsCollection = $shipmentsCollection;
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

        $status = $args['filter']['status'] ?? null;
        $customerName = $args['filter']['customer_name'] ?? null;

        $collection = $this->shipmentsCollection
            ->create($customerId);

        if($status !== null) {
         $collection = $collection->addFieldToFilter(
            'status',
            ['in' => $status]
         );
        }

        if($customerName !== null) {
          $collection = $collection->addFieldToFilter(
              'customer_name',
              ['in' => $customerName]
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