<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Plugin;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magefan\BlogGraphQl\Model\Resolver\Posts;
use Scandiweb\MagefanBlog\Helper\GalleryImagesUrl;

class AfterPosts
{
    protected $galleryImagesUrlProvider;

    public function __construct(
        GalleryImagesUrl $galleryImagesUrlProvider
    ) {
        $this->galleryImagesUrlProvider = $galleryImagesUrlProvider;
    }

    public function afterResolve(
        Posts $subject,
        $result,
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        // add gallery image url instead of file path for each Post inside items
        foreach ($result['items'] as &$postData) {
            // TODO: vvv This if else is similar to AfterPost.php, better to move util?
            if ($postData['media_gallery']){
                $postData['media_gallery'] = $this->galleryImagesUrlProvider->getGalleryImages($postData['media_gallery']);
            } else {
                $postData['media_gallery'] = [];
            }
        }

        return  $result;
    }
}
