import { IData } from '@/@types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

type Props = {
	data: IData[];
};

const MusicBox: ComponentType<Props> = dynamic(() => import('./MusicBox'), { ssr: false });

export const Sensing = ({ data }: Props) => <MusicBox data={data} />;
