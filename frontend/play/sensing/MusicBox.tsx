import type { Data } from '@/@types';
import { useEffect } from 'react';
import type { SensingSugar } from './Sound';
import * as Sound from './Sound';

type Props = {
  data: Data[];
  setSensingSugar: (value: SensingSugar) => void;
};

export default function Sensing({ data, setSensingSugar }: Props) {
  useEffect(() => {
    if (data) init();
  }, [data]);

  const init = async () => {
    const sensingSugar = await Sound.playSquence(data);
    setSensingSugar(sensingSugar);
  };

  return (
    <canvas
      id="visuals"
      width={1280}
      height={1024}
      style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100vw', zIndex: -1 }}
    />
  );
}
