<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 * Most of functions and snippets are copied from original extension
 * Original file: vendor/magefan/module-blog/Block/Post/View/NextPrev.php
 */

namespace Scandiweb\MagefanBlog\Helper;

use Magefan\Blog\Api\PostRepositoryInterface;
use Magefan\Blog\Model\ResourceModel\Post\CollectionFactory;
use Magento\Store\Model\StoreManagerInterface;


class NextPrev
{
    private $postRepository;
    protected $postCollectionFactory;
    protected $storeManager;
    private $currentPost;

    public function __construct(
        PostRepositoryInterface $postRepository,
        CollectionFactory $postCollectionFactory,
        StoreManagerInterface $storeManager
    ) {
        $this->postRepository = $postRepository;
        $this->postCollectionFactory = $postCollectionFactory;
        $this->storeManager = $storeManager;
    }

    // vvv Added for migration
    public function getNextPrevPost($currentPostId){
        $this->currentPost = $this->getCurrentPostInstance($currentPostId);
        // ^^^ we saved currentPost inside $this because of the logic they are using inside ...
        // ^^^ getNextPost() and getPrevPost()

        return [
            'prevPost' => $this->getNextPost(),
            'nextPost' => $this->getPrevPost()
        ];
    }

    // vvv Copied from original extension file
    public function getNextPost()
    {
        $collection = $this->_getFrontendCollection()->addFieldToFilter(
            'publish_time',
            ['lteq' => $this->currentPost->getPublishTime()]
            )->setOrder('publish_time', 'DESC');

        $post = $collection->getFirstItem();

        if ($this->currentPost->getPublishTime() == $post->getPublishTime()) {

            $collection = $this->postCollectionFactory->create();
            $collection->addActiveFilter()
                ->addStoreFilter($this->storeManager->getStore()->getId())
                ->addFieldToFilter('publish_time', $this->currentPost->getPublishTime())
                ->setOrder('post_id', 'ASC');

            if ($collection->getFirstItem()->getId() != $this->currentPost->getId()) {
                foreach ($collection as $item) {
                    if ($item->getId() != $this->currentPost->getId()) {
                        $post = $item;
                    } else {
                        break;
                    }
                }
            } else {
                $collection = $this->_getFrontendCollection()->addFieldToFilter(
                    'publish_time',
                    ['lt' => $this->currentPost->getPublishTime()]
                );
                $post = $collection->getFirstItem();
            }
        }

        if ($post->getId()) {
            return [
                'title' => $post->getTitle(),
                'url' => $post->getPostUrl()
            ];
        }

        return null;
    }

    // vvv Copied from original extension file
    public function getPrevPost()
    {
        $collection = $this->_getFrontendCollection()->addFieldToFilter(
            'publish_time',
            ['gteq' => $this->currentPost->getPublishTime()]
        )->setOrder('publish_time', 'ASC');

        $post = $collection->getFirstItem();

        if ($this->currentPost->getPublishTime() == $post->getPublishTime()) {

            $collection = $this->postCollectionFactory->create();
            $collection->addActiveFilter()
                ->addStoreFilter($this->storeManager->getStore()->getId())
                ->addFieldToFilter('publish_time', $this->currentPost->getPublishTime())
                ->setOrder('post_id', 'DESC');

            if ($collection->getFirstItem()->getId() != $this->currentPost->getId()) {
                foreach ($collection as $item) {
                    if ($item->getId() != $this->currentPost->getId()) {
                        $post = $item;
                    } else {
                        break;
                    }
                }
            } else {
                $collection = $this->_getFrontendCollection()->addFieldToFilter(
                    'publish_time',
                    ['gt' => $this->currentPost->getPublishTime()]
                );
                $post = $collection->getFirstItem();
            }
        }

        if ($post->getId()) {
            return [
                'title' => $post->getTitle(),
                'url' => $post->getPostUrl()
            ];
        }

        return null;
    }

    // vvv Added for migration
    public function getCurrentPostInstance($postId)
    {
        $post = $this->postRepository->getFactory()->create();
        $post->getResource()->load($post, $postId);

        return $post;
    }

    // vvv Copied from original extension file
    protected function _getFrontendCollection()
    {
        $collection = $this->postCollectionFactory->create();
        $collection->addActiveFilter()
            ->addFieldToFilter('post_id', ['neq' => $this->currentPost->getId()])
            ->addStoreFilter($this->storeManager->getStore()->getId())
            ->setPageSize(1);

        return $collection;
    }
}
