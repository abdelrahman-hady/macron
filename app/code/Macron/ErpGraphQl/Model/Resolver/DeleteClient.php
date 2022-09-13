<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\ResourceModel\Clients\ClientsModel;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class DeleteClient implements ResolverInterface
{
    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $clientsCollection;

    /**
     * @param CollectionFactory $clientsCollection
     */
    public function __construct(CollectionFactory $clientsCollection)
    {
        $this->clientsCollection = $clientsCollection;
    }

    /**
     * Delete client resolver
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed|null
     * @throws GraphQlInputException|GraphQlAuthorizationException
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
        $clientId = (int)$args['client_id'];

        $collection = $this->clientsCollection
            ->create($customerId)
            ->addFieldToFilter('entity_id', $clientId);
        $clients = $collection->getData();

        if (count($clients) === 0) {
            throw new GraphQlInputException(__("Client doesn't exists"));
        }

        foreach ($collection as $item) {
            $item->delete();
        }

        return $clients[0];
    }
}
