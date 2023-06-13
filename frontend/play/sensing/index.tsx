import type { Data } from '@/@types';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import type { SensingSugar } from './Sound';

type Props = {
  data: Data[];
  setSensingSugar: (value: SensingSugar) => void;
};

const MusicBox: ComponentType<Props> = dynamic(() => import('./MusicBox'), { ssr: false });

export const Sensing = ({ data, setSensingSugar }: Props) => (
  <MusicBox {...{ data, setSensingSugar }} />
);
