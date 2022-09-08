<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Helper;

use Magefan\Blog\Model\UrlResolver;


class Data extends UrlResolver
{
    /**
     * Retrieve post id by identifier
     * @param  string $identifier
     * @return int
     */
    public function publicGetPostId($identifier)
    {
        return $this->_getPostId($identifier);
    }

    /**
     * Retrieve category id by identifier
     * @param  string $identifier
     * @return int
     */
    public function publicGetCategoryId($identifier)
    {
        return $this->_getCategoryId($identifier);
    }

    /**
     * Retrieve author id by identifier
     * @param  string $identifier
     * @return int
     */
    public function publicGetAuthorId($identifier)
    {
        return $this->_getAuthorId($identifier);
    }

    /**
     * Retrieve tag id by identifier
     * @param string $identifier
     * @return int
     */
    public function publicGetTagId($identifier)
    {
        return $this->_getTagId($identifier);
    }
}
