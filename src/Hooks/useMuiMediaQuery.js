import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/system";

function useMuiMediaQuery() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  return {
    sm,
    md,
    lg,
    xl,
  };
}

export default useMuiMediaQuery;
