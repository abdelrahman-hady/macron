<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\ResourceModel\Shipments;

use Macron\ErpGraphQl\Api\Data\ShipmentInterface;
use Magento\Framework\Model\AbstractExtensibleModel;

class Shipment extends AbstractExtensibleModel implements ShipmentInterface
{
    public const NAME = 'shipment';

    /**
     * @return void
     */
    protected function _construct()
    {
        $this->_init(ShipmentsCollection::class);
    }
}
