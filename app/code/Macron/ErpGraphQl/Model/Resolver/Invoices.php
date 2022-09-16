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
use Magento\CustomerGraphQl\Model\Customer\GetCustomer as CustomerModel;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class Invoices implements ResolverInterface
{
    protected InvoicesRepository $erpInvoiceRepository;
    protected CustomerModel $customerModel;

    /**
     * @param InvoicesRepository $erpInvoiceRepository
     */
    public function __construct(InvoicesRepository $erpInvoiceRepository, CustomerModel $customerModel)
    {
        $this->erpInvoiceRepository = $erpInvoiceRepository;
        $this->customerModel = $customerModel;
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
        if (!$context->getExtensionAttributes()->getIsCustomer()) {
            throw new GraphQlAuthorizationException(__('The current customer is not authorized.'));
        }
        $customer = $this->customerModel->execute($context);
        $customerId = $customer->getId();
        $pageSize = $args['pageSize'];
        $currentPage = $args['currentPage'];

        return $this->erpInvoiceRepository->getList($customerId,$pageSize,$currentPage);
    }
}
