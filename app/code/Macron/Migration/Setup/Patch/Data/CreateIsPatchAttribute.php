<?php
/**
 * @category    Macron
 * @author      Deniss Dubinins <denissd@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare (strict_types=1);

namespace Macron\Migration\Setup\Patch\Data;

use Magento\Catalog\Model\Product;
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;

class CreateIsPatchAttribute implements DataPatchInterface
{
    protected EavSetupFactory $eavSetupFactory;

    /**
     * @param EavSetupFactory $eavSetupFactory
     */
    public function __construct(EavSetupFactory $eavSetupFactory)
    {
        $this->eavSetupFactory = $eavSetupFactory;
    }

    /**
     * @return void
     */
    public function apply()
    {
        $eavSetup = $this->eavSetupFactory->create();
        $eavSetup->addAttribute(
            Product::ENTITY,
            'is_patch',
            [
                'label' => 'Is Patch',
                'group' => 'Product Details',
                'input' => 'boolean',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_GLOBAL,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );
    }
     /**
     * {@inheritDoc}
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * {@inheritDoc}
     */
    public function getAliases(): array
    {
        return [];
    }
}
