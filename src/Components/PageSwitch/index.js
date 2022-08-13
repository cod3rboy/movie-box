import React, { useCallback, useEffect, useMemo, useState } from "react";

const pageContext = React.createContext();

export const context = pageContext;

function PageSwitch(props) {
  const { children, entry } = props;
  const hasSingleChild = !Array.isArray(children);
  const query = useMemo(
    () =>
      Object.fromEntries(new URL(window.location.href).searchParams.entries()),
    []
  );
  const pageNames = useMemo(
    () => new Set(children.map((c) => c.props.name)),
    [children]
  );
  const [page, setPage] = useState(() => {
    const initialPage = { query };
    const pageName = new URL(window.location.href).pathname
      .split("/")[1]
      ?.toLowerCase();
    initialPage.name = pageName && pageNames.has(pageName) ? pageName : entry;
    initialPage.name = initialPage.name ?? "";
    return initialPage;
  });

  const handlePageChanged = useCallback((event) => {
    setPage({
      name: event.detail.name,
      data: event.detail.data,
      query: event.detail.query,
    });
  }, []);
  useEffect(() => {
    window.addEventListener("pagechange", handlePageChanged);
    return () => {
      window.removeEventListener("pagechange", handlePageChanged);
    };
  }, [handlePageChanged]);

  const handleBrowserNavigation = useCallback((event) => {
    const pageState = event.state;
    setPage(pageState);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", handleBrowserNavigation);
    return () => {
      window.removeEventListener("popstate", handleBrowserNavigation);
    };
  }, [handleBrowserNavigation]);

  useEffect(() => {
    const searchParams = new URLSearchParams(Object.entries(page.query ?? []));
    const newURL = new URL(window.location.href);
    newURL.pathname = page.name;
    newURL.search = `?${searchParams.toString()}`;
    window.history.pushState(page, "", newURL);
  }, [page]);

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

export default React.memo(PageSwitch);
