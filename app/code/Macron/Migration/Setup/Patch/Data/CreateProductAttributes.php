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
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Setup\EavSetupFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;

class CreateProductAttributes implements DataPatchInterface
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
            'block_for_countries',
            [
                'label' => 'Block For Countries',
                'group' => 'Product Details',
                'input' => 'multiselect',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_age',
            [
                'label' => 'Età',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_brand',
            [
                'label' => 'Brand',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_castelletto',
            [
                'label' => 'Castelletto',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_cat_level1',
            [
                'label' => 'Macro Category',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_cat_level2',
            [
                'label' => 'Category',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_colors',
            [
                'label' => 'Colors',
                'group' => 'Product Details',
                'input' => 'multiselect',
                'type' => 'varchar',
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

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_life_cycle',
            [
                'label' => 'Life cycle',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_default_color',
            [
                'label' => 'Default Color',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_fabric',
            [
                'label' => 'Fabric',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_fit',
            [
                'label' => 'Fit',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_gender',
            [
                'label' => 'Gender',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_product_line',
            [
                'label' => 'Product line',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_product_type',
            [
                'label' => 'MCR Product Type',
                'group' => 'Product Details',
                'input' => 'select',
                'type' => 'int',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_season',
            [
                'label' => 'Mcr Season',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_sport',
            [
                'label' => 'Macron Sport',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_team',
            [
                'label' => 'Team',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );


        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_technical_informations',
            [
                'label' => 'Technical Informations',
                'group' => 'Product Details',
                'input' => 'multiselect',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
                'required' => false,
                'user_defined' => false,
                'is_visible_in_grid' => true,
                'visible' => true,
                'visible_on_front' => true,
                'used_in_product_listing' => true,
            ]
        );

        $eavSetup->addAttribute(
            Product::ENTITY,
            'mcr_total_look',
            [
                'label' => 'Total Look',
                'group' => 'Product Details',
                'input' => 'text',
                'type' => 'varchar',
                'default' => null,
                'global' => ScopedAttributeInterface::SCOPE_STORE,
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
