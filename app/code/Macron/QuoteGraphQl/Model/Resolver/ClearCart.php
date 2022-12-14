<?php
/**
 * @category    Macron
 * @package     Macron_QuoteGraphQl
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\QuoteGraphQl\Model\Resolver;

use Magento\Framework\Exception\CouldNotSaveException;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Quote\Api\CartItemRepositoryInterface;
use Magento\Quote\Api\CartRepositoryInterface;
use Magento\Quote\Api\GuestCartItemRepositoryInterface;
use Magento\Quote\Api\GuestCartRepositoryInterface;
use Magento\Quote\Model\Webapi\ParamOverriderCartId;
use Exception;

class ClearCart implements ResolverInterface
{
    /**
     * @var GuestCartItemRepositoryInterface
     */
    protected GuestCartItemRepositoryInterface $guestCartItemRepository;

    /**
     * @var CartItemRepositoryInterface
     */
    protected CartItemRepositoryInterface $cartItemRepository;

    /**
     * @var CartRepositoryInterface
     */
    protected CartRepositoryInterface $cartRepository;

    /**
     * @var GuestCartRepositoryInterface
     */
    protected GuestCartRepositoryInterface $guestCartRepository;

    /**
     * @var ParamOverriderCartId
     */
    protected ParamOverriderCartId $overriderCartId;

    /**
     * ClearCart constructor.
     * @param CartItemRepositoryInterface $cartItemRepository
     * @param GuestCartItemRepositoryInterface $guestCartItemRepository
     * @param ParamOverriderCartId $overriderCartId
     * @param GuestCartRepositoryInterface $guestCartRepository
     * @param CartRepositoryInterface $cartRepository
     */
    public function __construct(
        CartItemRepositoryInterface $cartItemRepository,
        GuestCartItemRepositoryInterface $guestCartItemRepository,
        ParamOverriderCartId $overriderCartId,
        GuestCartRepositoryInterface $guestCartRepository,
        CartRepositoryInterface $cartRepository
    ) {
        $this->overriderCartId = $overriderCartId;
        $this->cartItemRepository = $cartItemRepository;
        $this->guestCartItemRepository = $guestCartItemRepository;
        $this->guestCartRepository = $guestCartRepository;
        $this->cartRepository = $cartRepository;
    }

    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args =
     * @throws CouldNotSaveException
     * @throws NoSuchEntityException
     * @throws Exception
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        try {
            if (isset($args['guestCartId'])) {
                $guestCartId = $args['guestCartId'];
                $cart = $this->guestCartRepository->get($guestCartId);
                if ($cart->getItemsCount()) {
                    $cartItems = $cart->getItems();
                    foreach ($cartItems as $item) {
                        $this->guestCartItemRepository->deleteById($guestCartId, $item->getItemId());
                    }
                }
            } else {
                $cartId = $this->overriderCartId->getOverriddenValue();
                $cart = $this->cartRepository->get($cartId);
                if ($cart->getItemsCount()) {
                    $cartItems = $cart->getItems();
                    foreach ($cartItems as $item) {
                        $this->cartItemRepository->deleteById($cartId, $item->getItemId());
                    }
                }

            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

    }
}
