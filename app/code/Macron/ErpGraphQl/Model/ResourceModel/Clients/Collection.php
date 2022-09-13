<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\ResourceModel\Clients;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init(
            ClientsModel::class,
            ClientsCollection::class
        );
    }

    /**
     * Join all foreign tables
     *
     * @return $this
     */
    public function joinTables(): static
    {
        $this
            ->getSelect()
            ->joinLeft('erp_affiliation', 'erp_affiliation.id = main_table.affiliation_id', ['affiliation'])
            ->joinLeft('erp_contract_expiracy_date', 'erp_contract_expiracy_date.id = main_table.date_id', ['date'])
            ->joinLeft('erp_current_brand', 'erp_current_brand.id = main_table.current_brand_id', ['current_brand'])
            ->joinLeft('erp_sport', 'erp_sport.id = main_table.sport_id', ['sport'])
            ->joinLeft('erp_distance', 'erp_distance.id = main_table.distance_id', ['distance'])
            ->joinLeft(
                'erp_color as primaryColor',
                'primaryColor.id = main_table.primary_color_id',
                ['primary_color' => 'color']
            )
            ->joinLeft(
                'erp_color as secondaryColor',
                'secondaryColor.id = main_table.secondary_color_id',
                ['secondary_color' => 'color']
            );

        return $this;
    }
}
