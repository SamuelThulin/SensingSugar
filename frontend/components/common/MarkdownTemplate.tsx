import { Link, Typography, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';

type Props = {
  content: string;
};

export const MarkdownTemplate = ({ content }: Props) => {
  const { palette } = useTheme();

  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h1"
            mb={4}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="h3"
            {...props}
          />
        ),
        h2: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h2"
            mb={3}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="h4"
            {...props}
          />
        ),
        h3: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h3"
            mb={2.5}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="h5"
            {...props}
          />
        ),
        h4: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h4"
            mb={2}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="h6"
            {...props}
          />
        ),
        h5: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h5"
            mb={1.5}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="subtitle1"
            {...props}
          />
        ),
        h6: ({ node, ...props }) => (
          <Typography
            align="center"
            color={palette.secondary.main}
            component="h6"
            mb={1}
            sx={{ '::selection': { bgcolor: palette.primary.dark } }}
            variant="subtitle2"
            {...props}
          />
        ),
        p: ({ node, ...props }) => (
          <Typography
            my={1}
            sx={{ '::selection': { bgcolor: palette.secondary.dark } }}
            variant="body1"
            {...props}
          />
        ),
        a: ({ node, ...props }) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
