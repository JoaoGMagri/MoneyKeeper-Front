import { getSpendingService } from "../../service/getSpending";
import { useAsync } from "../useAsync";
import useToken from "../useToken";

export default function useGetSpeding() {

    const token = useToken();

    const {
      data: Spending,
      loading: SpendingLoading,
      error: SpendingError,
      act: functionSpendingGet
    } = useAsync( () => getSpendingService(token) );
    
    return {
      SpendingLoading,
      SpendingError,
      Spending,
      functionSpendingGet
    };
}