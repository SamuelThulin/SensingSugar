import MedicationIcon from '@mui/icons-material/Medication';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppState } from '@src/overmind';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Cell = styled(TableCell)(() => ({
  fontSize: '0.775rem',
  lineHeight: '1.1rem',
  border: 'unset',
}));

const DataDrawer: FC = () => {
  const { t } = useTranslation('common');
  const { data, unitGlucose, unitMeal } = useAppState();

  // console.log(data);
  // console.table([...data]);

  return (
    <Box maxWidth={550}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <Cell>{t('timestamp')}</Cell>
            <Cell align="right">
              {t('glucose')} <br /> [{unitGlucose}]
            </Cell>
            {data[0].meal && (
              <Cell align="right">
                {t('meal')} <br /> [{unitMeal}]
              </Cell>
            )}
            {data[0].meal_marker && <Cell>{t('meal_marker')}</Cell>}
            {data[0].medication && <Cell></Cell>}
            {data[0].notes && <Cell></Cell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => {
            const medication = item.medication?.split(',') ?? [];
            return (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <Cell component="th" scope="row">
                  {item.timestamp}
                </Cell>
                <Cell align="right">{item.glucose || '-'}</Cell>
                {data[0].meal && <Cell>{item.meal}</Cell>}
                {data[0].meal_marker && <Cell>{item.meal_marker}</Cell>}
                {data[0].medication && (
                  <Cell>
                    {medication.map((m: string, index: number) => (
                      <MedicationIcon
                        key={index}
                        sx={{ width: 16, height: 16, color: ({ palette }) => palette.grey[500] }}
                      />
                    ))}
                  </Cell>
                )}
                {data[0].notes && (
                  <Cell>
                    {item.notes && (
                      <RateReviewIcon
                        sx={{ width: 16, height: 16, color: ({ palette }) => palette.grey[400] }}
                      />
                    )}
                  </Cell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default DataDrawer;
