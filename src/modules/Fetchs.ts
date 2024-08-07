//React Query, Query Function

const Based_URL = "https://api.coinpaprika.com/v1";

//Main Home (Coins.tsx)
//코인 목록 fetch
export async function FetchCoins(){
    const Coins = await fetch(`${Based_URL}/coins`);
    const json = await Coins.json();

    return json;
};

//Detail Page (Coin.tsx)
//Coin Detail Information (개별 코인(coinID) 정보 fetch)
export async function FetchCoinInfo(coinID?: string){
    const Info = await fetch(`${Based_URL}/coins/${coinID}`);
    const json = await Info.json();

    return json;
};

//Coin Tickers (코인 가격 관련 정보 fetch)
export async function FetchCoinTickers(coinID?: string) {
    const Tickers = await fetch(`${Based_URL}/tickers/${coinID}`);
    const json = await Tickers.json();

    return json;
}