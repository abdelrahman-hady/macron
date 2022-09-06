<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Macron\ErpGraphQl\Model\ClientsModel;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\GraphQl\Model\Query\ContextInterface;

class DeleteClient implements ResolverInterface
{
    /**
     * @var ClientsModel
     */
    protected ClientsModel $clientsModelFactory;

    /**
     * @var GetCustomer
     */
    protected GetCustomer $getCustomer;

    /**
     * @param ClientsModel $clientsModelFactory
     * @param GetCustomer $getCustomer
     */
    public function __construct(ClientsModel $clientsModelFactory, GetCustomer $getCustomer)
    {
        $this->clientsModelFactory = $clientsModelFactory;
        $this->getCustomer = $getCustomer;
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

        $customerId = $this->getCustomer->execute($context)->getId();
        $clientId = (int)$args['client_id'];

        $collection = $this->clientsModelFactory->getCollection()
            ->addFieldToFilter('customer_id', $customerId)
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
