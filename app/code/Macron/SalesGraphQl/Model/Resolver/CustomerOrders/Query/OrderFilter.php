<?php
/**
 * @category    Macron
 * @package     Macron_SalesGraphQl
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

namespace Macron\SalesGraphQl\Model\Resolver\CustomerOrders\Query;

use Magento\Framework\Exception\InputException;
use Magento\Framework\Api\Search\FilterGroup;
use ScandiPWA\SalesGraphQl\Model\Resolver\CustomerOrders\Query\OrderFilter as CoreOrderFilter;

class OrderFilter extends CoreOrderFilter
{
    /**
     * Change filter add logic for CoreOrderFilter class
     *
     * @param array $args
     * @param int $userId
     * @param int $storeId
     * @return FilterGroup[]
     */
    public function createFilterGroups(
        array $args,
        int $userId,
        int $storeId
    ): array {
        $filterGroups = [];

        $this->filterGroupBuilder->setFilters(
            [$this->filterBuilder->setField('customer_id')->setValue($userId)->setConditionType('eq')->create()]
        );
        $filterGroups[] = $this->filterGroupBuilder->create();

        // Next lines are added to filter order status by visible on front statuses
        $this->filterGroupBuilder->setFilters(
            [$this->filterBuilder->setField('status')->setValue($this->orderConfig->getVisibleOnFrontStatuses())->setConditionType('in')->create()]
        );
        $filterGroups[] = $this->filterGroupBuilder->create();

        if (isset($args['filter'])) {

            foreach ($args['filter'] as $field => $cond) {
                if (isset($this->fieldTranslatorArray[$field])) {
                    $field = $this->fieldTranslatorArray[$field];
                }

                foreach ($cond as $condType => $value) {
                    if ($condType === 'match') {
                        if (is_array($value)) {
                            throw new InputException(__('Invalid match filter'));
                        }

                        $searchValue = str_replace('%', '', $value);
                        $filters = $this->filterBuilder->setField($field)
                            ->setValue("%{$searchValue}%")
                            ->setConditionType('like')
                            ->create();
                        $this->filterGroupBuilder->setFilters([$filters]);
                        $filterGroups[] = $this->filterGroupBuilder->create();
                    } else {
                        $filters = $this->filterBuilder->setField($field)
                            ->setValue($value)
                            ->setConditionType($condType)
                            ->create();
                        $this->filterGroupBuilder->setFilters([$filters]);
                        $filterGroups[] = $this->filterGroupBuilder->create();
                    }
                }
            }
        }

        return $filterGroups;
    }
}