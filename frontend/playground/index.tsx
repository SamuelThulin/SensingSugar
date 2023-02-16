import dynamic from 'next/dynamic';

const MusicBox = dynamic(() => import('./MusicBox'), { ssr: false });

export const Sensing = () => <MusicBox />;
