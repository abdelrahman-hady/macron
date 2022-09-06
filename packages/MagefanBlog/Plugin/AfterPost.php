<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Plugin;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magefan\BlogGraphQl\Model\Resolver\Post;
use Scandiweb\MagefanBlog\Helper\GalleryImagesUrl;
use Scandiweb\MagefanBlog\Helper\NextPrev;

class AfterPost
{
    protected $galleryImagesUrlProvider;
    protected $nextPrevDataProvider;

    public function __construct(
        GalleryImagesUrl $galleryImagesUrlProvider,
        NextPrev $nextPrevDataProvider
    ) {
        $this->galleryImagesUrlProvider = $galleryImagesUrlProvider;
        $this->nextPrevDataProvider = $nextPrevDataProvider;
    }

    public function afterResolve(
        Post $subject,
        $result,
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        // TODO: vvv This if else is similar to AfterPosts.php, better to move util?
        // vvv add gallery image url instead of file path
        if ($result['media_gallery']){
            $result['media_gallery'] = $this->galleryImagesUrlProvider->getGalleryImages($result['media_gallery']);
        } else {
            $result['media_gallery'] = [];
        }

        // add prevPost and nextPost
        $nextPrevPost = $this->nextPrevDataProvider->getNextPrevPost($result["post_id"]);
        $result["prevPost"] = $nextPrevPost["prevPost"];
        $result["nextPost"] = $nextPrevPost["nextPost"];

        return  $result;
    }
}
