<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trading_btc_usd', function (Blueprint $table) {
            $table->id();
            $table->integer('time')->unique();
            $table->double('open');
            $table->double('close');
            $table->double('high');
            $table->double('low');
            $table->double('volume');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trading_btc_usd');
    }
};
