<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TradingBtcUsd;
use Illuminate\Http\Request;

class TradeDataController extends Controller
{
    public function index()
    {
        $tradedata = TradingBtcUsd::
        where('time' > '')
        ->limit(50)
        ->get();

        return $tradedata;
    }
}
