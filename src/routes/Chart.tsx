import { useQuery } from "react-query";
import { FetchCoinHistory } from "../modules/Fetchs";
import styled from "styled-components";
import ReactApexChart from "react-apexcharts";

const ChartWrap = styled.div``;

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

function Chart({coinID}: ChartProps){
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
                    <ReactApexChart
                        type="line"
                        series={[
                            {
                                name: "Test1",
                                data: [1, 2, 5, 7, 10, 13, 17, 25]
                            },
                            {
                                name: "Test2",
                                data: [5, 6, 8, 25, 20, 14, 1, 0]
                            },
                        ]}
                        options={{
                            chart: {
                                width: 500,
                                height: 600
                            },
                            theme: {
                                mode: "dark",
                            }
                        }}
                    />
                )
            }
        </ChartWrap>
    );
};

export default Chart;