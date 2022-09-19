<?php
/**
 * @category    Macron
 * @author      Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare (strict_types=1);

namespace Macron\Migration\Setup\Patch\Data;

use Magento\Catalog\Model\Product;
use Magento\Catalog\Setup\CategorySetupFactory;
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;

class CreateProductAttributes implements DataPatchInterface
{
    protected EavSetupFactory $eavSetupFactory;

    /**
     * @var CategorySetupFactory
     */
    protected CategorySetupFactory $categorySetupFactory;

    /**
     * @var ModuleDataSetupInterface
     */
    protected ModuleDataSetupInterface $moduleDataSetup;

    protected const ATTRIBUTES = [
        'block_for_countries' => [
            'label' => 'Block For Countries',
            'input' => 'multiselect',
            'type' => 'varchar',
        ],
        'mcr_age' => [
            'label' => 'Età',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_brand' => [
            'label' => 'Brand',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_cat_level1' => [
            'label' => 'Macro Category',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_cat_level2' => [
            'label' => 'Category',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_colors' => [
            'label' => 'Colors',
            'input' => 'multiselect',
            'type' => 'varchar',
        ],
        'mcr_life_cycle' => [
            'label' => 'Life cycle',
            'input' => 'text',
            'type' => 'int',
        ],
        'mcr_default_color' => [
            'label' => 'Default Color',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_fabric' => [
            'label' => 'Fabric',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_fit' => [
            'label' => 'Fit',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_gender' => [
            'label' => 'Gender',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_product_line' => [
            'label' => 'Product line',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_product_type' => [
            'label' => 'MCR Product Type',
            'input' => 'select',
            'type' => 'int',
        ],
        'mcr_season' => [
            'label' => 'Mcr Season',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_sport' => [
            'label' => 'Macron Sport',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_team' => [
            'label' => 'Team',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_technical_informations' => [
            'label' => 'Technical Informations',
            'input' => 'multiselect',
            'type' => 'varchar',
        ],
        'mcr_total_look' => [
            'label' => 'Total Look',
            'input' => 'text',
            'type' => 'varchar',
        ],
        'mcr_castelletto' => [
            'label' => 'Castelletto',
            'input' => 'text',
            'type' => 'varchar',
        ]
    ];

    /**
     * @param ModuleDataSetupInterface $moduleDataSetup
     * @param EavSetupFactory $eavSetupFactory
     * @param CategorySetupFactory $categorySetupFactory
     */
    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        EavSetupFactory $eavSetupFactory,
        CategorySetupFactory $categorySetupFactory
    ) {
        $this->eavSetupFactory = $eavSetupFactory;
        $this->categorySetupFactory = $categorySetupFactory;
        $this->moduleDataSetup = $moduleDataSetup;
    }

    /**
     * @return void
     */
    public function apply()
    {
        $attributeGroupName = "Macron";
        $this->createAttributeGroup($attributeGroupName);

        $eavSetup = $this->eavSetupFactory->create();

        foreach (self::ATTRIBUTES as $attribute => $data) {
            $scope = $attribute === 'mcr_colors' ? ScopedAttributeInterface::SCOPE_GLOBAL : ScopedAttributeInterface::SCOPE_STORE;
            $eavSetup->addAttribute(
                Product::ENTITY,
                $attribute,
                [
                    ...$data,
                    ...[
                        'group' => $attributeGroupName,
                        'default' => null,
                        'global' => $scope,
                        'required' => false,
                        'user_defined' => false,
                        'is_visible_in_grid' => true,
                        'visible' => true,
                        'visible_on_front' => true,
                        'used_in_product_listing' => true,
                    ]
                ]
            );
        }
    }

    /**
     * @param string $name
     * @return void
     */
    protected function createAttributeGroup(string $name)
    {
        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);
        $entityTypeId = $categorySetup->getEntityTypeId(Product::ENTITY);
        $attributeSetId = $categorySetup->getDefaultAttributeSetId($entityTypeId);
        $categorySetup->addAttributeGroup($entityTypeId, $attributeSetId, $name, 11);
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
