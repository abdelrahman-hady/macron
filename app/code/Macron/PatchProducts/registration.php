<?php
/**
 * @category    Macron
 * @package     Macron_PatchProducts
 * @author      Juris Kucinskis <juris.kucinskis@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Ltd (https://scandiweb.com)
 */
declare(strict_types=1);

 use Magento\Framework\Component\ComponentRegistrar;

 ComponentRegistrar::register(
     ComponentRegistrar::MODULE,
     'Macron_PatchProducts',
     __DIR__
 );
