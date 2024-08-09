import { useQuery } from "react-query";
import { FetchCoinHistory } from "../modules/Fetchs";

interface ChartProps {
    coinID: string|undefined;
}

function Chart({coinID}: ChartProps){
    const {isLoading, data: CoinHistory} = useQuery(
        ["CoinHistory", coinID], 
        () => FetchCoinHistory(coinID)
    );

    console.log(CoinHistory);

    return (
        <div>
            <h4>Chart</h4>
        </div>
    );
};

export default Chart;