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
use Magento\Catalog\Model\ProductRepository;
use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

class DiscountPrice implements ResolverInterface
{
    /**
     * @var ProductRepository
     */
    private ProductRepository $productRepository;

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
     * @param ProductRepository $productRepository
     * @param CollectionFactory $customerCollection
     * @param GetCustomer $getCustomer
     * @param CustomPrice $customPriceModel
     */
    public function __construct(
        ProductRepository $productRepository,
        CollectionFactory $customerCollection,
        GetCustomer $getCustomer,
        CustomPrice $customPriceModel
    ) {
        $this->productRepository = $productRepository;
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
    ) {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        $store = $context->getExtensionAttributes()->getStore();
        /** @var Product $product */
        $product = $value['model'];

        $customerId = $this->getCustomer->execute($context)->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);
        $endCustomer = null;

        if (isset($args['customer']) && $args['customer'] !== '') {
            $endCustomer = $this->customerCollection->create()->getItemByColumnValue('company_name', $args['customer']);
        }

        $returnArray = [];
        $sku = $product->getSku();
        $_product = $this->productRepository->getById($product->getId());

        $returnArray['your_wsp'] =
            [
                'value' => $this->customPriceModel->getYourWsp(
                    $sku,
                    $currentCustomer,
                    $_product->getAttributeText('mcr_product_line')
                ),
                'currency' => $store->getCurrentCurrencyCode()
            ];

        if ($endCustomer) {
            $returnArray['customer_rrp'] =
                [
                    'value' => $this->customPriceModel->getCustomerRrp(
                        $sku,
                        $endCustomer,
                        $currentCustomer,
                        $_product->getAttributeText('mcr_product_line')
                    ),
                    'currency' => $store->getCurrentCurrencyCode()
                ];
        }

        return $returnArray;
    }
}
