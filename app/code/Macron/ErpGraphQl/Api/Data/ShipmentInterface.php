<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface ShipmentInterface extends ExtensibleDataInterface
{
    public const ENTITY_ID = 'entity_id';

    public const SHIPMENT_NUMBER = 'shipment_number';

    public const STATUS = 'status';

    public const ADDRESS = 'address';

    public const CUSTOMER_NAME = 'customer_name';

    public const DATE = 'date';

    public const TRACKING_NUMBER = 'tracking_number';

}
