import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Drawer, IconButton, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

const DataDrawer: FC = () => {
  return (
    <Stack width={300} p={2}>
      <Typography>Data Source</Typography>
      <Box>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.675rem'}}>
          "Id";"Category_en_CA";"Category_fr_CA";"Extendable";"Description_en_CA";"Description_fr_CA";"OutputFormat";"Name";"Active";"CreatedDate";"UpdatedDate"
"1";"Date and Time";"French Category Example";"0";"Matches date, time, intervals or date and time together";"French Desciption Example";"String in ISO-8601 format or Object:";"@sys.date-time";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"2";"Date and Time";"French Category Example";"0";"Matches a date";"French Desciption Example";"String in ISO-8601 format";"@sys.date";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"3";"Date and Time";"French Category Example";"0";"Matches a date intervalObject";"French Desciption Example";"Strings in ISO-8601 format";"@sys.date-period";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"4";"Date and Time";"test";"0";"Matches a time";"test";"String in ISO-8601 format";"@sys.time";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"5";"Date and Time";"test";"0";"Matches a time intervalObject";"test";"Strings in ISO-8601 format";"@sys.time-period";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"6";"Numbers";NULL;"1";"Ordinal and cardinal numbers";NULL;"Number";"@sys.number";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"7";"Numbers";NULL;"1";"Cardinal numbers";NULL;"Number";"@sys.cardinal";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"8";"Numbers";NULL;"0";"Ordinal numbers";NULL;"Number";"@sys.ordinal";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"9";"Numbers";NULL;"1";"Matches integers only";NULL;"Number";"@sys.number-integer";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"10";"Numbers";NULL;"1";"Matches number sequences";NULL;"String";"@sys.number-sequence";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
"11";"Numbers";NULL;"1";"Alphanumeric flight numbers";NULL;"String";"@sys.flight-number";"1";"2020-09-15 21:16:21";"2020-09-15 21:16:21"
        </pre>
      </Box>
    </Stack>
  );
};

export default DataDrawer;
