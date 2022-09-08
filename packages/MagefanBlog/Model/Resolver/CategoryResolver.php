<?php

/**
 * MagefanBlog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Model\Resolver;

use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Exception\GraphQlNoSuchEntityException;
use Scandiweb\MagefanBlog\Helper\Data;
use Magefan\BlogGraphQl\Model\Resolver\DataProvider\Post as DataProvider;

class CategoryResolver implements ResolverInterface
{
    protected Data $dataHelper;
    protected DataProvider $dataProvider;

    public function __construct(
        Data $dataHelper,
        DataProvider $dataProvider
    ) {
        $this->dataHelper = $dataHelper;
        $this->dataProvider = $dataProvider;
    }

    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        $categoryId = $this->dataHelper->publicGetCategoryId($args["identifier"]);
        $fields = $info ? $info->getFieldSelection(10) : null;

        try {
            $categoryData = $this->dataProvider->getData($categoryId, $fields);
        } catch (NoSuchEntityException $e) {
            throw new GraphQlNoSuchEntityException(__($e->getMessage()), $e);
        }

        return $categoryData;
    }
}
