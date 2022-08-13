import { useContext } from "react";
import { context } from "../Components/PageSwitch";

function useCurrentPage() {
  const { page, data, query } = useContext(context);
  const changePage = (pageName, data, query) => {
    window.dispatchEvent(
      new CustomEvent("pagechange", {
        detail: {
          name: pageName,
          data: data,
          query: query,
        },
      })
    );
  };
  return { page, changePage, data, query };
}

export default useCurrentPage;
