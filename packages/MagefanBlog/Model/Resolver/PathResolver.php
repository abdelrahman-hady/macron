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
use Magefan\Blog\Model\UrlResolver as PathData;
use Scandiweb\MagefanBlog\Helper\Data;
use Magefan\BlogGraphQl\Model\Resolver\DataProvider\Post as PostDataProvider;
use Magefan\BlogGraphQl\Model\Resolver\DataProvider\Author as AuthorDataProvider;
use Magefan\BlogGraphQl\Model\Resolver\DataProvider\Category as CategoryDataProvider;
use Magefan\BlogGraphQl\Model\Resolver\DataProvider\Tag as TagDataProvider;

// Functions can be outsourced to helper function(s)

class PathResolver implements ResolverInterface
{
    protected PathData $pathDataHelper;
    protected Data $dataHelper;
    protected PostDataProvider $postDataProvider;
    protected AuthorDataProvider $authorDataProvider;
    protected CategoryDataProvider $categoryDataProvider;
    protected TagDataProvider $tagDataProvider;

    public function __construct(
        Data                 $dataHelper,
        PostDataProvider     $postDataProvider,
        AuthorDataProvider   $authorDataProvider,
        CategoryDataProvider $categoryDataProvider,
        TagDataProvider      $tagDataProvider,
        PathData             $pathDataHelper
    )
    {
        $this->dataHelper = $dataHelper;
        $this->postDataProvider = $postDataProvider;
        $this->authorDataProvider = $authorDataProvider;
        $this->categoryDataProvider = $categoryDataProvider;
        $this->tagDataProvider = $tagDataProvider;
        $this->pathDataHelper = $pathDataHelper;
    }

    public function resolve(
        Field       $field,
        $context,
        ResolveInfo $info,
        array       $value = null,
        array       $args = null
    ) {
        if (!isset($args['path'])) {
            return [];
        }

        $incomingPath = $args['path'];
        $identifier = basename($incomingPath);
        try {
            $path = $this->pathDataHelper->resolve($incomingPath);
        } catch (NoSuchEntityException $e) {
            throw new GraphQlNoSuchEntityException(__($e->getMessage()), $e);
        }

        if (!isset($path['type'])) {
            return [
                'id'=> null,
                'type'=> null,
                'details'=> [ ]
            ];
        }

        $type = $path['type'];
        $fields = $info ? $info->getFieldSelection(10) : null;
        $typeFields = $fields['details'];
        $details = $this->getTypeDetails($type, $identifier, $typeFields);

        return [
            'id' => $path['id'],
            'type' => $path['type'],
            'details' => $details
        ];
    }

    // vvv Could/Should be splitted up into separate functions and refactored to map
    private function getTypeDetails($type, $identifier, $typeFields) {
        switch ($type) {
            case 'post':
                $postId = $this->dataHelper->publicGetPostId($identifier);
                return $this->getPostDetails($postId, $typeFields);
            case 'author':
                $authorId = $this->dataHelper->publicGetAuthorId($identifier);
                return $this->authorDataProvider->getData($authorId, $typeFields);
            case 'category':
                $categoryId = $this->dataHelper->publicGetCategoryId($identifier);
                return $this->categoryDataProvider->getData($categoryId, $typeFields);
            //? New resolver needed - PathArchiveResolver to be implemented
            case 'archive':
                //? Should we return like default, but with date filter
                $date = date_parse(($identifier));
                $monthObject = \DateTime::createFromFormat('!m', $date['month']);
                $monthName = $monthObject->format('F');

                $year = $date['year'];

                return  [
                    'title' => 'Monthly Archives: ' . $monthName . ' ' . $year
                ];
            case 'tag':
                $tagId = $this->dataHelper->publicGetTagId($identifier);
                return $this->tagDataProvider->getData($tagId, $typeFields);
            case 'search':
                return ['title' => 'Search "' . $identifier . '"'];
            default:
                return ['title' => 'index'];
        }
    }

    protected function getPostDetails($postId, $typeFields)
    {
        $postDetails = $this->postDataProvider->getData($postId, $typeFields);

        if (isset($postDetails['categories'][0])) {
            $categoryDetails = $this->categoryDataProvider->getData($postDetails['categories'][0], $typeFields);
            $postDetails['breadcrumbs'] = $categoryDetails['breadcrumbs'];
        }

        return $postDetails;
    }
}
