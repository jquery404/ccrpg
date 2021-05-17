"use strict";

let _player = [
    {
        name: '',
        occupation: 'tailor',
        items: [],
        limit: 5,
        sellable: ['dress/shirt'],
        sellable_to:[''],
        sellable_price: [0],
        sellable_price_cc: [0],
        buyable: ['traditional cloth'], 
        buyable_from: ['weaver'],
        buyable_amount: -1,
        forbidden: ['outsider'],
        forbidden_item: ['factory cloth'],
        savings: 50000,
        _savings: 50000,
        savings_cc: 0,
        _savings_cc: 0,
    },
    {
        name: '',
        occupation: 'vegetable farmer',
        items: [],
        limit: 5,
        sellable: ['vegetables'],
        sellable_to:[''],
        sellable_price: [1500],
        sellable_price_cc: [10],
        buyable: ['natural insecticide'], 
        buyable_from: ['herbal doctor'],
        buyable_amount: 1,
        forbidden: [],
        forbidden_item: [],
        savings: 100000,
        _savings: 100000,
        savings_cc: 0,
        _savings_cc: 0,
    },
    {
        name: '',
        occupation: 'rice farmer',
        items: [],
        limit: 5,
        sellable: ['rice', 'local tobacco'],
        sellable_to:['', 'merchant'],
        sellable_price: [1500, 1000],
        sellable_price_cc: [10, 10],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: -50000,
        _savings: -50000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'food vendor',
        items: [],
        limit: 5,
        sellable: ['lunch'],
        sellable_to:[''],
        sellable_price: [0],
        sellable_price_cc: [20],
        buyable: ['homemade noodles'],
        buyable_from: ['labourer'],
        buyable_amount: -1, 
        forbidden: [],
        forbidden_item: [],
        savings: 50000,
        _savings: 50000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'herbal doctor',
        items: [],
        limit: 5,
        sellable: ['herbal medicine', 'natural dyes', 'natural insecticide'],
        sellable_to:['', '', ''],
        sellable_price: [0, 0, 2000],
        sellable_price_cc: [0, 10, 10],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: -50000,
        _savings: -50000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'labourer',
        items: [],
        limit: 5,
        sellable: ['labour', 'traditional homemade noodles'],
        sellable_to:['', 'food vendor'],
        sellable_price: [0, 2000],
        sellable_price_cc: [0, 10],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: -70000,
        _savings: -70000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'weaver',
        items: [],
        limit: 5,
        sellable: ['traditional cloth'],
        sellable_to:[''],
        sellable_price: [1000],
        sellable_price_cc: [10],
        buyable: ['cotton', 'natural dyes'], 
        buyable_from: ['homemaker', 'herbal doctor'],
        buyable_amount: -1,
        forbidden: ['homemaker', 'herbal doctor'],
        forbidden_item: ['cotton', 'natural dye'],
        savings: 30000,
        _savings: 30000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'fisher',
        items: [],
        limit: 5,
        sellable: ['fish'],
        sellable_to:[''],
        sellable_price: [5000],
        sellable_price_cc: [30],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: 50000,
        _savings: 50000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'homemaker',
        items: [],
        limit: 5,
        sellable: ['babysitting', 'cotton'],
        sellable_to:['', 'weaver'],
        sellable_price: [0, 1000],
        sellable_price_cc: [0, 10],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: 0,
        _savings: 0,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'fruit farmer',
        items: [],
        limit: 5,
        sellable: ['fruit'],
        sellable_to:[''],
        sellable_price: [4000],
        sellable_price_cc: [30],
        buyable: ['natural insecticide'],
        buyable_from: ['herbal doctor'],
        buyable_amount: 1,
        forbidden: [],
        forbidden_item: [],
        savings: -10000,
        _savings: -10000,
        savings_cc: 0,
        _savings_cc: 0,
    },
    {
        name: '',
        occupation: 'mechanic',
        items: [],
        limit: 5,
        sellable: ['fix engine'],
        sellable_to:[''],
        sellable_price: [7000],
        sellable_price_cc: [0],
        buyable: ['engine parts'],
        buyable_from: ['outsider'],
        buyable_amount: -1, 
        forbidden: [],
        forbidden_item: [],
        savings: 50000,
        _savings: 50000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'merchant',
        items: [],
        limit: 999999,
        sellable: ['fruit', 'garam cigarettes', 'vegetables', 'local tobacco', 'fish'],
        sellable_to:['', '', '', '', ''],
        sellable_price: [9000, 3000, 3000, 1500, 9000],
        sellable_price_cc: [0, 0, 0, 10, 0],
        buyable: ['fruit', 'garam cigarettes', 'vegetables', 'local tobacco', 'fish'],
        buyable_from: ['fruit farmer', 'outsider', 'vegetable farmer', 'rice farmer', 'fisher'], 
        buyable_amount: -1,
        forbidden: [],
        forbidden_item: [],
        savings: 300000,
        _savings: 300000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'money lender',
        items: [],
        limit: 999999,
        sellable: ['money'],
        sellable_to:[''],
        sellable_price: [0],
        sellable_price_cc: [0],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: 500000,
        _savings: 500000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'outsider',
        items: [],
        limit: 999999,
        sellable: ['factory cloth', 'rice', 'garam cigarettes', 'chemical insecticide', 'indomie', 'factory thread/chemical dyes', 'engine parts'],
        sellable_to:['', '', 'merchant', '', '', '', ''],
        sellable_price: [10000, 3500, 2500, 8000, 1000, 3000, 7000],
        sellable_price_cc: [0, 0, 0, 0, 0, 0, 0],
        buyable: ['', 'rice', '', '', '', '', ''], 
        buyable_from: ['', 'rice farmer', '', '', '', '', ''],
        buyable_amount: -1,
        forbidden: [],
        forbidden_item: [],
        savings: 500000,
        _savings: 500000,
        savings_cc: 0,
        _savings_cc: 0,

    },
    {
        name: '',
        occupation: 'community banker',
        items: [],
        limit: 999999,
        sellable: [],
        sellable_to:[],
        sellable_price: [],
        buyable: [], 
        buyable_from: [],
        buyable_amount: 0,
        forbidden: [],
        forbidden_item: [],
        savings: 0,
        _savings: 0,
        savings_cc: 0,
        _savings_cc: 0,

    },
];

