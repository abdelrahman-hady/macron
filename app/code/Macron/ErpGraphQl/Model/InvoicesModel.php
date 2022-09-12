<?php

/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model;

use Macron\ErpGraphQl\Api\Data\InvoicesInterface;
use Macron\ErpGraphQl\Model\ResourceModel\InvoicesCollection;
use Magento\Framework\Model\AbstractExtensibleModel; 
 
class InvoicesModel extends AbstractExtensibleModel implements InvoicesInterface
{
    public const ID = 'id';
    public const USER_SAP_ID = 'user_sap_id';
    public const INVOICE_NUMBER = 'invoice_number';
    public const DATE = 'date';
    public const DUE_DATE = 'due_date';
    public const CURRENCY = 'currency';
    public const GRAND_TOTAL = 'grand_total';
    public const STATUS = 'status';
    public const DOWNLOAD_LINK = 'download_link';
    public const CONNECTED_ORDER_IDS = 'connected_order_ids';
    public const CONNECTED_SHIPMENT_IDS = 'connected_shipment_ids';

    public function __construct()
    {
        $this->_init(InvoicesCollection::class);
    }

    /**
     * @inheritDoc
     */
    public function getId()
    {
        return $this->_getData(self::ID);
    }

    /**
     * @inheritDoc
     */
    public function setId($id)
    {
        $this->setData(self::ID);
    }

    /**
     * @inheritDoc
     */
    public function getUserSapId()
    {
        return $this->_getData(self::USER_SAP_ID);
    }

    /**
     * @inheritDoc
     */
    public function setUserSapId(string $user_sap_id)
    {
        $this->setData(self::USER_SAP_ID);
    }

    /**
     * @inheritDoc
     */
    public function getInvoiceNumber()
    {
        return $this->_getData(self::INVOICE_NUMBER);
    }

    /**
     * @inheritDoc
     */
    public function setInvoiceNumber(string $invoice_number)
    {
        $this->setData(self::INVOICE_NUMBER);
    }

    /**
     * @inheritDoc
     */
    public function getDate()
    {
        return $this->_getData(self::DATE);
    }

    /**
     * @inheritDoc
     */
    public function setDate(string $date)
    {
        $this->setData(self::DATE);
    }

    /**
     * @inheritDoc
     */
    public function getGrandTotal()
    {
        return $this->_getData(self::GRAND_TOTAL);
    }

    /**
     * @inheritDoc
     */
    public function setGrandTotal(string $grand_total)
    {
        $this->setData(self::GRAND_TOTAL);
    }

    /**
     * @inheritDoc
     */
    public function getStatus()
    {
        return $this->_getData(self::STATUS);
    }

    /**
     * @inheritDoc
     */
    public function setStatus(string $status)
    {
        $this->setData(self::STATUS);
    }

    /**
     * @inheritDoc
     */
    public function getDownloadLink()
    {
        return $this->_getData(self::DOWNLOAD_LINK);
    }

    /**
     * @inheritDoc
     */
    public function setDownloadLink(string $download_link)
    {
        $this->setData(self::DOWNLOAD_LINK);
    }

    /**
     * @inheritDoc
     */
    public function getConnectedOrderIds()
    {
        return $this->_getData(self::CONNECTED_ORDER_IDS);
    }

    /**
     * @inheritDoc
     */
    public function setConnectedOrderIds(string $connected_order_ids)
    {
        $this->setData(self::CONNECTED_ORDER_IDS);
    }

    /**
     * @inheritDoc
     */
    public function getConnectedShipmentIds()
    {
        return $this->_getData(self::CONNECTED_SHIPMENT_IDS);
    }

    /**
     * @inheritDoc
     */
    public function setConnectedShipmentIds(string $connected_shipment_ids)
    {
        $this->setData(self::CONNECTED_SHIPMENT_IDS);
    }
    /**
     * @inheritDoc
     */
    function getDueDate()
    {
        return $this->_getData(self::DUE_DATE);
    }

    /**
     * @inheritDoc
     */
    function setDueDate(string $date)
    {
        $this->setData(self::DUE_DATE);
    }

    /**
     * @inheritDoc
     */
    function getCurrency()
    {
        return $this->_getData(self::CURRENCY);
    }

    /**
     * @inheritDoc
     */
    function setCurrency(string $currency)
    {
        $this->setData(self::CURRENCY);
    }
}
