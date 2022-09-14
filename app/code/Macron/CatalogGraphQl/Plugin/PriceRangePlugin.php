<?php
/**
 * @category    Macron
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\CatalogGraphQl\Plugin;

use Macron\Catalog\Model\Product\Type\Price;
use Magento\Catalog\Model\Product;
use Magento\Catalog\Model\ProductRepository;
use Magento\CatalogGraphQl\Model\Resolver\Product\PriceRange;
use Magento\Customer\Model\ResourceModel\Customer\CollectionFactory;
use Magento\CustomerGraphQl\Model\Customer\GetCustomer;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

class PriceRangePlugin
{

    /**
     * @var Price
     */
    private Price $priceModel;

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
     * @param Price $priceModel
     * @param ProductRepository $productRepository
     * @param CollectionFactory $customerCollection
     * @param GetCustomer $getCustomer
     */
    public function __construct(
        Price $priceModel,
        ProductRepository $productRepository,
        CollectionFactory $customerCollection,
        GetCustomer $getCustomer,
    ) {
        $this->priceModel = $priceModel;
        $this->productRepository = $productRepository;
        $this->customerCollection = $customerCollection;
        $this->getCustomer = $getCustomer;
    }

    /**
     * @param PriceRange $subject
     * @param callable $proceed
     * @param Field $field
     * @param $context
     * @param array|null $value
     * @param ResolveInfo $info
     * @param array|null $args
     * @return mixed
     */
    public function aroundResolve(PriceRange $subject, callable $proceed, Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        if (!isset($value['model'])) {
            throw new LocalizedException(__('"model" value should be specified'));
        }

        $store = $context->getExtensionAttributes()->getStore();
        /** @var Product $product */
        $product = $value['model'];

        $customerId = $this->getCustomer->execute($context)->getId();
        $currentCustomer = $this->customerCollection->create()->getItemById($customerId);

        if (isset($args['customer']) && $args['customer'] !== '') {
            $collection = $this->customerCollection->create()->getItems();
            foreach ($collection as $customer) {
                if ($customer->getCompanyName() === $args['customer']) {
                    $currentCustomer = $customer;
                    break;
                }
            }
        }

        $returnArray = [];
        $sku = $product->getSku();
        $_product = $this->productRepository->getById($product->getId());

        $returnArray['wholesale_price'] =
            [
                'value' => (int)$this->priceModel->getWholesalePrice($sku, $currentCustomer),
                'currency' => $store->getCurrentCurrencyCode()
            ];
        $returnArray['retail_price'] =
            [
                'value' => (int)$this->priceModel->getRetailPrice($sku, $currentCustomer),
                'currency' => $store->getCurrentCurrencyCode()
            ];
        $returnArray['your_wsp'] =
            [
                'value' => $this->priceModel->getYourWsp($sku, $currentCustomer,
                    $_product->getAttributeText('mcr_product_line')),
                'currency' => $store->getCurrentCurrencyCode()
            ];

        return $returnArray;
    }
}
