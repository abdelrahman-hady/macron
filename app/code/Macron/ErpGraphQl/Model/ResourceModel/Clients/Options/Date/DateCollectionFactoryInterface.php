<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Date;

/**
 * Class CollectionFactoryInterface
 */
interface DateCollectionFactoryInterface
{
    /**
     * Create class instance with specified parameters
     *
     * @return Collection
     */
    public function create(): Collection;
}