var items = document.getElementById('items');
var current = 0;
var _anim;

function changeRole(){
    current = document.getElementById("role").value;
    render();
}

function render(){
    let html = '';
    var bag = document.getElementById('ppbag');
    _player.forEach((element, index) => {
        if(index===parseInt(current)) html+='<span class="red">></span>';
        html += element.occupation+'('+element.savings+'/'+element.savings_cc+')' + '&nbsp;';
        for (var i =0; i< element.sellable.length; i++){
            html +=`<button onclick="purchase(`+index+`, `+i+`)">${element.sellable[i]} (${element.sellable_price[i]} / ${element.sellable_price_cc[i]})</button> &nbsp;`;
        }
        if(element.buyable.length > 0)
            html +=`<button class="depend">${element.buyable} </button> &nbsp;`;
        
        element.items.forEach(i => {
            html +=`${i}&nbsp;`;
        });

        html+='<br/>';
    });
    //items.innerHTML = html;
    var ssw = "<span class='wrapbagspan'><img width='24px' src='resources/cards/icons/"+_player[current].buyable[0]+".png'/> "+_player[current].buyable[0]+"</span>";
    for(var i = 0; i<_player[current].items.length; i++)
    {
        ssw += "<span class='wrapbagspan'><img width='24px' src='resources/cards/icons/"+_player[current].items[i]+".png'> "+_player[current].items[i]+"</span>";
    }
    bag.innerHTML = ssw;

    //if(!isAnimating){
        sav.innerHTML = '<img src="resources/cards/icons/money.png"/> ' + _player[0].savings;
        savCC.innerHTML = '<img src="resources/cards/Icons/coupon.png"/> ' + _player[0].savings_cc;
    //}
}

