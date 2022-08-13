import React, { useEffect, useState } from "react";

const pageContext = React.createContext();

export const context = pageContext;

function PageSwitch(props) {
  const { children, entry } = props;
  const hasSingleChild = !Array.isArray(children);
  const [page, setPage] = useState({ name: entry ?? "" });
  const handlePageChanged = (event) => {
    setPage({ name: event.detail.name, data: event.detail.data });
  };
  useEffect(() => {
    window.addEventListener("pagechange", handlePageChanged);
    return () => {
      window.removeEventListener("pagechange", handlePageChanged);
    };
  }, []);

  let targetPage;
  if (hasSingleChild) {
    targetPage = children;
  } else if (!page.name) {
    targetPage = children[0];
  } else {
    targetPage =
      children.find((child) => child.props.name === page.name) ?? children[0];
  }

  return <pageContext.Provider value={page}>{targetPage}</pageContext.Provider>;
}

export default PageSwitch;
