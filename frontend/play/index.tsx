import { Box, CircularProgress, Drawer } from '@mui/material';
import { DataTable } from './DataTable';
import { Sensing } from './sensing';
import { useSugar } from './useSugar';

type Props = {
	showData: boolean;
	toggleShowData: (value: boolean) => void;
};

export const PlayFrontend = ({ showData, toggleShowData }: Props) => {
	const { data, loading } = useSugar();

	return (
		<Box>
			{loading && (
				<Box display="flex" width="100vw" height="100vh" alignItems="center" justifyContent="center">
					<CircularProgress size={200} sx={{ filter: 'blur(20px)' }} />
				</Box>
			)}
			{data && !loading && (
				<Box>
					<Sensing data={data} />
					{showData && (
						<Drawer anchor="right" open={showData} onClose={() => toggleShowData(false)}>
							<DataTable data={data} />
						</Drawer>
					)}
				</Box>
			)}
		</Box>
	);
};
