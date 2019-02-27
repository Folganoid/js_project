<?php
/**
 * Created by PhpStorm.
 * User: fg
 * Date: 2/27/19
 * Time: 11:03 PM
 */

namespace App\Service;

class TokenService
{
    public function generateToken():string
    {
        $rand = bin2hex(random_bytes(255));
        return substr($rand, 0, 255);
    }
}
