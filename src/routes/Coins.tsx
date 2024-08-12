import { useQuery } from "react-query";
import styled from "styled-components";
import { FetchCoins } from "../modules/Fetchs";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import ToggleBtn from "../modules/ToggleBtn";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const Header = styled.h2`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 30px;
    text-align: center;
    width: 80%;
`;

const NavBar = styled.div`
    position: absolute;
    left: 74%;
`;

const CoinList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const CoinItem = styled.li`
    width: 60%;
    background-color: ${(props) => props.theme.ItemBgColor};
    padding: 20px;
    border: 2px solid black;
    border-radius: 15px;
    margin-bottom: 10px;

    a {
        padding: 20px;
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    } &:hover {
        color: ${(props) => props.theme.accentColor};
        background-color: ${(props) => props.theme.accentBgColor};
    }
`;

const CoinImg = styled.img`
    width: 30px; height: 30px;
    margin-right: 7px;
`;

export const Loadings = styled.div`
    padding: 10px;
    margin: 10px 0px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
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
        <Wrapper>
            <Header>
                <Title>
                    <span>코인 목록 / Coin's List</span>
                </Title>
                <NavBar>
                    <ToggleBtn />
                </NavBar>
            </Header>
                {
                    isLoading ?
                    (
                        <Loadings>
                            <h3>코인 데이터를 가져오고 있습니다.</h3>
                            <h4>잠시만 기다려주세요...</h4>
                        </Loadings>
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
        </Wrapper>
    );
};

export default Coins;