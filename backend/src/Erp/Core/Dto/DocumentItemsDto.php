<?php

namespace App\Erp\Core\Dto;

use App\Enum\DocumentsType;

class DocumentItemsDto
{
    /** @var DocumentItemDto[] */
    public $products = [];
    public ?int $totalTax;
    public ?int $totalPriceAfterTax;
    public ?int $totalAfterDiscount;
    public ?int $totalPrecent;
    public ?DocumentsType $documentType;
    public ?string $base64Pdf;
    /** @var DocumentItemFileDto[] */
    public $files = [];


}