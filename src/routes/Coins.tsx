import { useQuery } from "react-query";
import styled from "styled-components";
import { FetchCoins } from "../modules/Fetchs";
import { Link } from "react-router-dom";

const Header = styled.h2`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`;

const CoinList = styled.ul``;

const CoinItem = styled.li`
    background-color: white;
    padding: 20px;
    border: 2px solid black;
    border-radius: 15px;
    margin-bottom: 10px;
    color: black;

    a {
        padding: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    } &:hover {
        background-color: lightgray;
    }
`;

const CoinImg = styled.img`
    width: 30px; height: 30px;
    margin-right: 7px;
`;

interface CoinDataTypes {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
    const {isLoading, data: CoinData} = useQuery<CoinDataTypes[]>(
        "Allcoins", FetchCoins, {select: (coins) => coins.slice(0, 50)}
    );

    return (
        <div>
            <Header>
                코인 목록
            </Header>
            {
                isLoading ?
                (
                    <div>
                        <h3>Data 가져오고 있습니다.</h3>
                        <h4>잠시만 기다려주세요...</h4>
                    </div>
                ) : (
                    <CoinList>
                        {
                            CoinData?.map((coins) => 
                                <CoinItem key={coins.id}>
                                    <Link to={`${coins.id}`} state={coins.name}>
                                        <CoinImg src={`https://static.coinpaprika.com/coin/${coins.id}/logo.png`}/>
                                        {coins.name}
                                    </Link>
                                </CoinItem>
                            )
                        }
                    </CoinList>
                )
            }
        </div>
    );
};

export default Coins;