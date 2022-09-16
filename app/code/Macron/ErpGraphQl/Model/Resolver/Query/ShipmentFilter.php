<?php
/**
 * @category    Macron
 * @author      Opeyemi Ilesanmi <opeyemi.ilesanmi@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */

declare(strict_types=1);

namespace Macron\ErpGraphQl\Model\Resolver\Query;

use Magento\Framework\Api\FilterBuilder;
use Magento\Framework\Api\Search\FilterGroupBuilder;
use Magento\Framework\Exception\InputException;

class ShipmentFilter
{
    /**
     * @var FilterBuilder
     */
    private FilterBuilder $filterBuilder;

    /**
     * @var FilterGroupBuilder
     */
    private FilterGroupBuilder $filterGroupBuilder;

    /**
     * @param FilterBuilder $filterBuilder
     * @param FilterGroupBuilder $filterGroupBuilder
     */
    public function __construct(
        FilterBuilder $filterBuilder,
        FilterGroupBuilder $filterGroupBuilder
    ) {
        $this->filterBuilder = $filterBuilder;
        $this->filterGroupBuilder = $filterGroupBuilder;
    }

    /**
     * Create filter for filtering the requested shipments
     *
     * @param array $args
     * @param int $userId
     * @return array
     * @throws InputException
     */
    public function createFilterGroups(array $args, int $userId): array
    {
        $filterGroups = [];
        $this->filterGroupBuilder->setFilters(
            [$this->filterBuilder->setField('customer_id')->setValue($userId)->setConditionType('eq')->create()]
        );
        $filterGroups[] = $this->filterGroupBuilder->create();

        if (isset($args['filter'])) {
            $filters = [];
            foreach ($args['filter'] as $field => $cond) {
                foreach ($cond as $condType => $value) {
                    if ($condType === 'match') {
                        if (is_array($value)) {
                            throw new InputException(__('Invalid match filter'));
                        }
                        $searchValue = str_replace('%', '', $value);
                        $filters[] = $this->filterBuilder->setField($field)
                            ->setValue("%{$searchValue}%")
                            ->setConditionType('like')
                            ->create();
                    } else {
                        $filters[] = $this->filterBuilder->setField($field)
                            ->setValue($value)
                            ->setConditionType($condType)
                            ->create();
                    }
                }
            }

            $this->filterGroupBuilder->setFilters($filters);
            $filterGroups[] = $this->filterGroupBuilder->create();
        }

        return $filterGroups;
    }
}
