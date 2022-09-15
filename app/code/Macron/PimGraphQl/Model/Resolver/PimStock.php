<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\PimGraphQl\Model\Resolver;

use Macron\PimGraphQl\Model\ResourceModel\PimStock\PimStockCollectionFactory;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;
use Safe\Exceptions\JsonException;

class PimStock implements ResolverInterface
{
    /**
     * @var PimStockCollectionFactory
     */
    protected PimStockCollectionFactory $stockCollection;

    /**
     * @param PimStockCollectionFactory $stockCollection
     */
    public function __construct(PimStockCollectionFactory $stockCollection)
    {
        $this->stockCollection = $stockCollection;
    }

    /**
     * Get all customer clients resolver
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed|null
     * @throws GraphQlAuthorizationException
     * @throws JsonException
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

        $sku = $args['SKU'];
        $warehouse = $args['Warehouse'];

        $collection = $this->stockCollection
            ->create()
            ->addFieldToFilter('sku', ['in' => $sku])
            ->addFieldToFilter('warehouse', ['in' => $warehouse]);

        return $collection->getFormattedData();
    }
}
