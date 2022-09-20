<?php
/**
 * @category  Macron
 * @author    Abdelrahman Hady <abdelrahman.hady@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\CustomerGraphQl\Model\Resolver;

use Magento\Customer\Api\AddressRepositoryInterface;
use Magento\Customer\Api\CustomerRepositoryInterface;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Directory\Model\CountryFactory;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;

class DefaultShippingAddress implements ResolverInterface
{
    /**
     * @var GetCustomer
     */
    private GetCustomer $getCustomer;

    /**
     * @var CustomerRepositoryInterface
     */
    private $customerRepository;

    /**
     * @var AddressRepositoryInterface
     */
    private $addressRepository;

    /**
     * @var CountryFactory
     */
    private $countryFactory;

    /**
     * MyClass constructor.
     * @param GetCustomer $getCustomer
     * @param CustomerRepositoryInterface $customerRepository
     * @param AddressRepositoryInterface $addressRepository
     * @param CountryFactory $countryFactory
     */
    public function __construct(
        GetCustomer $getCustomer,
        CustomerRepositoryInterface $customerRepository,
        AddressRepositoryInterface $addressRepository,
        CountryFactory $countryFactory
    ) {
        $this->getCustomer = $getCustomer;
        $this->customerRepository = $customerRepository;
        $this->addressRepository = $addressRepository;
        $this->countryFactory = $countryFactory;
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
        $customerId = $this->getCustomer->execute($context)->getId();
        $customer = $this->customerRepository->getById($customerId);
        $defaultShippingAddressId = $customer->getDefaultShipping();

        if ($defaultShippingAddressId) {
            $shippingAddress = $this->addressRepository->getById($defaultShippingAddressId);

            $street = $shippingAddress->getStreet()[0];
            $region = $shippingAddress->getRegion()->getRegion(); // Get region
            $city = $shippingAddress->getCity(); // Get city
            $postcode = $shippingAddress->getPostcode(); // Get postcode

            //Get country name
            $countryCode = $shippingAddress->getCountryId();
            $country = $this->countryFactory->create()->loadByCode($countryCode);
            $country = $country->getName();

            $defaultShippingAddress = $street . ', ' . $region . ', ' . $city . ', ' . $postcode . ', ' . $country;
        } else {
            $defaultShippingAddress = "";
        }

        return [
            'address' => $defaultShippingAddress,
        ];
    }
}
