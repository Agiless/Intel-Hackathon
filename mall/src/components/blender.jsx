import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Component to load and render the 3D model
function Model() {
  const gltf = useGLTF('mall6.glb'); // Path to your .glb file in public folder
  return <primitive object={gltf.scene} scale={0.5} />;
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model />
        <OrbitControls />  {/* Allows you to move around the model */}
      </Canvas>
    </div>
  );
}

export default App;
