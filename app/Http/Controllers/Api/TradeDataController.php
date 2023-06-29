<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TradingBtcUsd;
use Illuminate\Http\Request;

class TradeDataController extends Controller
{
    public function index()
    {
        $index = Rand(min: 1, max: 4400954);

        // dd($index);

        $tradedata = TradingBtcUsd::
        where('id', '>', $index)
        ->orderBy('id')
        ->limit(100)
        ->get();

        return $tradedata;
    }

    public function show($time)
    {
        $trade = TradingBtcUsd::
        where('time', '>=', $time)
        ->first(); 
        
        return $trade;
    }
}
