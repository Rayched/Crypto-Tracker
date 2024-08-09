import { useQuery } from "react-query";
import { FetchCoinHistory } from "../modules/Fetchs";
import styled from "styled-components";
import Coin from "./Coin";
import ReactApexChart from "react-apexcharts";

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

    console.log(CoinHistory);

    return (
        <ChartWrap>
            {
                isLoading 
                ? "Chart Data Loading..." 
                : (
                    /*
                    <ReactApexChart
                        type="line"
                        series={[
                            {
                                name: "Price",
                                data: CoinHistory?.map((price) => parseFloat(price.close))??[]
                            }
                        ]}
                        options={{
                            chart: {
                                width: "100%",
                                background: "#f1f2f6"
                            },
                            theme: {
                                mode: "dark",
                                monochrome: {
                                    enabled: false,
                                    shadeTo: "light"
                                }
                            },
                            stroke: {
                                curve: "smooth"
                            }
                        }}
                    />*/
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
                            chart: {
                                width: "100%",
                                background: "#f1f2f6"
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