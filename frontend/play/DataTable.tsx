import { IData } from '@/@types';
import MedicationIcon from '@mui/icons-material/Medication';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

type Props = {
	data: IData[];
};

const Cell = styled(TableCell)(() => ({
	fontSize: '0.775rem',
	lineHeight: '1.1rem',
	border: 'unset',
}));

export const DataTable = ({ data }: Props) => {
	const { t } = useTranslation('common');
	const { palette } = useTheme();

	const unitGlucose = 'mmol';
	const unitMeal = 'meals';

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
												sx={{ width: 16, height: 16, color: palette.grey[500] }}
											/>
										))}
									</Cell>
								)}
								{data[0].notes && (
									<Cell>
										{item.notes && (
											<RateReviewIcon sx={{ width: 16, height: 16, color: palette.grey[400] }} />
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
