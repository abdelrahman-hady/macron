<?php

/**
 * Magefan Blog backend compatibility ScandiPWA
 * @copyright Scandiweb, Inc. All rights reserved.
 */

namespace Scandiweb\MagefanBlog\Helper;

use Magefan\Blog\Model\ImageFactory;

Class GalleryImagesUrl {
    const GALLERY_IMAGES_SEPARATOR = ';';
    // ^^^ Copied form Magefan\Blog\Model\Post
    protected $imageFactory;

    public function __construct(
        ImageFactory $imageFactory
    ) {
        $this->imageFactory = $imageFactory;
    }

    public function getGalleryImages($gallery)
    {
        $images = [];

        // vvv gallery comes from original extension and it might be array so we need to check
        // vvv if its not array then create an array from it
        if ($gallery && !is_array($gallery)) {
            $gallery = explode(
                self::GALLERY_IMAGES_SEPARATOR,
                $gallery
            );
        }

        // vvv its not before previous if because in case we might have string instead of array
        if (empty($gallery)) {
            return $images;
        }

        foreach ($gallery as $file) {
            if (!$file) {
                continue;
            }

            $images[] = $this->imageFactory->create()
                    ->setFile($file);
        }

        return $images;
    }
}
