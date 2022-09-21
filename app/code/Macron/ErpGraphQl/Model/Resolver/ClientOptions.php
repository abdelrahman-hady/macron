<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver;

use Macron\ErpGraphQl\Model\ResourceModel\Clients\CollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Affiliation\AffiliationCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Color\ColorCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\CurrentBrand\CurrentBrandCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Date\DateCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Distance\DistanceCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Sport\SportCollectionFactory;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthorizationException;
use Magento\Framework\GraphQl\Query\Resolver\Value;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\GraphQl\Model\Query\ContextInterface;
use Magento\Store\Model\StoreManagerInterface;

class ClientOptions implements ResolverInterface
{
    /**
     * @var AffiliationCollectionFactory
     */
    private AffiliationCollectionFactory $affiliationFactory;

    /**
     * @var DateCollectionFactory
     */
    private DateCollectionFactory $dateFactory;

    /**
     * @var CurrentBrandCollectionFactory
     */
    private CurrentBrandCollectionFactory $currentBrandFactory;

    /**
     * @var SportCollectionFactory
     */
    private SportCollectionFactory $sportFactory;

    /**
     * @var ColorCollectionFactory
     */
    private ColorCollectionFactory $colorFactory;

    /**
     * @var DistanceCollectionFactory
     */
    private DistanceCollectionFactory $distanceFactory;

    /**
     * @param StoreManagerInterface $storeManager
     * @param AffiliationCollectionFactory $affiliationFactory
     * @param DateCollectionFactory $dateFactory
     * @param CurrentBrandCollectionFactory $currentBrandFactory
     * @param SportCollectionFactory $sportFactory
     * @param ColorCollectionFactory $colorFactory
     * @param DistanceCollectionFactory $distanceFactory
     */
    public function __construct(
        StoreManagerInterface $storeManager,
        AffiliationCollectionFactory $affiliationFactory,
        DateCollectionFactory $dateFactory,
        CurrentBrandCollectionFactory $currentBrandFactory,
        SportCollectionFactory $sportFactory,
        ColorCollectionFactory $colorFactory,
        DistanceCollectionFactory $distanceFactory
    ) {
        $this->affiliationFactory = $affiliationFactory;
        $this->dateFactory = $dateFactory;
        $this->currentBrandFactory = $currentBrandFactory;
        $this->sportFactory = $sportFactory;
        $this->colorFactory = $colorFactory;
        $this->distanceFactory = $distanceFactory;
    }

    /**
     * Get all customer clients resolver
     *
     * @param Field $field
     * @param ContextInterface $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array|Value|mixed|null
     * @throws GraphQlAuthorizationException
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (!$context->getExtensionAttributes()->getIsCustomer()) {
            throw new GraphQlAuthorizationException(__("The current customer isn't authorized."));
        }

        return [
            'affiliations' => $this->affiliationFactory->create()->getData(),
            'current_brands' => $this->currentBrandFactory->create()->getData(),
            'dates' => $this->dateFactory->create()->getData(),
            'sports' => $this->sportFactory->create()->getData(),
            'colors' => $this->colorFactory->create()->getData(),
            'distances' => $this->distanceFactory->create()->getData()
        ];
    }
}
