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
use Magento\CatalogGraphQl\Model\Resolver\Product\PriceRange;
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
     * @param Price $priceModel
     */
    public function __construct(
        Price $priceModel
    ) {
        $this->priceModel = $priceModel;
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

        $returnArray = [];

        $returnArray['wholesale_price'] =
            [
                'value' => (int)$this->priceModel->getWholesalePrice($product->getSku()),
                'currency' => $store->getCurrentCurrencyCode()
            ];
        $returnArray['retail_price'] =
            [
                'value' => (int)$this->priceModel->getRetailPrice($product->getSku()),
                'currency' => $store->getCurrentCurrencyCode()
            ];


        return $returnArray;
    }
}
