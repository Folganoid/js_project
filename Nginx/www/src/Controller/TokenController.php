<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class TokenController extends AbstractController
{
    /**
     * @Route("/token", name="token")
     */
    public function index()
    {
        return $this->render("ggg");
    }
}
