import { Link, Typography, useTheme } from '@mui/material';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

export const MarkdownTemplate = ({ content }: Props) => {
  const { palette } = useTheme();

  return (
    <ReactMarkdown
      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h1: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h2: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h3: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h4: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h5: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        h6: ({ node, ref, ...props }) => (
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        p: ({ node, ref, ...props }) => (
          <Typography
            my={1}
            sx={{ '::selection': { bgcolor: palette.secondary.dark } }}
            variant="body1"
            {...props}
          />
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        a: ({ node, ref, ...props }) => (
          <Link underline="hover" target="_blank" rel="noopener noreferrer" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
