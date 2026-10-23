'use client';

import dynamic from 'next/dynamic';

// Three.js is client-only and heavy: load it on demand, never on the server.
const StackGraph = dynamic(() => import('@/components/motion/StackGraph'), { ssr: false });

export default StackGraph;
