import { useContext } from "react";
import { context } from "../Components/PageSwitch";

function useCurrentPage() {
  const { page, data } = useContext(context);
  const changePage = (pageName, data) => {
    window.dispatchEvent(
      new CustomEvent("pagechange", {
        detail: {
          name: pageName,
          data: data,
        },
      })
    );
  };
  return { page, changePage, data };
}

export default useCurrentPage;
