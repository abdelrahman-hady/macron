<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\Resolver\Query\ClientFilter;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\ClientsRepository;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\CollectionFactory;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Framework\Exception\InputException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class ClientsByKeyword implements ResolverInterface
{
    /**
     * @var ClientsRepository
     */
    protected ClientsRepository $clientRepository;

    /**
     * @var CollectionFactory
     */
    protected CollectionFactory $clientsCollection;

    /**
     * @var ClientFilter
     */
    protected ClientFilter $clientFilter;

    /**
     * @var SearchCriteriaBuilder
     */
    protected SearchCriteriaBuilder $searchCriteriaBuilder;

    /**
     * @param ClientsRepository $clientRepository
     * @param CollectionFactory $clientsCollection
     * @param ClientFilter $clientFilter
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     */
    public function __construct(
        ClientsRepository $clientRepository,
        CollectionFactory $clientsCollection,
        ClientFilter $clientFilter,
        SearchCriteriaBuilder $searchCriteriaBuilder
    ) {
        $this->clientRepository = $clientRepository;
        $this->clientsCollection = $clientsCollection;
        $this->clientFilter = $clientFilter;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
    }

    /**
     * Get clients by the keyword
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
            'company_name',
            'address',
            'vat_number',
            'contract_expiracy_date',
            'affiliation',
            'coni_id',
            'membership_no',
            'distance',
            'contact_person',
            'mobile',
            'email',
            'current_brand'
        ];

        $filterCondition = [];
        foreach ($fields as $fieldName) {
            $filterCondition['filter'][$fieldName] = ['match' => $args['keyword']];
        }

        $filterGroups = $this->clientFilter->createFilterGroups($filterCondition, $customerId);
        $this->searchCriteriaBuilder->setFilterGroups($filterGroups);

        $searchResult = $this->clientRepository->getList($this->searchCriteriaBuilder->create(), $customerId);

        return $searchResult->getItems();
    }
}
