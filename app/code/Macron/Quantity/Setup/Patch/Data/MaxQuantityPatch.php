<?PHP

/**
 * @category    Macron
 * @package     Macron_Quantity
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\Quantity\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

class MaxQuantityPatch implements DataPatchInterface
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
            "cataloginventory/item_options/max_sale_qty",
            999999
        );

        $this->configWriter->save(
            "cataloginventory/item_options/min_sale_qty",
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
