import { useCallback, useContext, useMemo } from "react";
import { context } from "../Components/PageSwitch";

function useCurrentPage() {
  const pageContext = useContext(context);
  const changePage = useCallback((pageName, data, query) => {
    window.dispatchEvent(
      new CustomEvent("pagechange", {
        detail: {
          name: pageName,
          data: data,
          query: query,
        },
      })
    );
  }, []);
  const hookValue = useMemo(
    () => ({
      page: pageContext.page,
      data: pageContext.data,
      query: pageContext.query,
      changePage,
    }),
    [pageContext, changePage]
  );
  return hookValue;
}

export default useCurrentPage;
