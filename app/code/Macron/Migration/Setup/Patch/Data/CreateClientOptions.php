<?php
/**
 * @category    Macron
 * @author      Vladyslav Ivashchenko <vladyslav.ivashchenko@scandiweb.com | info@scandiweb.com>
 * @copyright   Copyright (c) 2022 Scandiweb, Inc (http://scandiweb.com)
 * @license     http://opensource.org/licenses/OSL-3.0 The Open Software License 3.0 (OSL-3.0)
 */
declare(strict_types=1);

namespace Macron\Migration\Setup\Patch\Data;

use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Affiliation\AffiliationCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Color\ColorCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\CurrentBrand\CurrentBrandCollection;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\CurrentBrand\CurrentBrandCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\CurrentBrand\CurrentBrandCollectionFactoryInterface;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Date\DateCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Distance\DistanceCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\PrimaryColor\PrimaryColorCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\SecondaryColor\SecondaryColorCollection;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\SecondaryColor\SecondaryColorCollectionFactory;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\SecondaryColor\SecondaryColorCollectionFactoryInterface;
use Macron\ErpGraphQl\Model\ResourceModel\Clients\Options\Sport\SportCollectionFactory;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Store\Model\StoreManagerInterface;

class CreateClientOptions implements DataPatchInterface
{
    /**
     * @var StoreManagerInterface
     */
    private StoreManagerInterface $storeManager;

    /**
     * @var AffiliationCollectionFactory
     */
    private AffiliationCollectionFactory $affiliationFactory;

    /**
     * @var DateCollectionFactory
     */
    private DateCollectionFactory $dateFactory;

    /**
     * @var CurrentBrandCollectionFactory
     */
    private CurrentBrandCollectionFactory $currentBrandFactory;

    /**
     * @var SportCollectionFactory
     */
    private SportCollectionFactory $sportFactory;

    /**
     * @var ColorCollectionFactory
     */
    private ColorCollectionFactory $colorFactory;

    /**
     * @var DistanceCollectionFactory
     */
    private DistanceCollectionFactory $distanceFactory;

    /**
     * @param StoreManagerInterface $storeManager
     * @param AffiliationCollectionFactory $affiliationFactory
     * @param DateCollectionFactory $dateFactory
     * @param CurrentBrandCollectionFactory $currentBrandFactory
     * @param SportCollectionFactory $sportFactory
     * @param ColorCollectionFactory $colorFactory
     * @param DistanceCollectionFactory $distanceFactory
     */
    public function __construct(
        StoreManagerInterface $storeManager,
        AffiliationCollectionFactory $affiliationFactory,
        DateCollectionFactory $dateFactory,
        CurrentBrandCollectionFactory $currentBrandFactory,
        SportCollectionFactory $sportFactory,
        ColorCollectionFactory $colorFactory,
        DistanceCollectionFactory $distanceFactory
    ) {
        $this->storeManager = $storeManager;
        $this->affiliationFactory = $affiliationFactory;
        $this->dateFactory = $dateFactory;
        $this->currentBrandFactory = $currentBrandFactory;
        $this->sportFactory = $sportFactory;
        $this->colorFactory = $colorFactory;
        $this->distanceFactory = $distanceFactory;
    }

