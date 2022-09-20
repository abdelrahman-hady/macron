<?php
/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\InvoicesRepository;
use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class Invoices implements ResolverInterface
{
    /**
     * @var GetCustomer
     */
    private GetCustomer $getCustomer;

    /**
     * @var CollectionFactory
     */
    private CollectionFactory $customerCollection;

    protected InvoicesRepository $erpInvoiceRepository;

    /**
     * @param InvoicesRepository $erpInvoiceRepository
     */
    public function __construct(
        CollectionFactory $customerCollection,
        InvoicesRepository $erpInvoiceRepository,

    ) {
        $this->customerCollection = $customerCollection;
        $this->erpInvoiceRepository = $erpInvoiceRepository;
    }

    /**
     * Get all customer invoices resolver
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
        $customerId = $context->getUserId();
        if (!$customerId) {
            throw new GraphQlAuthorizationException(__('The current customer is not authorized.'));
        }
        $loggedInCustomer = $this->customerCollection->create()->getItemById($customerId);
        $businessPartnerId = $loggedInCustomer->getBusinessPartnerId();
        return $this->erpInvoiceRepository->getList($businessPartnerId);
    }
}
