import { useQuery } from "react-query";
import { FetchCoinHistory } from "../modules/Fetchs";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

const ChartWrap = styled.div`
    margin-top: 10px;
    width: 400px;
    height: 400px;
`;

interface ChartProps {
    coinID: string|undefined;
}

interface History_types {
    time_open: number; 
    time_close: number; 
    open: string; 
    high: string; 
    low: string; 
    close: string; 
    volume: string; 
    market_cap: number;
}

function CoinChart({coinID}: ChartProps){
    const {isLoading, data: CoinHistory} = useQuery<History_types[]>(
        ["CoinHistory", coinID], 
        () => FetchCoinHistory(coinID)
    );

    const isDark = useRecoilValue(isDarkAtom);

    console.log(CoinHistory);

    return (
        <ChartWrap>
            {
                isLoading 
                ? "Chart Data Loading..." 
                : (
                    <ReactApexChart 
                        type="candlestick"
                        series={[
                            {
                                name: "Price",
                                data: CoinHistory?.map((price) => ({
                                    x: new Date(price.time_open),
                                    y: [
                                        parseFloat(price.open), 
                                        parseFloat(price.high), 
                                        parseFloat(price.low), 
                                        parseFloat(price.close)
                                    ]
                                }))as any[]
                            }
                        ]}
                        options={{
                            plotOptions: {
                                candlestick: {
                                    colors: {
                                        upward: "#ff4757",
                                        downward: "#5352ed"
                                    }
                                }
                            },
                            theme: {
                                mode: isDark ? "dark" : "light",
                            },
                            chart: {
                                width: "100%",
                            },
                            xaxis: {
                                type: "datetime",
                                categories: CoinHistory?.map(
                                    (price) => (price.time_close)
                                ),
                                labels: {
                                    datetimeFormatter: {
                                        month: "mmm 'yy"
                                    }
                                }
                            }
                        }}
                    />
                )
            }
        </ChartWrap>
    );
};

export default CoinChart;