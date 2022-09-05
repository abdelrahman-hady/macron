<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model;

use Magento\Framework\Model\AbstractModel;
use Macron\ErpGraphQl\Model\ResourceModel\ClientsCollection;

class ClientsModel extends AbstractModel
{
    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init(ClientsCollection::class);
    }
}
