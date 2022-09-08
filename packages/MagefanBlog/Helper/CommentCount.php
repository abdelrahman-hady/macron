<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Helper;

use Magento\Store\Model\StoreManagerInterface;
use Scandiweb\GtmGraphQl\Block\Adminhtml\Form\Field\VariableTypes;
use Scandiweb\GtmGraphQl\Model\Adminhtml\Config\System\ProductVariables;
use ScandiPWA\Performance\Model\ResourceModel\Product\CollectionFactory;
use Magento\Framework\EntityManager\MetadataPool;
use Magento\Framework\App\ResourceConnection;
use Magento\Framework\DB\Adapter\AdapterInterface;

class CommentCount
{
    public $config;
    protected $productCollection;
    protected $metadataPool;
    protected $connection;
    protected StoreManagerInterface $storeManager;

    /**
     * Configurable constructor.
     */
    public function __construct(
        ResourceConnection $resource
    ) {
        $this->connection = $resource->getConnection();
    }

    public function getPostCommentsCount($postIDs){
        $postIDInts = [];

        foreach ($postIDs as $id) {
            // ? Got same ids for few times
            $postIDInts[] = (int) $id;
        }

        // Which field to select
        $select = $this->connection->select('post_id')
            // Group by column
            ->group('post_id')
            // from which table, which columns to return
            ->from(
                $this->connection->getTableName('magefan_blog_comment'),
                ['post_id','count(*) as count']
                )
                ->where(
                    'post_id IN (?)', $postIDInts
                );

            $commentCounts =  $this->connection->fetchAll($select);
            // vvv array fill needs to be implemented
            $resultArray = [];

            foreach($postIDs as $id){
                $found = false;

                foreach($commentCounts as $comment){
                    if($comment['post_id'] === $id){
                        $resultArray[] = (int) $comment['count'];
                        $found = true;
                        break;
                    }
                }

                if(!$found){
                    // Returns 0 as an empty string as well as 'false'
                    $resultArray[] = 0;
                }
            }

        return $resultArray;
    }
}