    /**
     * @return void
     */
    public function apply()
    {
        $store_id = $this->storeManager->getDefaultStoreView()->getId();

        $affiliations = [
            'Atalanta',
            'BFC',
            'Calcio Padova',
            'Cavalieri Union Rugby Prato',
            'Federazione Cricket Italia',
            'FIDAF',
            'FIR',
            'Fitetrec',
            'Genoa',
            'Hellas Verona',
            'Juventus',
            'Lazio',
            'Lega Nazionale Footgolf',
            'Livorno',
            'Lube Civitanova',
            'Milan',
            'Opes Italia',
            'Pordenone',
            'Reggiana Basket',
            'Reggiana Calcio',
            'Reggina',
            'Sampdoria',
            'Spal',
            'Sudtirol',
            'Ternana',
            'Torino',
            'Udinese',
            'UYBA',
            'Vicenza',
            'Zebre Rugby'
        ];
        $affiliationCollection = $this->affiliationFactory->create();
        foreach ($affiliations as $data) {
            $affiliationCollection->getNewEmptyItem()->setData(['affiliation' => $data, 'store_id' => $store_id])->save();
        }

        $dates = [
            '2019',
            '2020',
            '2021',
            '2022',
            '2023',
            '2024',
            '2025',
            '2026',
            '2027',
            '2028',
            '2029',
            '2030',
            '2031',
            '2032'
        ];
        $dateCollection = $this->dateFactory->create();
        foreach ($dates as $data) {
            $dateCollection->getNewEmptyItem()->setData(['date' => $data, 'store_id' => $store_id])->save();
        }

        $currentBrands = [
            '2T',
            'ACERBIS',
            'ACTION SCHOOL',
            'ADIDAS',
            'AGLA',
            'AKUMA',
            'AQUARAPID',
            'ARENA',
            'ARTENI',
            'ASICS',
            'ATHLETES',
            'BILCEE',
            'BITRE',
            'CAMAC',
            'CAMASPORT',
            'CANTERBURY',
            'CINQUESTELLE',
            'CMAX',
            'DANASPORT',
            'DECATHLON',
            'DIADORA',
            'DIMENSIONE DANZA',
            'DUNLOP',
            'ERREA',
            'ESSEGI',
            'EVOL',
            'EYE',
            'FOURTEEN',
            'FRANKIE GARAGE',
            'FROGGY LINE',
            'FRUIT',
            'GALEX',
            'GARMAN',
            'GEFF',
            'GEMS',
            'GIVOVA',
            'HEAD',
            'HS',
            'HUMMEL',
            'JAKO',
            'JOKER',
            'JOMA',
            'JUMP',
            'K-PRO',
            'KALENJI',
            'KAPPA',
            'KARHU',
            'KIPSTA',
            'LE COQ SPORTIF',
            'LEGEA',
            'LEONE',
            'LOTTO',
            'LUANVI',
            'MACRON',
            'MAKAY',
            'MAPS',
            'MASS',
            'MB',
            'MIKASA',
            'MIZUNO',
            'MONTURA',
            'NEW BALANCE',
            'NIKE',
            'NINE SQUARED',
            'NO BRAND',
            'ONZE',
            'OTHER BRAND',
            'PATRICK',
            'PAYPER',
            'PIEMME',
            'PRIMATO',
            'PROFILER',
            'PTS',
            'PUMA',
            'READY',
            'ROYAL',
            'RUNNEK',
            'SPALDING',
            'SPORTIKA',
            'TAKA',
            'TOP 87',
            'UMBRO',
            'ZEUS'
        ];
        $currentBrandCollection = $this->currentBrandFactory->create();
        foreach ($currentBrands as $data) {
            $currentBrandCollection->getNewEmptyItem()->setData(['current_brand' => $data, 'store_id' => $store_id])->save();
        }

        $sports = [
            'Aikido',
            'American Football',
            'Badminton',
            'Baseball',
            'Basket',
            'Boat Racing',
            'Bowls',
            'Boxe',
            'Climbing',
            'Company',
            'Cricket',
            'Cycling',
            'Dance',
            'Fencing',
            'Fishing',
            'Flying Disc',
            'Football',
            'FootGolf',
            'Futsal',
            'Golf',
            'Gym',
            'Gymnastic',
            'Handball',
            'Hockey',
            'Horse Riding',
            'Judo',
            'Ju-Jitsu',
            'Karate',
            'Kart',
            'Kung fu',
            'Other Sport',
            'Padel / Tennis',
            'Ping Pong',
            'Rugby',
            'Running',
            'School / University',
            'Skating',
            'Ski',
            'Swimming',
            'Taekwondo',
            'Triathlon',
            'Volley',
            'Water polo'
        ];
        $sportCollection = $this->sportFactory->create();
        foreach ($sports as $data) {
            $sportCollection->getNewEmptyItem()->setData(['sport' => $data, 'store_id' => $store_id])->save();
        }

        $colors = [
            'Altro',
            'Antracite',
            'Arancio',
            'Argento',
            'AzzurroBianco',
            'Blu Royal',
            'Celeste',
            'Fucsia',
            'Giallo',
            'Giallo Fluo',
            'Granata',
            'Granata Scuro',
            'Grigio',
            'Lilla',
            'Navy',
            'Nero',
            'Oro',
            'Rosa',
            'Rosa Fluo',
            'Rosso',
            'Turchese',
            'Verde',
            'Verde Fluo',
            'Viola'
        ];
        $colorCollection = $this->colorFactory->create();
        foreach ($colors as $data) {
            $colorCollection->getNewEmptyItem()->setData(['color' => $data, 'store_id' => $store_id])->save();
        }

        $distances = ['VICINO', 'LONTANO'];
        $distanceCollection = $this->distanceFactory->create();
        foreach ($distances as $data) {
            $distanceCollection->getNewEmptyItem()->setData(['distance' => $data, 'store_id' => $store_id])->save();
        }
    }

    /**
     * {@inheritDoc}
     */
    public static function getDependencies()
    {
        return [];
    }

    /**
     * {@inheritDoc}
     */
    public function getAliases()
    {
        return [];
    }

}
