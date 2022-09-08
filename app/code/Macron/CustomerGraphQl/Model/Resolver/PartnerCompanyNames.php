<?php

namespace Macron\CustomerGraphQl\Model\Resolver;

use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\ExtractCustomerData;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class PartnerCompanyNames implements ResolverInterface
{

    /**
     * @var GetCustomer
     */
    private GetCustomer $getCustomer;

    /**
     * @var CollectionFactory
     */
    private CollectionFactory $customerCollection;

    /**
     * @var ExtractCustomerData
     */
    private $extractCustomerData;

    /**
     * @param GetCustomer $getCustomer
     * @param CollectionFactory $customerCollection
     */
    public function __construct(
        GetCustomer $getCustomer,
        CollectionFactory $customerCollection,
        ExtractCustomerData $extractCustomerData
    ) {
        $this->getCustomer = $getCustomer;
        $this->customerCollection = $customerCollection;
        $this->extractCustomerData = $extractCustomerData;
    }

    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return Value|mixed|void
     */
    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        /** @var ContextInterface $context */
        if (false === $context->getExtensionAttributes()->getIsCustomer()) {
            throw new GraphQlAuthorizationException(__('The current customer isn\'t authorized.'));
        }

        $customerId = $this->getCustomer->execute($context)->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);
        $partnerCompanies = [];
        $businessId = '';
        if ($currentCustomer) {
            $businessId = $currentCustomer->getData('business_partner_id');
            $businessPartners = $this->customerCollection->create()
                ->addAttributeToSelect('*')
                ->getItems();
            foreach ($businessPartners as $partner) {
                if ($partner->getData('parent_business_partner_id') === $businessId) {
                    $partnerCompanies[] = [
                        'companyName' => $partner->getData('company_name'),
                        'companyId' => $partner->getData('business_partner_id')
                    ];
                }
            }
        }

        return [
            'currentCustomerId' => $businessId,
            'partnerCompanies' => $partnerCompanies
        ];
    }
}
