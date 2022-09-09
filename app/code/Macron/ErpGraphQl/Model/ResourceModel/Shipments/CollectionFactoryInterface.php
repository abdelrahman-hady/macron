<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

namespace Macron\ErpGraphQl\Model\ResourceModel\Shipments;

/**
 * Class CollectionFactoryInterface
 */
interface CollectionFactoryInterface
{
    /**
     * Create class instance with specified parameters
     *
     * @param ?int $customerId
     * @return Collection
     */
    public function create(int $customerId = null): Collection;
}
