@extends('mainlayout')

@section('head')
    
    @vite('resources/css/Trade/Trade.scss')
    @viteReactRefresh
    @vite('resources/js/Trade/main.jsx')
@endsection

@section('content')
    <div class="title_div">
        <h1 class="title_text">Welcome to BTC Trading</h1>
    </div>
    <div id="root">

    </div>
@endsection
