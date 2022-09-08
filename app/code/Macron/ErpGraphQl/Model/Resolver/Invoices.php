<?php
/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\InvoicesModel;
use Magento\Customer\Model\AddressFactory;
use Magento\Customer\Model\CustomerFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;
use stdClass;

class Invoices implements ResolverInterface
{
    /**
     * @var InvoicesModel
     */
    protected InvoicesModel $invoicesModelFactory;

    /**
     * @var GetCustomer
     */
    protected GetCustomer $getCustomer;

    /**
     * @param InvoicesModel $invoicesModelFactory
     * @param GetCustomer $getCustomer
     * @param CustomerFactory $customerFactory
     * @param AddressFactory $addressFactory
     */
    public function __construct(
        InvoicesModel $invoicesModelFactory,
        GetCustomer $getCustomer,
        CustomerFactory $customerFactory,
        AddressFactory $addressFactory
    ) {
        $this->invoicesModelFactory = $invoicesModelFactory;
        $this->getCustomer = $getCustomer;
        $this->customerFactory = $customerFactory;
        $this->addressFactory = $addressFactory;
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
            throw new GraphQlAuthorizationException(__("The current customer isn't authorized."));
        }

        $customerId = $this->getCustomer->execute($context)->getId();
        $customerFirstName = $this->getCustomer->execute($context)->getFirstname();
        $customerLastName = $this->getCustomer->execute($context)->getLastname();
        $customerName = $customerFirstName . " " . $customerLastName;

        $customer = $this->customerFactory->create()->load($customerId, "entity_id");
        $shippingAddressId = $this->getCustomer->execute($context)->getDefaultShipping();

        if (!isset($shippingAddressId)) {
            $shippingAddress = "";
        } else {
            $shippingAddress = $this->addressFactory->create()->load($shippingAddressId, "entity_id");
            $street = $shippingAddress->getData("street");
            $city = $shippingAddress->getData("city");
            $postcode = $shippingAddress->getData("postcode");
            $country = $shippingAddress->getData("country");
            $telephone = $shippingAddress->getData("telephone");
            $shippingAddress = $street . ', ' . $city . ', ' . $postcode . ', ' . $country . ', T:' . $telephone;
        }

        $business_partner_id = $customer->getData("business_partner_id");

        $data = $this->invoicesModelFactory->getCollection()
            ->addFieldToFilter('user_sap_id', $business_partner_id)
            ->getData();

        $output = [];

        foreach ($data as $item) {
            $object = new stdClass();
            $object->id = $item['id'];
            $object->invoice_number = $item['invoice_number'];
            $object->user_sap_id = $item['user_sap_id'];
            $object->date = $item['date'];
            $object->grand_total = $item['grand_total'];
            $object->status = $item['status'];
            $object->download_link = $item['download_link'];
            $object->customer = $customerName;
            $object->address = $shippingAddress;

            $output[] = $object;
        }
        return $output;
    }
}
