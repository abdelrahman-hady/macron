<?php

namespace Macron\CatalogGraphQl\Model\Resolver\Product;

use Magento\Catalog\Model\Product;
use Magento\Catalog\Model\Product\Type\Price;
use Magento\CatalogGraphQl\Model\Resolver\Product\Price\Discount;
use Magento\CatalogGraphQl\Model\Resolver\Product\Price\ProviderPool as PriceProviderPool;
use Magento\CatalogGraphQl\Model\Resolver\Product\PriceRange as SourcePriceRange;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;

class PriceRange extends SourcePriceRange
{
    /**
     * @var Discount
     */
    private $discount;

    /**
     * @var PriceProviderPool
     */
    private $priceProviderPool;

    /**
     * @var Price
     */
    private $priceModel;

    /**
     * @param PriceProviderPool $priceProviderPool
     * @param Discount $discount
     * @param Price $priceModel
     */
    public function __construct(
        PriceProviderPool $priceProviderPool,
        Discount $discount,
        Price $priceModel
    ) {
        parent::__construct($priceProviderPool, $discount);

        $this->priceModel = $priceModel;
    }

    /**
     * @inheritdoc
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

        /** @var Product $product */
        $product = $value['model'];

        $returnArray = [];

        $returnArray['wholesale_price'] = $this->priceModel->getWholePrice($product->getSku());
        $returnArray['retail_price'] = $this->priceModel->getRetailPrice($product->getSku());

        print_r($returnArray);
        die();
        return $returnArray;
    }
}
