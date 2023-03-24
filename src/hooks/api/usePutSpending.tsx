import { putSpendingService } from "../../service/putSpending";
import { useAsync } from "../useAsync";
import useToken from "../useToken";

export default function usePutSpeding() {

    const token = useToken();

    const {
      data: Spending,
      loading: SpendingLoading,
      error: SpendingError,
      act: functionSpendingPut
    } = useAsync((data:any) => putSpendingService(data, token), false);
    
    return {
      SpendingLoading,
      SpendingError,
      Spending,
      functionSpendingPut
    };
}