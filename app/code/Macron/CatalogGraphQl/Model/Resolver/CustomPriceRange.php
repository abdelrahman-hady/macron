<?php
/**
 * @category    Macron
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\CatalogGraphQl\Model\Resolver;

use Macron\Catalog\Model\Product\Type\CustomPrice;
use Magento\Catalog\Model\Product;
use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

class CustomPriceRange implements ResolverInterface
{
    /**
     * @var CollectionFactory
     */
    private CollectionFactory $customerCollection;

    /**
     * @var GetCustomer
     */
    private GetCustomer $getCustomer;

    /**
     * @var CustomPrice
     */
    private CustomPrice $customPriceModel;

    /**
     * @param CollectionFactory $customerCollection
     * @param GetCustomer $getCustomer
     * @param CustomPrice $customPriceModel
     */
    public function __construct(
        CollectionFactory $customerCollection,
        GetCustomer $getCustomer,
        CustomPrice $customPriceModel
    ) {
        $this->customerCollection = $customerCollection;
        $this->getCustomer = $getCustomer;
        $this->customPriceModel = $customPriceModel;
    }

    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ): array {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        $store = $context->getExtensionAttributes()->getStore();
        /** @var Product $product */
        $product = $value['model'];

        $customerId = $this->getCustomer->execute($context)->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);

        $returnArray = [];
        $sku = $product->getSku();

        $returnArray['wholesale_price'] =
            [
                'value' => (int)$this->customPriceModel->getWholesalePrice($sku, $currentCustomer),
                'currency' => $store->getCurrentCurrencyCode()
            ];
        $returnArray['retail_price'] =
            [
                'value' => (int)$this->customPriceModel->getRetailPrice($sku, $currentCustomer),
                'currency' => $store->getCurrentCurrencyCode()
            ];

        return $returnArray;
    }
}
