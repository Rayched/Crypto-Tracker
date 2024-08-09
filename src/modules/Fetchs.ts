//React Query, Query Function

const Based_URL = "https://api.coinpaprika.com/v1";
const Replace_URL = "https://ohlcv-api.nomadcoders.workers.dev";
//기존에 사용하던 coinpaprika api는 유료로 전환됐기 때문에
//강의에서 제공되는 자체 api 사용하였음.

//Main Home (Coins.tsx)
//코인 목록 fetch
export async function FetchCoins(){
    return fetch(`${Based_URL}/coins`).then(
        (resp) => resp.json()
    );
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

//Coin - Chart Tab, Chart Data Fetch
export function FetchCoinHistory(coinID: string|undefined){
    return fetch(`${Replace_URL}?coinId=${coinID}`).then(
        (resp) => resp.json()
    );
};