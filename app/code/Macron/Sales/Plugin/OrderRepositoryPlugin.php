<?php
/**
 * @category    Macron
 * @package     Macron_Sales
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\Sales\Plugin;

use Magento\Framework\Exception\LocalizedException;
use Magento\Quote\Model\QuoteRepository;
use Magento\Sales\Api\Data\OrderInterface;
use Magento\Sales\Api\OrderRepositoryInterface;

class OrderRepositoryPlugin
{
    private const FIELD_INTERNAL_NOTE= 'internal_note';
    private const FIELD_REFERENCE_NOTE = 'reference_note';

    /**
     * @var QuoteRepository
     */
    private QuoteRepository $quoteRepository;

    /**
     * @param QuoteRepository $quoteRepository
     */
    public function __construct(
        QuoteRepository $quoteRepository
    ) {
        $this->quoteRepository = $quoteRepository;
    }

    /**
     * @param OrderRepositoryInterface $subject
     * @param OrderInterface $order
     * @throws LocalizedException
     */
    public function beforeSave(OrderRepositoryInterface $subject, OrderInterface $order): void
    {
        $quote = $this->quoteRepository->get($order->getQuoteId());
        $internalNote = $quote->getShippingAddress()->getData(self::FIELD_INTERNAL_NOTE);
        $referenceNote = $quote->getShippingAddress()->getData(self::FIELD_REFERENCE_NOTE);

        $sanitizedInternalNote = $internalNote ? htmlspecialchars(trim($internalNote), ENT_NOQUOTES) : $internalNote;
        $sanitizedReferenceNote = $referenceNote ? htmlspecialchars(trim($referenceNote), ENT_NOQUOTES) : $referenceNote;

        $order->setData(self::FIELD_INTERNAL_NOTE, $sanitizedInternalNote);
        $order->setData(self::FIELD_REFERENCE_NOTE, $sanitizedReferenceNote);
    }
}
