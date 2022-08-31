<?php
/**
 * @category    Macron
 * @package     Macron_SalesGraphQl
 * @author      Marian Zakareishvili <mariam.zakareishvili@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

 use Magento\Framework\Component\ComponentRegistrar;

 ComponentRegistrar::register(
     ComponentRegistrar::MODULE,
     'Macron_SalesGraphQl',
     __DIR__
 );
