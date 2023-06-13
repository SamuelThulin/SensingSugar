import { Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export const CodeRepo = () => (
  <Stack alignItems="center" py={4} spacing={3} sx={{ mixBlendMode: 'plus-lighter' }}>
    <Link href="https://github.com/SamuelThulin/SensingSugar" target="_blank">
      <Image alt="GitHub" src="/images/code/github.png" width={40} height={40} />
    </Link>
    <Link href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">
      <Image alt="cc-by-nc" src="/images/code/cc-by-nc.png" width={66} height={20} />
    </Link>
  </Stack>
);
