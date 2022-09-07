<?php

namespace Scandiweb\MagefanBlog\Validator;

use Magento\Framework\App\RequestInterface;
use Magefan\Blog\Model\UrlResolver as Data;
use ScandiPWA\Router\PathTrait;
use ScandiPWA\Router\ValidatorInterface;

class Blog implements ValidatorInterface
{
    protected Data $dataHelper;

    public function __construct(
        Data $dataHelper
    ) {
        $this->dataHelper = $dataHelper;
    }

    public function validateRequest(RequestInterface $request): bool
    {
        $path = $this->dataHelper->resolve($request->getPathInfo());

        if(is_null($path)){
            return false;
        }

        return true;
    }
}
