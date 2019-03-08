<?php

namespace App\Controller;

use App\Service\ResponseService;
use Symfony\Component\HttpFoundation\Request;

class HomeController extends MainController
{

    public function homeAction(Request $request, ResponseService $responseService)
    {
        $checkAccess = $this->checkUserAccess($request, ["user", "admin"]);
        if ($checkAccess !== true) return $checkAccess;

        return $responseService->buildOkResponse(["ok" => true]);
    }

    public function testAction(Request $request, ResponseService $responseService)
    {
        return $responseService->buildOkResponse(["sfsfsf"]);
    }


}
