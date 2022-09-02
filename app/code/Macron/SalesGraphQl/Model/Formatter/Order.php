<?php
/**
 * @category    Macron
 * @package     Macron_SalesGraphQl
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\SalesGraphQl\Model\Formatter;

use ScandiPWA\SalesGraphQl\Model\Formatter\Order as SourceOrder;
use Magento\Sales\Api\Data\OrderInterface;

class Order extends SourceOrder
{
    private const FIELD_INTERNAL_NOTE= 'internal_note';
    private const FIELD_REFERENCE_NOTE = 'reference_note';

    /**
     * Format order model for graphql schema
     *
     * @param OrderInterface $orderModel
     * @return array
     */
    public function format(OrderInterface $orderModel): array
    {
        $data = [
            'internal_note' => $orderModel->getData(self::FIELD_INTERNAL_NOTE),
            'reference_note' => $orderModel->getData(self::FIELD_REFERENCE_NOTE),
        ];

        return array_merge($data, parent::format($orderModel));
    }
}
