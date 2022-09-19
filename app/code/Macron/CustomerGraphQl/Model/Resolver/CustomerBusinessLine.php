<?php
/**
 * @category  Macron
 * @author    Mohammed Komsany <mohammed.komsany@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\CustomerGraphQl\Model\Resolver;

use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class CustomerBusinessLine implements ResolverInterface
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
     * @param GetCustomer $getCustomer
     * @param CollectionFactory $customerCollection
     */
    public function __construct(
        GetCustomer $getCustomer,
        CollectionFactory $customerCollection
    ) {
        $this->getCustomer = $getCustomer;
        $this->customerCollection = $customerCollection;
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

        if (isset($args['businessId'])) {
            $activeCustomer = $this->customerCollection->create()
            ->addAttributeToSelect('*')
            ->getItemByColumnValue('business_partner_id',$args['businessId']);

            return [
                'businessLine' => $activeCustomer->getData('business_line'),
                'b2bProfileId' => $activeCustomer->getData('b2b_profile_id')
            ];
        }

        return [
            'businessLine' => '',
            'b2bProfileId' => ''
        ];
    }
}
