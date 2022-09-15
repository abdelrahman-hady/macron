<?php
/**
 * @category    Macron
 * @package     Macron_PatchProducts
 * @author      Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\PatchProducts\Model\Resolver;

use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Exception\GraphQlNoSuchEntityException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;

/**
 * @inheritdoc
 */
class PatchProducts implements ResolverInterface
{
    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;

    /**
     * @var SearchCriteriaBuilder
     */
    protected $searchCriteriaBuilder;

    /**
     * @param ProductRepositoryInterface $productRepository
     * @param SearchCriteriaBuilder $searchCriteriaBuilder
     */
    public function __construct(
        ProductRepositoryInterface $productRepository,
        SearchCriteriaBuilder $searchCriteriaBuilder
    ) {
        $this->productRepository = $productRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
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
        $productsData = $this->getProductsData();
        return $productsData;
    }

    /**
     * @return array
     * @throws GraphQlNoSuchEntityException
     */
    private function getProductsData(): array
    {
        try {
            $searchCriteria = $this->searchCriteriaBuilder->addFilter('is_patch', 1,'eq')->create();
            $products = $this->productRepository->getList($searchCriteria)->getItems();
            $productRecord['allPatchProducts'] = [];

            foreach($products as $product) {
                $productId = $product->getId();
                $productRecord['allPatchProducts'][$productId]['sku'] = $product->getSku();
                $productRecord['allPatchProducts'][$productId]['name'] = $product->getName();
                $productRecord['allPatchProducts'][$productId]['price'] = $product->getPrice();
            }
        } catch (NoSuchEntityException $e) {
            throw new GraphQlNoSuchEntityException(__($e->getMessage()), $e);
        }
        return $productRecord;
    }
}
