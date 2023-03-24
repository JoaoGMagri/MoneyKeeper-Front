import { getSpendingService } from "../../service/getSpending";
import { useAsync } from "../useAsync";
import useToken from "../useToken";

export default function useGetSpeding() {

    const token = useToken();

    const {
      data: Spending,
      loading: SpendingLoading,
      error: SpendingError,
      act: functionSpending
    } = useAsync( () => getSpendingService(token) );
    
    return {
      SpendingLoading,
      SpendingError,
      Spending,
      functionSpending
    };
}