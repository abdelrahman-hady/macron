<?php

/**
 * @category    Macron
 * @package     Macron_MyClients
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 */

declare(strict_types=1);

namespace Macron\MyClients\Setup\Patch\Data;

use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Cms\Model\PageFactory;

class AddMyClientsPage implements DataPatchInterface
{
    /**
     * @var PageFactory
     */
    protected PageFactory $_pageFactory;

    /**
     * @param PageFactory $pageFactory
     */
    public function __construct(PageFactory $pageFactory)
    {
        $this->_pageFactory = $pageFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function apply(): void
    {
        $page = $this->_pageFactory->create();
        $page->setTitle("My clients")
            ->setIdentifier("my-clients")
            ->setIsActive(true)
            ->setPageLayout('1column')
            ->setStores([0])
            ->save();
    }

    /**
     * {@inheritdoc}
     */
    public static function getDependencies(): array
    {
        return [];
    }

    /**
     * {@inheritdoc}
     */
    public function getAliases(): array
    {
        return [];
    }
}