function purchase(role_id, item_id){
    let sellable_to = _player[role_id].sellable_to[item_id];
    let name = _player[role_id].sellable[item_id];
    let price = _player[role_id].sellable_price[item_id];
    //let price_cc = _player[role_id].sellable_price_cc[item_id];
    let price_cc = Math.floor(Math.random()*5);
    let occupation = _player[role_id].occupation;
    let limit = _player[current].limit;
    let totalItem = _player[current].items.length;
    let msgg = '';
    
    if(totalItem < limit){
        if(sellable_to === '' || sellable_to === _player[current].occupation){
            if(_player[current].forbidden.includes(occupation)
                && _player[current].forbidden_item.includes(name))
            {
                msgg += 'you cannot buy ' + name + ' from ' + occupation + '';
            }
            else if(Math.abs(_player[current].savings) >= price){
                if(name === 'money'){
                    let amt = prompt('How much money you want to borrow?');
                    amt = parseInt(amt);
                    _player[current].savings = _player[current].savings < 0 ? -1 * (Math.abs(_player[current].savings) + amt) : _player[current].savings + amt;
                    _player[role_id].savings -= amt;                   
                    _player[role_id].items.push(_player[current].occupation+'('+amt+')');
                }
                else if(restock(role_id, name)){
                    _player[current].savings = _player[current].savings < 0 ? 
                        -1 * Math.abs(_player[current].savings) + price : 
                        _player[current].savings - price;
                    _player[role_id].savings += price;
                    _player[role_id].savings_cc += price_cc;
                    _player[14].savings_cc += price_cc;

                    if(!_player[current].items.includes(name))
                        _player[current].items.push(name);
                }else{
                    msgg += 'not enough stock';
                }
                
                render();
            }else{
                msgg += 'not enough money';
            }
            
        }else{
            msgg += '' + name + ' only sellable to ' + sellable_to + '';
        }
    }else{
        msgg += 'you filled your purchased quota';
        shop_close();
        animaton();
    }

    if (msgg !== '') {
        chatMessageRecords += msgg;
        sendingChatMessage();
    }
    
}


function restock(role_id, name){
    let success = false;
    let index = _player[role_id].sellable.indexOf(name);
    
    if(_player[role_id].occupation === 'merchant'){
        _player.forEach((e, i) => {
            if(_player[role_id].buyable_from[index] === e.occupation){
                let buyId = e.sellable.indexOf(name);
                if(_player[role_id].savings >= e.sellable_price[buyId]){
                    _player[role_id].savings -= e.sellable_price[buyId];
                    e.savings += e.sellable_price[buyId];
                    success = true;
                }else{
                    success = false;
                }
            }
        });

    }else{
        if(_player[role_id].buyable.length === 0){
            success = true;
        }else{
            _player.forEach((e, i) => {
                if(_player[role_id].buyable_from[index] === e.occupation){
                    let buyId = e.sellable.indexOf(_player[role_id].buyable[index]);
                    if(_player[role_id].savings > e.sellable_price[buyId]){
                        _player[role_id].savings -= e.sellable_price[buyId];
                        e.savings += e.sellable_price[buyId];
                        success = true;
                    }else{
                        success = false;
                    }
                }else if(_player[role_id].buyable_from[index] === ''){
                    success = true;
                }
            });
        }
        
    }
    return success;
}

var k = 0;
var isAnimating = false;
function animaton() {
    isAnimating = true;
    _anim = setInterval(automate, 1000);
}

function automate() {
    k = k + 1;
    var oldCurrent = current;
    //for (var k=0; k<11; k++){
    if (oldCurrent !== k) {
        current = k;
        _player.forEach((e, i) => {
            if (i !== oldCurrent) {
                for (var j = 0; j < _player[i].sellable.length; j++) {
                    if (_player[current].items.length < _player[current].limit) {
                        purchase(i, j);
                    } else {
                        return;
                    }

                }
            }

        });
    }
    //}

    if (k == 9) {
        clearInterval(_anim);
        isAnimating = false;
        sav.innerHTML = '<img src="resources/cards/icons/money.png"/> ' + _player[0].savings;
        savCC.innerHTML = '<img src="resources/cards/Icons/coupon.png"/> ' + _player[0].savings_cc;
        summary_open();
    }

}

render();