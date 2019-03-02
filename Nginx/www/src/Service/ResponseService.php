<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;

class ResponseService
{
    /**
     * build error response
     *
     * @param int $code
     * @param string $message
     * @return Response
     */
    function buildErrorResponse(int $code = 404, string $message = "Error..."): Response {

        $response = new Response();

        $response->setStatusCode($code);
        $response->setContent(json_encode([
            'error' => $message
        ]));
        return $response;
    }

    /**
     * build good response
     *
     * @param array $data
     * @return Response
     */
    function buildOkResponse(array $data): Response {

        $response = new Response();
        $response->setContent(json_encode($data));
        return $response;
    }
}