<?php
/**
 * @category  Macron
 * @author    Abdelhakk Bakry <abdelhakk.bakry@scandiweb.com | info@scandiweb.com>
 * @license   http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 * @copyright Copyright (c) 2022 Scandiweb, Inc (https://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface InvoicesInterface extends ExtensibleDataInterface
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @param int $id
     * @return void
     */
    public function setId($id);

    /**
     * @return String
     */
    public function getUserSapId();

    /**
     * @param String $userSapId
     * @return void
     */
    public function setUserSapId(string $userSapId);

    /**
     * @return String
     */
    public function getInvoiceNumber();

    /**
     * @param String $invoiceNumber
     * @return void
     */
    public function setInvoiceNumber(string $invoiceNumber);

    /**
     * @return String
     */
    public function getDate();

    /**
     * @param String $date
     * @return void
     */
    public function setDate(string $date);

    /**
     * @return String
     */
    public function getDueDate();

    /**
     * @param String $date
     * @return void
     */
    public function setDueDate(string $date);

    /**
     * @return String
     */
    public function getCurrency();

    /**
     * @param String $currency
     * @return void
     */
    public function setCurrency(string $currency);

    /**
     * @return String
     */
    public function getGrandTotal();

    /**
     * @param String $grandTotal
     * @return void
     */
    public function setGrandTotal(string $grandTotal);

    /**
     * @return String
     */
    public function getStatus();

    /**
     * @param String $status
     * @return void
     */
    public function setStatus(string $status);

    /**
     * @return String
     */
    public function getDownloadLink();

    /**
     * @param String $downloadLink
     * @return void
     */
    public function setDownloadLink(string $downloadLink);

    /**
     * @return String
     */
    public function getConnectedOrderIds();

    /**
     * @param String $connectedOrderIds
     * @return void
     */
    public function setConnectedOrderIds(string $connectedOrderIds);

    /**
     * @return String
     */
    public function getConnectedShipmentIds();
}
