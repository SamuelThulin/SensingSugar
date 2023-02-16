import { IData } from '@/@types';
import { useEffect } from 'react';
import * as Sound from './Sound';
import * as Visuals from './Visuals';

type Props = {
	data: IData[];
};

export default function Sensing({ data }: Props) {
	useEffect(() => {
		if (data) {
			Visuals.start();
			Sound.play(data);
		}
	}, [data]);

	return (
		<canvas
			id="visuals"
			width={1280}
			height={1024}
			style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: -1 }}
		/>
	);
}
