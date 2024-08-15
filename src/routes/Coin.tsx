import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinInfo, FetchCoinTickers } from "../modules/Fetchs";
import Price from "./Price";
import CoinChart from "./Chart";
import { Loadings } from "./Coins";
import ToggleBtn from "../modules/ToggleBtn";
import { Helmet } from "react-helmet-async";

const RootContainer = styled.main`
    padding: 0px 20px;
    margin: 0 auto;
    background-color: ${(props) => props.theme.BgColor};
    max-width: 500px;
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
`;

const NavBar = styled.div`
    position: absolute;
    top: 1%;
    left: 80%;
`;

const HomeBtn = styled.div`
    padding: 5px;
    border: 1px solid black;
    text-align: center;
    align-items: center;
    margin: 5px 0px;
    background-color: ${(props) => props.theme.ItemBgColor};
    &:hover {
        background-color: ${(props) => props.theme.accentBgColor};
    }
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
    background-color: ${(props) => props.theme.ItemBgColor};
    border: 1px solid black;
    border-radius: 15px;
    padding: 10px 20px;

    margin: 35px 0px;
`;

const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 0px 20px;

    span:first-child {
        font-size: 20px;
        font-weight: bold;
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
    font-weight: bold;
`;

const TabItem = styled.div<{isActive: boolean}>`
    width: 150px;
    text-align: center;
    font-size: 18px;
    margin: 10px;
    color: ${(props) => props.theme.textColor};

    background-color: ${(props) => 
        props.isActive ? props.theme.accentBgColor : props.theme.ItemBgColor
    };

    border-radius: 10px;

    &:hover {
        background-color: ${(props) => props.theme.accentBgColor};
    }
    a {
        display: block;
        padding: 7px;
    }
`;

const TitleImg = styled.img`
    width: 16px;
    height: 16px;
`;

function Coin(){
    const {coinID} = useParams();

    const chartMatch = useMatch("/:coinID/chart");
    const priceMatch = useMatch("/:coinID/price");

    const {isLoading: isInfo, data: CoinInfo} = useQuery(
        "CoinInfo", () => FetchCoinInfo(coinID)
    );

    const {isLoading: isTicker, data: CoinTicker} = useQuery(
        ["CoinTicker", coinID], 
        () => FetchCoinTickers(coinID),
    );

    console.log(CoinInfo);
    console.log(CoinTicker);

    const TotalLoading = isInfo || isTicker;

    return (
        <RootContainer>
            <Helmet>
                <title>{CoinInfo?.name}</title>
            </Helmet>
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
                TotalLoading ? 
                <Loadings>
                    <h3>coinID: {coinID}인 코인과 관련된</h3>
                    <h3>여러 정보 (기본 정보, 가격 정보..) 가져오고 있습니다...</h3>
                </Loadings>
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
                            <Route path="chart" element={<CoinChart coinID={coinID}/>}/>
                            <Route path="price" element={<Price />}/>
                        </Routes>
                    </MainWrapper>
                )
            }
        </RootContainer>
    );
};

export default Coin;