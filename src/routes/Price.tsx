import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FetchCoinTickers } from "../modules/Fetchs";

const Container = styled.div``;

const TickerWrap = styled.div`
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    span {
        padding: 5px;
    }
`;

const TickerTitle = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin: 0px 10px;
`;

const TickerBodys = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin: 0px 10px;
`;

function Price(){
    const {coinID} = useParams();

    const {isLoading, data: TickerData} = useQuery(
        ["TickerDatas", coinID],
        () => FetchCoinTickers(coinID),
    );

    return (
        <Container>
            {
                isLoading ? "Price data 가져오고 있습니다..."
                : (
                    <TickerWrap>
                        <TickerTitle>
                            <span>1h</span>
                            <span>24h</span>
                            <span>주간</span>
                            <span>월간</span>
                            <span>년간</span>
                        </TickerTitle>
                        <TickerBodys>
                            <span>{TickerData?.quotes.USD.percent_change_1h + " %"}</span>
                            <span>{TickerData?.quotes.USD.percent_change_24h + " %"}</span>
                            <span>{TickerData?.quotes.USD.percent_change_7d + " %"}</span>
                            <span>{TickerData?.quotes.USD.percent_change_30d + " %"}</span>
                            <span>{TickerData?.quotes.USD.percent_change_1y + " %"}</span>
                        </TickerBodys>
                    </TickerWrap>
                )
            }
        </Container>
    );
}

export default Price;