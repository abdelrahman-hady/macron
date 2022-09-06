<?php

/**
 * MagefanBlog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Exception\GraphQlNoSuchEntityException;
use Magefan\Blog\Block\Sidebar\Archive as Data;

class PathArchiveResolver implements ResolverInterface
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
        $archiveDatas = [];
        $months = $this->dataHelper->getMonths();

        foreach ($months as $time) {
            $title = $this->dataHelper->getTranslatedDate($time);
            $url = $this->dataHelper->getTimeUrl($time);
            $archiveData= [
                'title'=> $title,
                'url'=> $url
            ];
            $archiveDatas[]=$archiveData;
        }

        return $archiveDatas;
    }
}
