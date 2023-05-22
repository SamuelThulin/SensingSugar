import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material';
import * as Sound from './Sound';
//import * as Sound from './Sound_v1';
import * as Visuals from './Visuals';

export default function MusicBox() {
	const handlePlaySimple = () => Sound.playSimple();
	const handlePlayTime = () => Sound.playTimeControl();
	const handlePlaySequence = () => Sound.playSquence();
	const handlePlayScheduling = () => Sound.playScheduling();
	const handlePlayInstrument = () => Sound.playInstruments();
	const handlePlaySamples = () => Sound.playSamples();
	const handlePlaySampler = () => Sound.playSampler();
	const handlePlayEffects = () => Sound.playEffectts();
	const handlePlaySignal = () => Sound.playSignal();

	const handleStartHydra = () => Visuals.start();
	const handlefx1 = () => Visuals.fx1();
	const handlefx2 = () => Visuals.fx2();

	return (
		<Stack alignItems="center" gap={4}>
			<Stack alignItems="flex-start" justifyContent="center" gap={2}>
				{/* <Typography >
					Tone JS
				</Typography> */}
				<ButtonGroup variant="outlined" aria-label="outlined button group">
					{/* <Button color="inherit" onClick={handlePlaySimple}>
						Simple
					</Button>
					<Button color="inherit" onClick={handlePlayTime}>
						Time
					</Button> */}
					<Button color="inherit" onClick={handlePlaySequence}>
						Sequence
					</Button>
					{/* <Button color="inherit" onClick={handlePlayScheduling}>
						Scheduling
					</Button>
					<Button color="inherit" onClick={handlePlayInstrument}>
						Instrument
					</Button>
					<Button color="inherit" onClick={handlePlaySamples}>
						Samples
					</Button>
					<Button color="inherit" onClick={handlePlaySampler}>
						Sampler
					</Button>
					<Button color="inherit" onClick={handlePlayEffects}>
						Effects
					</Button>
					<Button color="inherit" onClick={handlePlaySignal}>
						Signal
					</Button> */}
				</ButtonGroup>
			</Stack>
			 <Stack justifyContent="center" gap={2}>
				{/* <Typography align="center" color="secondary" component="h2" variant="h4">
					Hydra
				</Typography>
				<Box margin="auto">
					<Button color="inherit" onClick={handleStartHydra} variant="outlined">
						Start
					</Button>
				</Box>
				<Box margin="auto">
					<ButtonGroup variant="outlined" aria-label="outlined button group">
						<Button color="inherit" onClick={handlefx1}>
							fx1
						</Button>
						<Button color="inherit" onClick={handlefx2}>
							fx2
						</Button>
					</ButtonGroup>
				</Box> */}
				<canvas
					id="visuals"
					width={1280}
					height={1024}
					style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: -1 }}
				/>
			</Stack> 
		</Stack>
	);
}
