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

class ArchiveResolver implements ResolverInterface
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
        $archiveDates = [];
        $months = $this->dataHelper->getMonths();

        foreach ($months as $time) {
            $title = $this->dataHelper->getTranslatedDate($time);
            $archiveDates[] = [
                    'id' => $this->createIdFromTitle($title),
                    'title'=> $title,
                    'url'=> $this->dataHelper->getTimeUrl($time)
                ];
        }
        return $archiveDates;
    }

    /**
     * Create archive ID from it's title
     * @return string
     */
    public function createIdFromTitle($title){
        $archiveId = str_replace(' ', '', $title);

        return strtolower($archiveId);
    }
}

