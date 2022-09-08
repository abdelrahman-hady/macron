<?php

/**
 * MagefanBlog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

declare(strict_types=1);

namespace Scandiweb\MagefanBlog\Model\Resolver;

use Magento\Framework\GraphQl\Query\Resolver\BatchServiceContractResolverInterface;
use Magento\Framework\GraphQl\Query\Resolver\ResolveRequestInterface;
use Scandiweb\MagefanBlog\Helper\CommentCount;
use Magento\Framework\Exception\LocalizedException;

/**
 * Retrieve comment count matching the specified post_id.
 *
 * @throws \Magento\Framework\Exception\LocalizedException
 */
class GetCommentCount implements BatchServiceContractResolverInterface
{
    public function getServiceContract(): array {
		return [CommentCount::class, 'getPostCommentsCount'];
    }

    public function convertToServiceArgument(ResolveRequestInterface $request) {
        $value = $request->getValue();

        if (empty($value['post_id'])) {
            throw new LocalizedException(__('"post_id" value should be specified'));
        }

        // Returns an array of post_ids
        return $value['post_id'];
    }

    public function convertFromServiceResult($result, ResolveRequestInterface $request) {
        return $result;
    }
}
