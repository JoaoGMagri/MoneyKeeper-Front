import { postSpendingService } from "../../service/postSpending";
import { useAsync } from "../useAsync";
import useToken from "../useToken";

export default function usePostSpeding() {

    const token = useToken();

    const {
      data: Spending,
      loading: SpendingLoading,
      error: SpendingError,
      act: functionSpendingPost
    } = useAsync((data:any) => postSpendingService(data, token), false);
    
    return {
      SpendingLoading,
      SpendingError,
      Spending,
      functionSpendingPost
    };
}