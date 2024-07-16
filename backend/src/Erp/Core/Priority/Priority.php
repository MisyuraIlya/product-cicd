<?php

namespace App\Erp\Core\Priority;

use App\Entity\History;
use App\Entity\HistoryDetailed;
use App\Entity\User;
use App\Enum\DocumentsType;
use App\Erp\Core\Dto\CartessetDto;
use App\Erp\Core\Dto\CartessetLineDto;
use App\Erp\Core\Dto\CategoriesDto;
use App\Erp\Core\Dto\CategoryDto;
use App\Erp\Core\Dto\DocumentItemsDto;
use App\Erp\Core\Dto\DocumentsDto;
use App\Erp\Core\Dto\HovotDto;
use App\Erp\Core\Dto\HovotLineDto;
use App\Erp\Core\Dto\MigvanDto;
use App\Erp\Core\Dto\MigvansDto;
use App\Erp\Core\Dto\PackMainDto;
use App\Erp\Core\Dto\PackProductDto;
use App\Erp\Core\Dto\PacksMainDto;
use App\Erp\Core\Dto\PacksProductDto;
use App\Erp\Core\Dto\PriceListDetailedDto;
use App\Erp\Core\Dto\PriceListDto;
use App\Erp\Core\Dto\PriceListsDetailedDto;
use App\Erp\Core\Dto\PriceListsDto;
use App\Erp\Core\Dto\PriceListsUserDto;
use App\Erp\Core\Dto\PriceListUserDto;
use App\Erp\Core\Dto\PricesDto;
use App\Erp\Core\Dto\ProductDto;
use App\Erp\Core\Dto\ProductsDto;
use App\Erp\Core\Dto\PurchaseHistory;
use App\Erp\Core\Dto\PurchaseHistoryItem;
use App\Erp\Core\Dto\StockDto;
use App\Erp\Core\Dto\StocksDto;
use App\Erp\Core\Dto\UserDto;
use App\Erp\Core\Dto\UsersDto;
use App\Erp\Core\ErpInterface;
use App\Erp\Custom\MediMarketPrices;
use App\Erp\Custom\MrKelimPrices;
use App\Erp\Dto\AttributeMainDto;
use App\Erp\Dto\AttributeSubDto;
use App\Repository\HistoryDetailedRepository;
use App\Repository\HistoryRepository;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class Priority implements ErpInterface
{
    private string $username;
    private string $password;
    private string $url;

    public function __construct(string $url, string $username, string $password, HttpClientInterface $httpClient)
    {
        $this->username = $username;
        $this->password = $password;
        $this->url = $url;
        $this->httpClient = $httpClient;
        $erpType =  $_ENV['ERP_TYPE'];
        $this->CategoryTable = $_ENV['CATEGORY_STATE'] ;
        $this->ErpCategoryLvl1 = $_ENV['CATEGORY_LVL_1'] ;
        $this->ErpCategoryLvl2 = $_ENV['CATEGORY_LVL_2'] ;
        $this->ErpCategoryLvl3 = $_ENV['CATEGORY_LVL_3'] ;
    }
    public function GetRequest($query)
    {
        $response = $this->httpClient->request(
            'GET',
            $this->url.$query,
            [
                'auth_basic' => [$this->username, $this->password],
                'http_version' => '1.1',
                'timeout' => 600
            ]
        );
        $statusCode = $response->getStatusCode();
        $contentType = $response->getHeaders()['content-type'][0];
        $content = $response->getContent();
        $content = $response->toArray();
        return $content['value'];
    }
    public function PostRequest(\stdClass $obj, string $table)
    {
        $response = $this->httpClient->request(
            'POST',
            $this->url.$table,
            [
                'auth_basic' => [$this->username, $this->password],
                'timeout' => 60,
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'body' => json_encode($obj)
            ]
        );

        $statusCode = $response->getStatusCode();
        $contentType = $response->getHeaders()['content-type'][0];
        $content = $response->getContent();
        $content = $response->toArray();
        return $content;
    }
    public function PatchRequest(object $obj, string $table)
    {
        $response = $this->httpClient->request(
            'PATCH',
            $this->url . $table,
            [
                'auth_basic' => [$this->username, $this->password],
                'timeout' => 60,

                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'body' => json_encode($obj),
            ]
        );
        $statusCode = $response->getStatusCode();
        $contentType = $response->getHeaders()['content-type'][0];
        $content = $response->getContent();
        $content = $response->toArray();
        return $content;
    }
    public function GetDocuments(?User $user,\DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo, DocumentsType $documentsType): DocumentsDto
    {
        $order = [];
        $offers = [];
        $documents = [];
        $aiInvoice = [];
        $ciInvoice = [];
        $returnDocs = [];
        if($documentsType == DocumentsType::ORDERS){
            $order = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetOrders($user,$dateFrom, $dateTo);
        } else if ($documentsType == DocumentsType::PRICE_OFFER) {
            $offers = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetPriceOffer($user,$dateFrom, $dateTo);
        } else if($documentsType == DocumentsType::DELIVERY_ORDER) {
            $documents = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetDeliveryOrder($user,$dateFrom, $dateTo);
        } else if($documentsType == DocumentsType::AI_INVOICE) {
            $aiInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetAiInvoice($user,$dateFrom, $dateTo);
        } else if($documentsType == DocumentsType::CI_INVOICE) {
            $ciInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetCiInvoice($user,$dateFrom, $dateTo);
        } else if($documentsType == DocumentsType::RETURN_ORDERS) {
            $returnDocs = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetReturnDocs($user,$dateFrom, $dateTo);
        } else if($documentsType == DocumentsType::ALL) {
            $order = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetOrders($user,$dateFrom, $dateTo);
            $offers = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetPriceOffer($user,$dateFrom, $dateTo);
            $documents = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetDeliveryOrder($user,$dateFrom, $dateTo);
            $aiInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetAiInvoice($user,$dateFrom, $dateTo);
            $ciInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetCiInvoice($user,$dateFrom, $dateTo);
            $returnDocs = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetReturnDocs($user,$dateFrom, $dateTo);
        }
        $mergedArray = array_merge($order, $offers, $documents, $aiInvoice, $ciInvoice, $returnDocs);
        $obj = new DocumentsDto();
        $obj->documents = $mergedArray;
        return $obj;
    }
    public function GetDocumentsItem(string $documentNumber, DocumentsType $documentType): DocumentItemsDto
    {
        if($documentType == DocumentsType::ORDERS) {
            $orders = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetOrderItems($documentNumber);
            return $orders;
        }

        if($documentType == DocumentsType::PRICE_OFFER) {
            $offers = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetPriceOfferItem($documentNumber);
            return $offers;
        }

        if($documentType == DocumentsType::DELIVERY_ORDER) {
            $documentOrder = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetDeliveryOrderItem($documentNumber);
            return $documentOrder;
        }

        if($documentType == DocumentsType::AI_INVOICE) {
            $aiInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetAiInvoiceItem($documentNumber);
            return $aiInvoice;
        }

        if($documentType == DocumentsType::CI_INVOICE) {
            $ciInvoice = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetCiInvoiceItem($documentNumber);
            return $ciInvoice;
        }

        if($documentType == DocumentsType::RETURN_ORDERS) {
            $returnDocItem = (new PriorityDocuments($this->url, $this->username, $this->password, $this->httpClient))->GetReturnDocsItem($documentNumber);
            return $returnDocItem;
        }

        return new DocumentItemsDto();
    }
    public function GetCartesset(string $userExId, \DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo): CartessetDto
    {
        $endpoint = "/ACCOUNTS_RECEIVABLE";
        $dateFrom = $dateFrom->format('Y-m-d\TH:i:s.u\Z');
        $dateTo = $dateTo->format('Y-m-d\TH:i:s.u\Z');
        $queryParameters = [
            '$filter' => "ACCNAME eq '$userExId'",
            '$expand' => 'ACCFNCITEMS2_SUBFORM($filter=BALDATE ge ' . $dateFrom . ' and BALDATE le ' . $dateTo . ')'
        ];
        $queryString = http_build_query($queryParameters);
        $urlQuery = $endpoint . '?' . $queryString;
        $response = $this->GetRequest($urlQuery);

        $result = new CartessetDto();
        foreach ($response as $itemRec) {
            foreach ($itemRec['ACCFNCITEMS2_SUBFORM'] as $subRec){
                $obj = new CartessetLineDto();
                $obj->createdAt = $subRec['CURDATE'];
                $obj->tnua = $subRec['FNCTRANS'];
                $obj->asmahta1 = $subRec['FNCIREF1'];
                $obj->dateEreh = $subRec['BALDATE'];
                $obj->description = $subRec['DETAILS'];
                $obj->hova = $subRec['DEBIT'];
                $obj->zhut = $subRec['CREDIT'];
                $obj->yetra = $subRec['BAL'];
                $result->lines[] = $obj;
            }
        }

        return $result;

    }
    public function GetHovot(string $userExId, \DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo): HovotDto
    {
        $endpoint = "/ACCOUNTS_RECEIVABLE";
        $dateFrom = $dateFrom->format('Y-m-d\TH:i:s.u\Z');
        $dateTo = $dateTo->format('Y-m-d\TH:i:s.u\Z');
        $queryParameters = [
            '$filter' => "ACCNAME eq '$userExId'",
            '$expand' => 'ARFNCITEMS3_SUBFORM($filter=BALDATE ge ' . $dateFrom . ' and BALDATE le ' . $dateTo . ')'
        ];
        $queryString = http_build_query($queryParameters);
        $urlQuery = $endpoint . '?' . $queryString;
        $response = $this->GetRequest($urlQuery);
        $result = new HovotDto();
        foreach ($response as $itemRec) {
            $sum = 0;
            foreach ($itemRec['ARFNCITEMS3_SUBFORM'] as $subRec){
                $obj = new HovotLineDto();
                $obj->createdAt = $subRec['CURDATE'];
                $obj->documentNumber = $subRec['IVNUM'] ;
                $obj->debit = $subRec['DEBIT1'] ;
                $sum += $subRec['DEBIT1'];
                $obj->lineSum = $sum ;
                $obj->payDate = $subRec['FNCDATE'] ;
                $result->lines[] = $obj;
            }
            $result->total = $sum;
        }
        return $result;
    }
    public function PurchaseHistoryByUserAndSku(string $userExtId, string $sku): PurchaseHistory
    {
        $endpoint = "/ORDERS";
        $queryParameters = [
            '$filter' => "CUSTNAME eq '$userExtId'",
            '$select' => "ORDNAME,CURDATE",
            '$expand' => 'ORDERITEMS_SUBFORM($select=PARTNAME,TQUANT,PRICE,VPRICE,PERCENT,QPRICE,VATPRICE;$filter=PARTNAME eq ' . "'" . $sku . "'".')',
            '$top' => '200'
        ];
        $queryString = http_build_query($queryParameters);
        $urlQuery = $endpoint . '?' . $queryString;
        $response = $this->GetRequest($urlQuery);
        $result = new PurchaseHistory();
        foreach ($response as $itemRec) {
            foreach ($itemRec['ORDERITEMS_SUBFORM'] as $subRec){
                $obj = new PurchaseHistoryItem();
                $obj->documentNumber = $itemRec['ORDNAME'];
                $obj->date = $itemRec['CURDATE'];
                $obj->quantity = $subRec['TQUANT'];
                $obj->price = $subRec['PRICE'];
                $obj->vatPrice = $subRec['VPRICE'];
                $obj->discount = $subRec['PERCENT'];
                $obj->totalPrice = $subRec['QPRICE'];
                $obj->vatTotal = $subRec['VATPRICE'];
                $result->items[] = $obj;
            }
        }
        return $result;
    }
    public function SendOrder(History $history): string
    {

        if($history->getDocumentType() === DocumentsType::ORDERS) {
            $response = $this->SendOrderTemplate($history);
        } elseif ($history->getDocumentType() === DocumentsType::PRICE_OFFER) {
            $response = $this->SendQuoteTemplate($history);
        } elseif ($history->getDocumentType() === DocumentsType::RETURN_ORDERS) {
            $response = $this->SendReturnTemplate($history);
        } else {
            throw new \Exception('לא נמצא מסמך כזה');
        }

        return $response;
    }
    private function SendOrderTemplate(History $history)
    {
        $obj = new \stdClass();
        $obj->CUSTNAME = $history->getUser()->getExtId();
        $obj->DUEDATE = $history->getCreatedAt()->format('Y-m-d\TH:i:sP');
        $lines = new \stdClass();
        $lines->lines = [];
        foreach ($history->getHistoryDetaileds() as $itemRec){
            assert($itemRec instanceof HistoryDetailed);
            $objLine = new \stdClass();
            $objLine->PARTNAME = $itemRec->getProduct()->getSku();
            $objLine->TQUANT = $itemRec->getQuantity();
            $objLine->PRICE = $itemRec->getSinglePrice();
            $lines->lines[] = $objLine;
        }

        $obj->ORDERITEMS_SUBFORM = $lines->lines;

        $response = $this->PostRequest($obj, '/ORDERS');
        if(isset($response['ORDNAME'])) {
            return $response['ORDNAME'];
        } else {
            throw new \Exception('הזמנה לא שודרה');
        }
    }
    private function SendQuoteTemplate(History $history)
    {
        $obj = new \stdClass();
        $obj->CUSTNAME = $history->getUser()->getExtId();
        $obj->PDATE = $history->getCreatedAt()->format('Y-m-d\TH:i:sP');
        $lines = new \stdClass();
        $lines->lines = [];
        foreach ($history->getHistoryDetaileds() as $itemRec){
            assert($itemRec instanceof HistoryDetailed);
            $objLine = new \stdClass();
            $objLine->PARTNAME = $itemRec->getProduct()->getSku();
            $objLine->TQUANT = $itemRec->getQuantity();
            $objLine->PRICE = $itemRec->getSinglePrice();
            $lines->lines[] = $objLine;
        }

        $obj->CPROFITEMS_SUBFORM = $lines->lines;

        $response = $this->PostRequest($obj, '/' . 'CPROF');
        if(isset($response['CPROFNUM'])) {
            return $response['CPROFNUM'];
        } else {
            throw new \Exception('הזמנה לא שודרה');
        }
    }
    private function SendReturnTemplate(History $history)
    {
        $obj = new \stdClass();
        $obj->CUSTNAME = $history->getUser()->getExtId();
        $lines = new \stdClass();
        $lines->lines = [];
        foreach ($history->getHistoryDetaileds() as $itemRec){
            $objLine = new \stdClass();
            $objLine->PARTNAME = $itemRec->getProduct()->getSku();
            $objLine->TQUANT = $itemRec->getQuantity();
            $objLine->PRICE = $itemRec->getTotal();
            $lines->lines[] = $objLine;
        }

        $obj->TRANSORDER_N_SUBFORM = $lines->lines;

        $response = $this->PostRequest($obj, '/DOCUMENTS_N');
        if(isset($response['DOCNO'])) {
            return $response['DOCNO'];
        } else {
            throw new \Exception('הזמנה לא שודרה');
        }
    }

    /** FOR CRON */
    public function GetProducts(?int $pageSize, ?int $skip): ProductsDto
    {
        $endpoint = "/LOGPART";
        if($pageSize) {
            $queryExtras = [
                '$select' => "MINPRICE,PARTNAME,PARTDES,BARCODE,CONV,FAMILYNAME,FAMILYDES,SPEC9,SPEC10,STATDES,BASEPLPRICE,SPEC2,SPEC3,SPEC4,SPEC5,SPEC6,SPEC7,SPEC8",
                '$top' => $pageSize,
                '$skip' => $skip,
            ];
        } else {
            $queryExtras = [
                '$select' => "MINPRICE,PARTNAME,PARTDES,BARCODE,CONV,FAMILYNAME,FAMILYDES,SPEC9,SPEC10,STATDES,BASEPLPRICE,SPEC2,SPEC3,SPEC4,SPEC5,SPEC6,SPEC7,SPEC8",
            ];
        }

        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;

        $dtoRes = new ProductsDto();
        $response = $this->GetRequest($urlQuery);
        foreach ($response as $itemRec){
            $dto = new ProductDto();
            $dto->sku = $itemRec['PARTNAME'];
            $dto->title = $itemRec['PARTDES'];
            $dto->barcode = $itemRec['BARCODE'];
            $dto->packQuantity = $itemRec['CONV'];
            $dto->categoryLvl1Id = $itemRec[$this->ErpCategoryLvl1];
            $dto->categoryLvl1Name = $itemRec[$this->ErpCategoryLvl1 == 'FAMILYNAME' ? 'FAMILYDES' : $this->ErpCategoryLvl1];
            $dto->categoryLvl2Id = $itemRec[$this->ErpCategoryLvl2];
            $dto->categoryLvl2Name = $itemRec[$this->ErpCategoryLvl2];
            $dto->categoryLvl3Id = $itemRec[$this->ErpCategoryLvl3];
            $dto->categoryLvl3Name = $itemRec[$this->ErpCategoryLvl3];
            $dto->status = $itemRec['STATDES'] === 'פעיל' ? true : false;
            $dto->baseprice = $itemRec['BASEPLPRICE'];
            $dto->minimumPrice = $itemRec['MINPRICE'];
            $dto->Extra2 = $itemRec['SPEC2'];
            $dto->Extra3 = $itemRec['SPEC3'];
            $dto->Extra4 = $itemRec['SPEC4'];
            $dto->Extra5 = $itemRec['SPEC5'];
            $dto->Extra6 = $itemRec['SPEC6'];
            $dto->Extra7 = $itemRec['SPEC7'];
            $dto->Extra8 = $itemRec['SPEC8'];
            $dtoRes->products[] = $dto;
        }
        return $dtoRes;
    }
    public function GetSubProducts(): ProductsDto
    {
        $endpoint = "/LOGPART";
        $queryExtras = [
            '$expand' => "PARTARC_SUBFORM"
        ];
        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;

        $dtoRes = new ProductsDto();
        $response = $this->GetRequest($urlQuery);
        foreach ($response as $itemRec){

            foreach ($itemRec['PARTARC_SUBFORM'] as $subRec){
                $dto = new ProductDto();
                $dto->sku = $subRec['SONNAME'];
                $dto->title = $subRec['SONDES'];
                $dto->parent = $itemRec['PARTNAME'];
                $dtoRes->products[] = $dto;
            }
        }
        return $dtoRes;
    }
    public function GetUsers(): UsersDto
    {
//        $response = $this->GetRequest('/CUSTOMERS?$expand=CUSTDISCOUNT_SUBFORM');
        $response = $this->GetRequest('/CUSTOMERS?$expand=CUSTPERSONNEL_SUBFORM');
        $usersDto = new UsersDto();

        foreach ($response as $userRec) {
            $userDto = new UserDto();
            $userDto->userExId = $userRec['CUSTNAME'];
            $userDto->userDescription = $userRec['CUSTDES'];
            $userDto->name = $userRec['CUSTDES'];
            $userDto->isBlocked = $userRec['INACTIVEFLAG'] === 'Y' ? true : false;
            $userDto->phone = $userRec['PHONE'];
            $userDto->hp = $userRec['WTAXNUM'];
            $userDto->payCode = $userRec['PAYCODE'];
            $userDto->payDes = $userRec['PAYDES'];
            $userDto->maxCredit = $userRec['MAX_CREDIT'];
            $userDto->maxObligo = $userRec['MAX_OBLIGO'];
            $userDto->taxCode = $userRec['TAXCODE'];
            $userDto->subUsers = [];

            foreach ($userRec['CUSTPERSONNEL_SUBFORM'] as $subRec) {
                $subUsers = new UserDto();
                $subUsers->userExId = $userRec['CUSTNAME'];
                $subUsers->userDescription = $userRec['CUSTDES'];
                $subUsers->name = $subRec['NAME'];
                $subUsers->isBlocked = $userRec['INACTIVEFLAG'] === 'Y' ? true : false;
                $subUsers->phone = $subRec['CELLPHONE'];
                $subUsers->hp = $userRec['WTAXNUM'];
                $subUsers->payCode = $userRec['PAYCODE'];
                $subUsers->payDes = $userRec['PAYDES'];
                $subUsers->maxCredit = $userRec['MAX_CREDIT'];
                $subUsers->maxObligo = $userRec['MAX_OBLIGO'];
                $subUsers->taxCode = $userRec['TAXCODE'];
                $userDto->subUsers[] = $subUsers;

            }
            $usersDto->users[] = $userDto;
        }

        return $usersDto;

    }
    public function GetUsersInfo(): UsersDto
    {
        $response = $this->GetRequest('/CUSTOMERS');
        $usersDto = new UsersDto();

        foreach ($response as $userRec) {
            if ($userRec['INACTIVEFLAG'] === null) {
                $userDto = new UserDto();
                $userDto->userExId = $userRec['CUSTNAME'];
                $userDto->userDescription = $userRec['CUSTDES'];
                $userDto->isBlocked = $userRec['INACTIVEFLAG'] === 'Y' ? true : false;
                $userDto->phone = $userRec['PHONE'];
                $userDto->hp = $userRec['WTAXNUM'];
                $userDto->payCode = $userRec['PAYCODE'];
                $userDto->payDes = $userRec['PAYDES'];
                $userDto->maxCredit = $userRec['MAX_CREDIT'];
                $userDto->maxObligo = $userRec['MAX_OBLIGO'];
                $userDto->taxCode = $userRec['TAXCODE'];
                $usersDto->users[] = $userDto;
            }
        }

        return $usersDto;
    }
    public function GetSubUsers(): UsersDto
    {
        $response = $this->GetRequest('/CUSTOMERS?$expand=CUSTPERSONNEL_SUBFORM,CUSTDISCOUNT_SUBFORM,CUSTPLIST_SUBFORM');
        $usersDto = new UsersDto();

        foreach ($response as $userRec) {
            if ($userRec['INACTIVEFLAG'] === null) {
                $globalDiscount = null;
                $priceList = null;
                foreach ($userRec['CUSTDISCOUNT_SUBFORM'] as $discountRec){
                    $expiryDate = new \DateTime($discountRec['EXPIRYDATE']);
                    $currentDate = new \DateTime();
                    if($expiryDate > $currentDate){
                        $globalDiscount = $discountRec['DISCOUNT'];
                    }
                }

                foreach ($userRec['CUSTPLIST_SUBFORM'] as $priceRec) {
                    $expiryDate = new \DateTime($priceRec['PLDATE']);
                    $currentDate = new \DateTime();
                    if($expiryDate > $currentDate){
                        $priceList = $priceRec['PLNAME'];
                    }
                }

                foreach ($userRec['CUSTPERSONNEL_SUBFORM'] as $subUsersRec) {
                    $userDto = new UserDto();
                    $userDto->userExId = $userRec['CUSTNAME'];
                    $userDto->userDescription = $userRec['CUSTDES'];
                    $userDto->name = $subUsersRec['NAME'];
                    $userDto->telephone = $subUsersRec['PHONENUM'];
                    $userDto->maxObligo = $userRec['MAX_OBLIGO'];
                    $userDto->maxCredit = $userRec['MAX_CREDIT'];
                    $userDto->phone = $subUsersRec['CELLPHONE'];
                    $userDto->address = $userRec['ADDRESS'];
                    $userDto->town = $userRec['STATE'];
                    $userDto->isBlocked = $userRec['INACTIVEFLAG'] === 'Y' ? false : true;
                    $userDto->globalDiscount = $globalDiscount;
                    $userDto->priceList = $priceList;
                    $usersDto->users[] = $userDto;

                }
            }
        }

        return $usersDto;
    }
    public function GetMigvan(): MigvansDto
    {
        $endpoint = "/CUSTOMERS";
        $queryParameters = [
            '$select' => 'CUSTNAME',
            '$expand' => 'CUSTPART_SUBFORM($select=PARTNAME)',
        ];
        $queryString = http_build_query($queryParameters);
        $urlQuery = $endpoint . '?' . $queryString;

        $result = new MigvansDto();
        $response = $this->GetRequest($urlQuery);
        foreach ($response as $itemRec) {
            foreach ($itemRec['CUSTPART_SUBFORM'] as $subItem) {
                $obj = new MigvanDto();
                $obj->sku = $subItem['PARTNAME'];
                $obj->userExId = $itemRec['CUSTNAME'];
                $result->migvans[] = $obj;
            }
        }

        return $result;
    }
    public function GetPriceList(): PriceListsDto
    {
        $endpoint = "/PRICELIST";

        $response = $this->GetRequest($endpoint);

        $dto = new PriceListsDto();
        foreach ($response as $itemRec){
            $obj = new PriceListDto();

            $obj->priceListExtId = $itemRec['PLNAME'];
            $obj->priceListTitle = $itemRec['PLDES'] ;
            $obj->priceListExperationDate = $itemRec['PLDATE'];
            $dto->priceLists[] = $obj;
        }

        return $dto;

    }
    public function GetPriceListUser(): PriceListsUserDto
    {
        $endpoint = "/CUSTOMERS";
        $queryExtras = [
            '$expand' => "CUSTPLIST_SUBFORM"
        ];
        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;
        $response = $this->GetRequest($urlQuery);
        $dto = new PriceListsUserDto();

        foreach ($response as $itemRec) {
            foreach ($itemRec['CUSTPLIST_SUBFORM'] as $subRec) {
                if ($itemRec['CUSTNAME']) {
                    $userDto = new PriceListUserDto();
                    $userDto->userExId = $itemRec['CUSTNAME'];
                    $userDto->priceListExId = $subRec['PLNAME'];
                    $dto->priceLists[] = $userDto;
                }
            }
        }

        return $dto;
    }
    public function GetPrices():PricesDto
    {

    }
    public function GetMigvansOnline(?array $skus): MigvansDto
    {
        // TODO: Implement GetMigvansOnline() method.
    }
    public function GetStocks(): StocksDto
    {

        $endpoint = "/LOGPART";
        $queryExtras = [
            '$expand' => "LOGCOUNTERS_SUBFORM"
        ];
        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;

        $response = $this->GetRequest($urlQuery);
        $result = new StocksDto();
        foreach ($response as $itemRec) {
            foreach ($itemRec['LOGCOUNTERS_SUBFORM'] as $subRec) {
                $obj = new StockDto();
                $obj->sku = $itemRec['PARTNAME'];
                $obj->stock = $subRec['BALANCE'];
                $result->stocks[] = $obj;
            }
        }
        return $result;
    }
    public function GetCategories(): CategoriesDto
    {
        $data = $this->GetRequest('/FAMILYTYPES');
        $categoryResult = new CategoriesDto();

        foreach ($data as $itemRec){
            if($itemRec['FTNAME']){
                $obj = new CategoryDto();
                $obj->categoryId = $itemRec['FTCODE'];
                $obj->categoryName = $itemRec['FTNAME'];
                $categoryResult->categories[] = $obj;
            }
        }

        return  $categoryResult;
    }
    public function GetPriceListDetailed(): PriceListsDetailedDto
    {

        $urlQuery = '/PRICELIST?$expand=PARTPRICE2_SUBFORM($select=PARTNAME,PRICE,PERCENT)';
        $response = $this->GetRequest($urlQuery);
        $dto = new PriceListsDetailedDto();
        foreach ($response as $itemRec){
            foreach ($itemRec['PARTPRICE2_SUBFORM'] as $subRec){
                $obj = new PriceListDetailedDto();
                $obj->sku = $subRec['PARTNAME'];
                $obj->price = $subRec['PRICE'] ;
                $obj->priceList = $itemRec['PLNAME'];
                $obj->discount = $subRec['PERCENT'] ;
                $dto->priceListsDetailed[] = $obj;
            }
        }

        return $dto;
    }
    private function ImplodeQueryByMakats(array $makats)
    {
        $filterParts = [];
        foreach ($makats as $sku) {
            $filterParts[] = "PARTNAME eq '$sku'";
        }

        $filterString = implode(' or ', $filterParts);
        return $filterString;
    }
    private function ImplodeQueryByPlname(array $priceList)
    {
        $filterParts = [];
        foreach ($priceList as $pricePlname) {
            $filterParts[] = "PLNAME eq '$pricePlname'";
        }

        $filterString = implode(' or ', $filterParts);
        return $filterString;
    }
    public function GetPackMain(): PacksMainDto
    {
        $endpoint = "/PARTPARAM";
        $queryExtras = [
            '$expand' => "PARTPACK_SUBFORM"
        ];
        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;

        $response = $this->GetRequest($urlQuery);
        $result = new PacksMainDto();
        foreach ($response as $itemRec) {
            foreach ($itemRec['PARTPACK_SUBFORM'] as $subRec) {
                $obj = new PackMainDto();
                $obj->name = $subRec['PACKNAME'];
                $obj->extId = $subRec['PACKCODE'];
                $obj->barcode = $subRec['BARCODE'];
                $obj->quantity = $subRec['PACKQUANT'];
                $result->packs[] = $obj;
            }
        }
        return $result;
    }
    public function GetPackProducts(): PacksProductDto
    {
        $endpoint = "/PARTPARAM";
        $queryExtras = [
            '$expand' => "PARTPACK_SUBFORM"
        ];
        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;

        $response = $this->GetRequest($urlQuery);
        $result = new PacksProductDto();
        foreach ($response as $itemRec) {
            foreach ($itemRec['PARTPACK_SUBFORM'] as $subRec) {
                $obj = new PackProductDto();
                $obj->sku = $itemRec['PARTNAME'];
                $obj->packExtId = $subRec['PACKCODE'];
                $obj->quantity = $subRec['PACKQUANT'];
                $result->packs[] = $obj;
            }
        }
        return $result;
    }

    public function GetProductImage(string $sku)
    {
        $endpoint = "/LOGPART";
        $queryExtras = [
            '$select' => "PARTNAME,EXTFILENAME",
            '$filter' => "PARTNAME eq '$sku'"
        ];

        $queryString = http_build_query($queryExtras);
        $urlQuery = $endpoint . '?' . $queryString;
        $response = $this->GetRequest($urlQuery);
        try {
            if(!empty($response) && isset($response[0]) && isset($response[0]['EXTFILENAME'])){
                $object = new \stdClass();
                $object->sku = $response[0]['PARTNAME'];
                $object->image = $response[0]['EXTFILENAME'];
                return $object;
            } else {
                $object = new \stdClass();
                $object->sku = '';
                $object->image = '';
                return $object;
            }
        } catch (\Exception $e) {
            $object = new \stdClass();
            $object->sku = '';
            $object->image = '';
            return $object;
        }


    }

}