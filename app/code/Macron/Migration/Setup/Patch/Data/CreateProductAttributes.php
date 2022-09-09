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

    protected const ATTRIBUTES = [
        'block_for_countries' => 'Block For Countries,multiselect,varchar',
        'mcr_age' => 'Età,select,int',
        'mcr_brand' => 'Brand,text,varchar',
        'mcr_cat_level1' => 'Macro Category,text,varchar',
        'mcr_cat_level2' => 'Category,text,varchar',
        'mcr_colors' => 'Colors,multiselect,varchar',
        'mcr_life_cycle' => 'Life cycle,text,int',
        'mcr_default_color' => 'Default Color,select,int',
        'mcr_fabric' => 'Fabric,select,int',
        'mcr_fit' => 'Fit,select,int',
        'mcr_gender' => 'Gender,select,int',
        'mcr_product_line' => 'Product line,select,int',
        'mcr_product_type' => 'MCR Product Type,select,int',
        'mcr_season' => 'Mcr Season,text,varchar',
        'mcr_sport' => 'Macron Sport,text,varchar',
        'mcr_team' => 'Team,text,varchar',
        'mcr_technical_informations' => 'Technical Informations,multiselect,varchar',
        'mcr_total_look' => 'Total Look,text,varchar',
        'mcr_castelletto' => 'Castelletto,text,varchar'
    ];

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

        foreach (self::ATTRIBUTES as $attribute => $data) {
            $scope = $attribute === 'mcr_colors' ?  ScopedAttributeInterface::SCOPE_GLOBAL :  ScopedAttributeInterface::SCOPE_STORE;
            $data = explode(",", $data);
            $eavSetup->addAttribute(
                Product::ENTITY,
                $attribute,
                [
                    'label' => $data[0],
                    'group' => 'Product Details',
                    'input' => $data[1],
                    'type' => $data[2],
                    'default' => null,
                    'global' => $scope,
                    'required' => false,
                    'user_defined' => false,
                    'is_visible_in_grid' => true,
                    'visible' => true,
                    'visible_on_front' => true,
                    'used_in_product_listing' => true,
                ]
            );
        }
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
