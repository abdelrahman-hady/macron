<?php

/**
 * MagefanBlog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magefan\BlogGraphQl\Model\Resolver\Tags as Data;

class SidebarTagsResolver implements ResolverInterface
{
    protected Data $dataHelper;

    public function __construct(
        Data $dataHelper
    ) {
        $this->dataHelper = $dataHelper;
    }

    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        $result = $this->dataHelper->resolve($field, $context, $info, $value, $args);

        // vvv if we tagCount isn't specified then return all the tags
        if(!isset($args['tagCount'])){
            return $result;
        }

        // vvv get limited number of tags by tagCount
        $result['items'] = array_slice($result['items'], 0, $args['tagCount']);
        // vvv update the total_count based on new tag counts
        $result['total_count'] = count($result['items']);
        // ^^^ im getting count this way because there might be less items than tagCount

        return $result;
    }
}
