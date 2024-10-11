import Paper, { type PaperProps } from "@mui/material/Paper";

const CustomPaper = <C extends React.ElementType>({
  children,
  sx,
  ...props
}: PaperProps<C, { component?: C }>) => {
  return (
    <Paper
      sx={{
        px: 2,
        py: 1,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default CustomPaper;
