<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\PimGraphQl\Model\ResourceModel\PimStock;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    /**
     * @return void
     */
    protected function _construct(): void
    {
        $this->_init(
            PimStockModel::class,
            PimStockCollection::class
        );
    }

    /**
     * Get pim stock with formatted new arrivals
     *
     * @return array
     */
    public function getFormattedData(): array
    {
        $result = $this->getData();

        foreach ($result as $i => $item) {
            $newArrivals = json_decode($item['new_arrivals'], true);

            foreach ($newArrivals as $j => $newArrival) {
                $newArrivals[$j]['qty'] = $newArrival['Qty'];
                $newArrivals[$j]['date'] = $newArrival['Date'];
            }
            $result[$i]['newArrivals'] = $newArrivals;
        }

        return $result;
    }

    /**
     * @return $this
     */
    protected function _afterLoadData(): static
    {
        parent::_afterLoadData();

        $collection = clone $this;

        if (count($collection)) {
            $this->_eventManager->dispatch(
                'macron_pimgraphql_pimstock_collection_load_after',
                ['collection' => $collection]
            );
        }

        return $this;
    }
}
