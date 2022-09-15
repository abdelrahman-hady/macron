<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\PimGraphQl\Model\ResourceModel\PimStock;

use Magento\Framework\ObjectManagerInterface;

class PimStockCollectionFactory implements PimStockCollectionFactoryInterface
{
    /**
     * Object Manager instance
     *
     * @var ?ObjectManagerInterface
     */
    private ?ObjectManagerInterface $objectManager = null;

    /**
     * Instance name to create
     *
     * @var ?string
     */
    private ?string $instanceName = null;

    /**
     * Factory constructor
     *
     * @param ObjectManagerInterface $objectManager
     * @param string $instanceName
     */
    public function __construct(
        ObjectManagerInterface $objectManager,
        string $instanceName = Collection::class
    ) {
        $this->objectManager = $objectManager;
        $this->instanceName = $instanceName;
    }

    /**
     * Create clients collection
     *
     * {@inheritdoc}
     */
    public function create(): Collection
    {
        return $this->objectManager->create($this->instanceName);
    }
}
