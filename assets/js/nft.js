$(document).ready(function () {

    /*-----------------------------------------------------*/
    /*---------------------- NFT PRICE  -------------------*/
    /*-----------------------------------------------------*/

    // let nomicsApi = "8c93e251e07e8be11f5662ec54c82a75ffc2a72d";
    let cryptoCompare = "cfa0a12e68c2468e27877503a3c4c69c0abd2c4708ce4287e83f90cc9dc556ee"
    let nftPrice;

    var settings = {
        "url": "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "authorization": "Apikey " + cryptoCompare
        },
    };

    $.ajax(settings).done(function (response) {

        // convert $1,444 based on the given exchange rate, which is 1 eth to dollars //

        var rate = parseInt(response['USD']); 
        var usdPrice = 1444;
        var ethPrice = parseFloat(usdPrice / rate); // given rate is 1 eth to dollars , needed to divide the usd price to the rate //
        var ethPriceDecimal = ethPrice.toFixed(3)


        nftPrice = ethPriceDecimal;
        $('.usd-eth-price').html(ethPriceDecimal + ' ETH');
        $('.mint-data .total-amount').html(ethPriceDecimal + ' ETH');
       

    });

    /*-----------------------------------------------------*/
    /*------------- MORALIS CONNECT DISCONNECT ------------*/
    /*-----------------------------------------------------*/

    // Moralis keys //

    const serverUrl = "https://wudv0exz4oqx.usemoralis.com:2053/server";
    const appId = "54Lxbw4Txb0ATm1s568Q87EvXR0HPsaUkPDlQNV6";
    Moralis.start({ serverUrl, appId });

    
    let userWallet = Moralis.User.current();
    let userNftOwned;


    // Connect function //

    async function connect() {
        if (!userWallet) { // if not login //
            try {

                userWallet = await Moralis.authenticate();

                setTimeout(function () {

                    onConnect(); // functions to run after

                }, 500);

            } catch (e) {
                // userWallet = await Moralis.authenticate({
                //     provider: "walletconnect",
                //     mobileLinks: [
                //         "metamask",
                //     ]
                // })
                $('<p class="connect-error">' + e + '</p>').insertAfter('.connect');
            }
        } else { 
            console.log('loggedin')
        }
        // Cookies.set('tribesWallet', userWallet['attributes']['ethAddress']); // save wallet address to cookies //
        // window.location.reload();
    }

    // functions need to run upon connect w/o reloading //

    function onConnect() { 

        // pass the wallet address //

        $('.wallet-address .address').html(userWallet['attributes']['ethAddress']);

        // Hide the connect button, and show the wallet address //

        $('.connect').attr('style', 'display:none;');
        $('.wallet-address').attr('style', 'display:block;');

        // wallet balance //

        var moralisApi = 'HORWsD2mPwjrEM5PPar8MSayK5NMElO2UTzw5WtoNnmasolp2qn6KBVpbehBXkfb';

        // Check wallet balance via moralis api //

        var walletBalance = {
            "url": "https://deep-index.moralis.io/api/v2/" + userWallet['attributes']['ethAddress'] + "/balance",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "x-api-key": moralisApi,
            },
        };

        $.ajax(walletBalance).done(function (response) {

            // convert raw balance to eth //

            var wei = 1000000000000000000;
            var balance = parseInt(response['balance']);
            var converted = balance / wei;

            // pass balance //
            
            $('.mint-data-wrapper .wallet-balance').html(converted + ' ETH');

        });

        // Check the user owned/minted/bought nft for the specific contract - how many does the user own/bought on the collection //

        var tokenContract = '0x5C56aC098Fd53EEf0F1F4d6fe2c1B3172F7939A5';

        var userNftOwnedSettings = {
            "url": "https://deep-index.moralis.io/api/v2/" +  userWallet['attributes']['ethAddress'] + "/nft/" + tokenContract,
            "method": "GET",
            "timeout": 0,
            "headers": {
                "x-api-key": moralisApi,
            },
        };

        $.ajax(userNftOwnedSettings).done(function (response) {
            userNftOwned = response['total'];

            // Show exodus if user owns nft
            if (userNftOwned >= '1') { 
                $('ul#menu-primary-menu').append('<li class="menu-item exodus"><a href="https://www.bornmadebosses.com/offers/22508379-3d07-4405-ba5d-67230411e325">Exodus</a></li>');
            }
        });

    }

    // Disconnect function //

    async function disconnect() {
        await Moralis.User.logOut();
        // Cookies.remove('tribesWallet'); // remove wallet address to cookies //
        window.location.reload();

        // setTimeout(function () {

        //     onDisconnect(); // functions to run after

        // }, 1000);   
    }

    // functions need to run upon disconnect w/o reloading //

    // function onDisconnect() {

    //     // Hide the wallet address, and show the connect button //

    //     $('.connect').attr('style', 'display:block;');
    //     $('.wallet-address').attr('style', 'display:none;');

    //     // display wallet

    //     $('.mint-data-wrapper .wallet-balance').html('Wallet not connected');

    // }


    // Other functions
    
    setTimeout(function () {
        
        // Onclick function //
			
        $('.connect').on('click', function () {
            
            connect(); // moralis auth 

        });
        
        $('.disconnect').on('click', function () { 
            
            disconnect();

        });

        // On load functions to retain values //

        if (userWallet) { // check if logged in //

            // pass the wallet address //

            $('.wallet-address .address').html(userWallet['attributes']['ethAddress']);

            // Hide the connect button, and show the wallet address //

            $('.connect').attr('style', 'display:none;');
            $('.wallet-address').attr('style', 'display:block;');

        }

        // disconnect hover //

        $('.wallet-address').mouseenter(function() {
            $('.address').attr('style', 'display: none');
            $('span.disconnect-text').attr('style', 'display: block');
        }).mouseleave(function() {
            $('.address').attr('style', 'display: block');
            $('span.disconnect-text').attr('style', 'display: none');
        });

    }, 1000);

    /*-----------------------------------------------------*/
    /*---------------------- MINT  ------------------------*/ // - will work on load - to retain values
    /*-----------------------------------------------------*/

    let moralisApi = 'HORWsD2mPwjrEM5PPar8MSayK5NMElO2UTzw5WtoNnmasolp2qn6KBVpbehBXkfb';

    setTimeout(function () {

        // pass wallet balance //

        if (userWallet) { // check if logged in //

            // Check wallet balance via moralis api //

            var walletBalance = {
                "url": "https://deep-index.moralis.io/api/v2/" + userWallet['attributes']['ethAddress'] + "/balance",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "x-api-key": moralisApi,
                },
            };

            $.ajax(walletBalance).done(function (response) {

                // convert raw balance to eth //

                var wei = 1000000000000000000;
                var balance = parseInt(response['balance']);
                var converted = balance / wei;

                // pass balance //
                
                $('.mint-data-wrapper .wallet-balance').html(converted + ' ETH');

            });

        } else { // if not logged in //

            $('.mint-data-wrapper .wallet-balance').html('Wallet not connected');

        }


        // amount total function //

        $('.minus').click(function () {
			var $input = $(this).parent().find('input');
			var count = parseInt($input.val()) - 1;
			count = count < 1 ? 1 : count;
			$input.val(count);
            $input.change();
            
            // multiply the current amount to the eth price, then pass to total //
            var amount = parseInt(count);
            var total = amount * nftPrice;
            $('.mint-data .total-amount').html(total + ' ETH');


            return false;
            
		});

		$('.plus').click(function () {
			var $input = $(this).parent().find('input');
			var count = parseInt($input.val()) + 1;
			count = count = 2 ? 2 : count;
			$input.val(count);
            $input.change();
            
            // multiply the current amount to the eth price, then pass to total //
            var amount = parseInt(count);
            var total = amount * nftPrice;
            $('.mint-data .total-amount').html(total + ' ETH');


			return false;
		});

		$('#max').on('click', function() { 
            $('input.amount').val(parseInt('2'));
            
            // multiply the current amount to the eth price, then pass to total //
            var amount = parseInt(2);
            var total = amount * nftPrice;
            $('.mint-data .total-amount').html(total + ' ETH');

        });

        // Check # of nft's (# users) minted/bought for the specific contract - how many user minted/bought/owns the collection //

        let tokenContract = '0x5C56aC098Fd53EEf0F1F4d6fe2c1B3172F7939A5';

        var userMinted = {
            "url": "https://deep-index.moralis.io/api/v2/nft/" + tokenContract + "/owners",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "x-api-key": moralisApi,
            },
        };

        $.ajax(userMinted).done(function (response) {
            $('.total-minted span').html(response['total']);
        });

        // Check the user owned/minted/bought nft for the specific contract - how many does the user own/bought on the collection //

        // let userNftOwned;

        if (userWallet) {

            var userNftOwnedSettings = {
                "url": "https://deep-index.moralis.io/api/v2/" + userWallet['attributes']['ethAddress'] + "/nft/" + tokenContract,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "x-api-key": moralisApi,
                },
            };

            $.ajax(userNftOwnedSettings).done(function (response) {
                userNftOwned = response['total'];

                // Show exodus if user owns nft
                if (userNftOwned >= '1') { 
                    $('ul#menu-primary-menu').append('<li class="menu-item exodus"><a href="https://www.bornmadebosses.com/offers/22508379-3d07-4405-ba5d-67230411e325">Exodus</a></li>');
                }
            });

        }
        
        // Mint Function //

        async function mint() {

            var amount_to_mint = $('.mint-data input.amount').val();
            const drop = await DropKit.create('dklNzeotNBgtTMvu2uef'); // SDK key

            // Showing of pop up
                
            // var firstMinting = Cookies.get('firstMinting'); !firstMinting // present if user already minted
            // if (userNftOwned >= '1') { // if user has already minted

            $('#modal360').modal('show');

            try {
                await drop.mint(amount_to_mint); // Number of NFTs to mint
                $('.mint-success').html('Congrats on minting!');

                // Show check after some time
                $('.circle-loader').removeClass('load-error').toggleClass('load-complete');
                $('.checkmark').removeClass('error').addClass('draw').toggle();

                var userOptedin = Cookies.get('userOptedin'); // present if user already opted
                if (!userOptedin) { // if userOptedin cookie not present

                    setTimeout(function () {

                        $('#modal360').modal('hide');
                        $('#formModal').modal('show');
                        
                    }, 1500);

                } else { 
                    
                    setTimeout(function () {
                        $('#modal360').modal('hide');
                    }, 1500);
                    
                }

            } catch (e) {  
                console.log(e);
                $('.mint-error').html(e);
                // Show error after some time
                $('.circle-loader').removeClass('load-complete').toggleClass('load-error');
                $('.checkmark').removeClass('draw').addClass('error').toggle();
                $('<p class="mint-error" style="margin-top: 30px;">' + e + '</p>').insertAfter('.circle-loader');
            }

            // }

            // else { // If first time

            //     // Show 360 pop

            //     $('#modal360').modal('show');

            //     try {
                
            //         await drop.mint(amount_to_mint); // Number of NFTs to mint
            //         $('.mint-success').html('Congrats on minting!');

            //         // Show check after some time
            //         $('.circle-loader').removeClass('load-error').toggleClass('load-complete');
            //         $('.checkmark').removeClass('error').addClass('draw').toggle();
                    

            //         // Add the cookie, user already minted
            //         // Cookies.set('firstMinting', 'true');

                    

            //     } catch (e) {
                    
            //         // console.log(e);

            //         $('.mint-error').html(e);
            //         // Show error after some time
            //         $('.circle-loader').removeClass('load-complete').toggleClass('load-error');
            //         $('.checkmark').removeClass('draw').addClass('error').toggle();
            //         $('<p class="mint-error" style="margin-top: 30px;">' + e + '</p>').insertAfter('.circle-loader');
                   
            //     }

                
            // }

            // end popup

            // try {
                
            //     await drop.mint(amount_to_mint); // Number of NFTs to mint
            //     $('.mint-success').html('Congrats on minting!');

            // } catch (e) {
            //     // if(e == 'Error: Your wallet does not have enough balance.') {
            //     //     $('.mint-error').html(e);
            //     // } else {
            //     //     $('.mint-success').html('Congrats on minting!');
            //     // }   
            //     console.log(e);
            //     $('.mint-error').html(e);
            // }

        }

        
        $('#mint').on('click', function () { 
            
            if(userWallet) { // check if connected
                if(userNftOwned >= '2') { // if user has 2 nft display error
                    $('.mint-error').html('You have already minted 2 NFTs');
                } else {
                    mint();
                    console.log('wallet has ' + userNftOwned + ' NFT Minted');
                }
            } else { // not
                $('.mint-error').html('Please connect your wallet first!');
            }

        });


        // pass wallet balance on mobile
        const drop = document.getElementById('connect-wallet-mobile');
        drop.addEventListener('walletConnected', event => {

            const walletAddress = event.detail.walletAddress;

            var walletBalance = {
                "url": "https://deep-index.moralis.io/api/v2/" + walletAddress + "/balance",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "x-api-key": moralisApi,
                },
            };

            $.ajax(walletBalance).done(function (response) {

                // convert raw balance to eth //

                var wei = 1000000000000000000;
                var balance = parseInt(response['balance']);
                var converted = balance / wei;

                // pass balance //
                
                $('.mint-data-wrapper .wallet-balance').html(converted + ' ETH');

            });
        });


        // Mobile mint showing of pop up
        $('nk-dropkit').on('click', function(){

            var timer = setInterval(function () { 
                
                var root = $('nk-dropkit')[0].shadowRoot;
                if ( $(root).find('nk-success-message').is(':visible') ) {
                    
                    // Showing of pop up
                
                    //var firstMinting = Cookies.get('firstMinting'); // present if user already minted
                    if (userNftOwned >= '1') { // if user has already minted

                        var userOptedin = Cookies.get('userOptedin'); // present if user already opted
                        if (!userOptedin) { // if userOptedin cookie not present

                            $('#formModal').modal('show');
                                
                        }


                    } else { 

                        // Show 360 pop

                        $('#modal360').modal('show');

                        // Show check after some time
                        setTimeout(function () {
                            $('.circle-loader').removeClass('load-error').toggleClass('load-complete');
                            $('.checkmark').addClass('draw').toggle();
                        }, 1500);

                        
                        setTimeout(function () {
                            $('#modal360').modal('hide');
                            $('#formModal').modal('show');
                        }, 2500);
                        
                    }

                    // end popup
                    clearInterval(timer);
                }

            }, 1500);
            
        })

    }, 1000);

})