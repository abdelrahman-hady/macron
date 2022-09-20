<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\DisableStock\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;

class DisableStockManagement implements DataPatchInterface
{
    /**
     * @var WriterInterface
     */
    protected WriterInterface $configWriter;

    /**
     * @param WriterInterface $configWriter
     */
    public function __construct(WriterInterface $configWriter)
    {
        $this->configWriter = $configWriter;
    }

    /**
     * {@inheritdoc}
     */
    public function apply(): void
    {
        $this->configWriter->save(
            'cataloginventory/options/can_subtract',
            0
        );

        $this->configWriter->save(
            'cataloginventory/item_options/manage_stock',
            0
        );
    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases(): array
    {
        return [];
    }
}
