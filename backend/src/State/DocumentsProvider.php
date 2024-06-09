<?php

namespace App\State;

use ApiPlatform\Metadata\CollectionOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\Pagination;
use ApiPlatform\State\Pagination\TraversablePaginator;
use ApiPlatform\State\ProviderInterface;
use App\Entity\History;
use App\Enum\DocumentsType;
use App\Erp\Core\Dto\DocumentDto;
use App\Erp\Core\Dto\DocumentItemDto;
use App\Erp\Core\Dto\DocumentItemsDto;
use App\Erp\Core\Dto\DocumentsDto;
use App\Erp\Core\ErpManager;
use App\Repository\HistoryRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\RequestStack;

class DocumentsProvider implements ProviderInterface
{
    private $userPriceLists = [];
    public function __construct(
        private readonly RequestStack $requestStack,
        private Pagination $pagination,
        private readonly ProductRepository $productRepository,
        private readonly UserRepository $userRepository,
        private readonly ErpManager $erpManager,
        private readonly HistoryRepository $historyRepository,
    )
    {

        $docType = $this->requestStack->getCurrentRequest()->attributes->get('documentType');
        $this->documentType = $this->GetType($docType);
        $this->fromDate= $this->requestStack->getCurrentRequest()->attributes->get('dateFrom');
        $this->toDate = $this->requestStack->getCurrentRequest()->attributes->get('dateTo');
        $this->userId = $this->requestStack->getCurrentRequest()->query->get('userId');
        $this->userDb = $this->userRepository->findOneById($this->userId);
        $this->limit = $this->requestStack->getCurrentRequest()->query->get('limit') ?? 10;
        $this->documentNumber= $this->requestStack->getCurrentRequest()->attributes->get('documentNumber');
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            $currentPage = $this->pagination->getPage($context);
            $result = $this->CollectionHandler($operation,$uriVariables,$context);
            $start = ($currentPage - 1) * $this->limit;
            if($result['slice']){
                $result['result'] = array_slice($result['result'], $start, $this->limit);
            }
            return new TraversablePaginator(
                new \ArrayIterator($result['result']),
                $currentPage,
                $this->limit,
                $result['totalCount'],
            );
        }
        return $this->GetHandler($operation,$uriVariables,$context);
    }

    private function CollectionHandler($operation,$uriVariables,$context)
    {
        $format = "Y-m-d";
        $dateFrom = \DateTimeImmutable::createFromFormat($format, $this->fromDate);
        $dateTo = \DateTimeImmutable::createFromFormat($format, $this->toDate);
        $page = $this->pagination->getPage($context);

        if($this->documentType == DocumentsType::ALL) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::ALL)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::ORDERS) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::ORDERS)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::PRICE_OFFER) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::PRICE_OFFER)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::DELIVERY_ORDER) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::DELIVERY_ORDER)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::AI_INVOICE) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::AI_INVOICE)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::CI_INVOICE) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::CI_INVOICE)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::RETURN_ORDERS) {
            $response = $this->erpManager->GetDocuments($this->userDb , $dateFrom, $dateTo, DocumentsType::RETURN_ORDERS)->documents;
            return [
                "result" => $response,
                "totalCount" => count($response),
                'slice' => true
            ];
        } elseif($this->documentType == DocumentsType::HISTORY) {
            $history = $this->historyRepository->historyHandler($dateFrom,$dateTo,$this->userId,$page, $this->limit);
            return [
                "result" => $this->ConvertHistoryToDocumentsDto($history['result'])->documents,
                "totalCount" => $history['totalCount'],
                'slice' => false
            ];
        } elseif($this->documentType == DocumentsType::DRAFT) {
            $history = $this->historyRepository->historyHandler($dateFrom,$dateTo,$this->userId,$page,  $this->limit ,DocumentsType::DRAFT);
            return [
                "result" => $this->ConvertHistoryToDocumentsDto($history['result'])->documents,
                "totalCount" => $history['totalCount'],
                'slice' => false
            ];
        } elseif($this->documentType == DocumentsType::APPROVE) {
            $history = $this->historyRepository->historyHandler($dateFrom,$dateTo,null,$page,  $this->limit ,DocumentsType::APPROVE);
            return [
                "result" => $this->ConvertHistoryToDocumentsDto($history['result'])->documents,
                "totalCount" => $history['totalCount'],
                'slice' => false
            ];
        }
    }

    private function GetHandler($operation,$uriVariables,$context)
    {
        if($this->documentType == DocumentsType::HISTORY || $this->documentType == DocumentsType::DRAFT || $this->documentType == DocumentsType::APPROVE) {
            $response = $this->historyRepository->historyItemHandler($this->documentNumber);
            $response = $this->ConvertHistoryItemToDocumentItemsDto($response);
        } else {
            $response = $this->erpManager->GetDocumentsItem($this->documentNumber,$this->documentType);
        }
        $makats = [];
        foreach ($response->products as &$itemRec){
            $findProd = $this->productRepository->findOneBySkuAndToArray($itemRec->sku);
            $findProdPacacakge = $this->productRepository->findOneBySku($itemRec->sku);

            if(!empty($findProd) && $findProd[0]){
                $makats[] = $findProd[0]['sku'];
                $itemRec->product = $findProd[0];
            }
        }
        return $response;
    }

    private function ConvertHistoryToDocumentsDto(array $histoires): DocumentsDto
    {
        $result = new DocumentsDto();
        $result->documents = [];
        foreach ($histoires as $histoire) {
            assert($histoire instanceof History);
            $obj = new DocumentDto();
            $obj->id = $histoire->getId();
            $obj->documentNumber = $histoire->getOrderExtId() ?? $histoire->getId();
            $obj->documentType = $histoire->getDocumentType();
            $obj->userName = $histoire->getUser() ? $histoire->getUser()->getName() : '';
            $obj->userExId = $histoire->getUser() ? $histoire->getUser()->getExtId() : '';
            if(!empty( $histoire->getAgent())){
                $obj->agentExId = $histoire->getAgent()->getExtId() ?? '';
                $obj->agentName = $histoire->getAgent()->getName() ?? '';
            } else {
                $obj->agentExId = null;
                $obj->agentName = null;
            }
            $obj->status = $histoire->getOrderStatus();
            $obj->createdAt = $histoire->getCreatedAt();
            $obj->updatedAt = $histoire->getUpdatedAt();
            $obj->total = $histoire->getTotal();
            $obj->error = $histoire->getError();
            $result->documents[] = $obj;
        }
        return $result;
    }

    private function ConvertHistoryItemToDocumentItemsDto(History $history): DocumentItemsDto
    {
        $result = new DocumentItemsDto();
        $result->totalPriceAfterTax = $history->getTotal();
        $result->documentType = $history->getDocumentType();
        $result->totalPrecent = $history->getDiscount();
        $result->totalAfterDiscount = 0;
        $result->totalTax = 0;
        $result->products = [];
        foreach ($history->getHistoryDetaileds() as $productRec){
            $obj = new DocumentItemDto();
            $obj->sku = $productRec->getProduct()->getSku();
            $obj->title = $productRec->getProduct()->getTitle();
            $obj->quantity = $productRec->getQuantity();
            $obj->priceByOne = $productRec->getSinglePrice();
            $obj->total = $productRec->getTotal();
            $obj->discount = $productRec->getDiscount();
            $result->products[] = $obj;
        }
        return $result;
    }


    private function GetType(string $value): DocumentsType
    {
        $enumDetails = DocumentsType::getAllDetails();
        if (isset($enumDetails[$value]['ENGLISH'])) {
            return $enumDetails[$value]['ENGLISH'];
        }

        throw new \InvalidArgumentException("Invalid DocumentsType: $value");
    }
}
