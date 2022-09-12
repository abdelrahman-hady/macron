<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\ErpGraphQl\Api\Data;

use Magento\Framework\Api\ExtensibleDataInterface;

interface ClientInterface extends ExtensibleDataInterface
{
    public const ENTITY_ID = 'entity_id';

    public const CUSTOMER_ID = 'customer_id';

    public const COMPANY_NAME = 'company_name';

    public const ADDRESS = 'address';

    public const VAT_NUMBER = 'vat_number';

    public const DATE = 'contract_expiracy_date';

    public const AFFILIATION = 'affiliation';

    public const SPORT = 'sport';

    public const CATEGORY = 'category';

    public const PRIMARY_COLOR = 'primary_color';

    public const SECONDARY_COLOR = 'secondary_color';

    public const CURRRENT_BRAND = 'current_brand';

    public const CONI_ID = 'coni_id';

    public const MEMBERSHIP_NO = 'membership_no';

    public const DISTANCE = 'distance';

    public const CONTACT_PERSON = 'contact_person';

    public const MOBILE = 'mobile';

    public const EMAIL = 'email';
}
