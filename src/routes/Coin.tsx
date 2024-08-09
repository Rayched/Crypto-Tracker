import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinInfo, FetchCoinTickers } from "../modules/Fetchs";
import Chart from "./Chart";
import Price from "./Price";
import ToggleBtn from "../modules/ToggleBtn";

const RootContainer = styled.main`
    max-width: 480px;
    padding: 0px 20px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinImgs = styled.img`
    width: 25px; 
    height: 25px;
    margin-right: 7px;
`;

const Title = styled.div`
    font-size: 30px;
    color: black;
`;

const NavBar = styled.div`
    position: absolute;
    left: 90%;
`;

const HomeBtn = styled.div`
    padding: 3px;
    border: 1px solid black;
    text-align: center;
    align-items: center;
    margin: 5px 0px;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 35px 0px;

    font-size: 18px;
`;

const InfoBox = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: lightgray;
    border: 1px solid black;
    padding: 10px 20px;

    margin: 35px 0px;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px 20px;

    span:first-child {
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const DescBox = styled.div`
    border: 1px solid black;
    padding: 5px;
    margin: 25px 0px;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 25px 0px;
    border: 2px solid black;
    border-radius: 10px;
    padding: 3px;
`;

const TabItem = styled.div<{isActive: boolean}>`
    width: 150px;
    text-align: center;
    font-size: 18px;
    margin: 10px;
    color: ${(props) => props.isActive ? "yellow" : "white"};
    background-color: gray;
    border-radius: 10px;

    &:hover {
        background-color: lightgray;
    }
    a {
        display: block;
        padding: 7px;
    }
`;

function Coin(){
    const {coinID} = useParams();

    const chartMatch = useMatch("/:coinID/chart");
    const priceMatch = useMatch("/:coinID/price");

    const {isLoading: isInfo, data: CoinInfo} = useQuery(
        "CoinInfo", () => FetchCoinInfo(coinID)
    );

    const {isLoading: isTicker, data: CoinTicker} = useQuery(
        "CoinTicker", () => FetchCoinTickers(coinID)
    );

    console.log(CoinInfo);
    console.log(CoinTicker);

    const TotalLoading = isInfo || isTicker;

    return (
        <RootContainer>
            <Header>
                <CoinImgs src={`https://static.coinpaprika.com/coin/${coinID ? coinID : CoinInfo?.id}/logo.png`}/>
                <Title>{CoinInfo?.name}</Title>
                <NavBar>
                    <HomeBtn>
                        <Link to="/">← Home</Link>
                        </HomeBtn>
                        <ToggleBtn />
                </NavBar>
            </Header>
            {
                TotalLoading ? "코인 정보를 가져오고 있습니다..."
                : (
                    <MainWrapper>
                        <InfoBox>
                            <InfoItem>
                                <span>Rank</span>
                                <span>{CoinInfo?.rank}</span>
                            </InfoItem>
                            <InfoItem>
                                <span>Symbol</span>
                                <span>{CoinInfo?.symbol}</span>
                            </InfoItem>
                            <InfoItem>
                                <span>Price</span>
                                <span>$ {CoinTicker?.quotes.USD.price.toFixed(2)}</span>
                            </InfoItem>
                        </InfoBox>
                        <InfoBox>
                            <InfoItem>
                                <span>1st Update</span>
                                <span>{CoinInfo?.first_data_at}</span>
                            </InfoItem>
                            <InfoItem>
                                <span>Last Update</span>
                                <span>{CoinInfo?.last_data_at}</span>
                            </InfoItem>
                        </InfoBox>
                        <DescBox>
                            {CoinInfo?.description}
                        </DescBox>
                        <Tabs>
                            <TabItem isActive={chartMatch !== null}>
                                <Link to={`/${coinID}/chart`}>Chart</Link>
                            </TabItem>
                            <TabItem isActive={priceMatch !== null}>
                                <Link to={`/${coinID}/price`}>Price</Link>
                            </TabItem>
                        </Tabs>
                        <Routes>
                            <Route path="chart" element={<Chart coinID={coinID}/>}/>
                            <Route path="price" element={<Price />}/>
                        </Routes>
                    </MainWrapper>
                )
            }
        </RootContainer>
    );
};

export default Coin;