import { deleteSpendingService } from "../../service/deleteSpending";
import { useAsync } from "../useAsync";
import useToken from "../useToken";

export default function useDeleteSpeding() {

    const token = useToken();

    const {
      data: Spending,
      loading: SpendingLoading,
      error: SpendingError,
      act: functionSpendingDelete
    } = useAsync((data:any) => deleteSpendingService(data, token), false);
    
    return {
      SpendingLoading,
      SpendingError,
      Spending,
      functionSpendingDelete
    };
}