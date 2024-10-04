
// src/MallPathFinder.js
import React, { useState } from 'react';
import "./map.css";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Breadth-First Search to find the shortest path and detect floor changes
const findShortestPathWithFloors = (graph, start, end) => {
  let queue = [[start]];
  let visited = new Set();

  while (queue.length > 0) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node]?.connections || []) {
        if (!visited.has(neighbor)) {
          queue.push([...path, neighbor]);
        }
      }
    }
  }

  return [];
};

// Mall graph remains unchanged
const mallGraph = {
  "Nike": { floor: 0, connections: ["Puma", "Skechers", "Reebok"] },
  "Puma": { floor: 0, connections: ["Nike", "Reebok", "Staircase1", "Skechers"] },
  "Skechers": { floor: 0, connections: ["Nike", "Reebok", "Puma", "Kids Corner"] },
  "Reebok": { floor: 0, connections: ["Skechers", "Burger King"] },
  "Burger King": { floor: 0, connections: ["Kids Corner", "Reebok", "McDonald's", "Staircase1"] },
  "McDonald's": { floor: 0, connections: ["Burger King", "The Concourse", "Staircase1"] },
  "Kids Corner": { floor: 0, connections: ["Burger King", "Cafe Coffee Day", "Plam", "Skechers", "Reebok"] },
  "Cafe Coffee Day": { floor: 0, connections: ["Kids Corner", "Perfume Shop", "Plam", "Burger King"] },
  "Perfume Shop": { floor: 0, connections: ["Plam", "Cafe Coffee Day", "Burger King"] },
  "The Concourse": { floor: 0, connections: ["McDonald's", "Staircase2"] },
  "Maintenance Area": { floor: 0, connections: ["Elevator", "Staircase2"] },
  "Display Area": { floor: 0, connections: ["Elevator"] },
  "Plam": { floor: 0, connections: ["Perfume Shop", "Cafe Coffee Day", "Kids Corner"] },

  // First floor
  "Pantaloons": { floor: 1, connections: ["PepperFry", "RockClimbing1", "Staircase1"] },
  "PepperFry": { floor: 1, connections: ["Pantaloons", "RockClimbing1"] },
  "RockClimbing1": { floor: 1, connections: ["Pantaloons", "PepperFry", "RockClimbing2", "Lifestyle"] },
  "RockClimbing2": { floor: 1, connections: ["RockClimbing1", "Marks & Spencer", "Lifestyle", "ZARA", "Starbucks", "Gucci"] },
  "Marks & Spencer": { floor: 1, connections: ["RockClimbing2", "Gucci"] },
  "Gucci": { floor: 1, connections: ["Marks & Spencer", "Cafe Noir", "Elevator", "RockClimbing2", "Starbucks"] },
  "Cafe Noir": { floor: 1, connections: ["Gucci", "Elevator"] },
  "Lifestyle": { floor: 1, connections: ["Staircase1", "ZARA", "RockClimbing1", "RockClimbing2"] },
  "ZARA": { floor: 1, connections: ["Staircase2", "Lifestyle", "Starbucks", "RockClimbing2"] },
  "Starbucks": { floor: 1, connections: ["ZARA", "Woodland", "RockClimbing2", "Gucci", "Staircase2"] },
  "Woodland": { floor: 1, connections: ["Starbucks", "Elevator", "Staircase2"] },

  // Second floor
  "KFC": { floor: 2, connections: ["Domino's", "Staircase1", "Anchor Store"] },
  "Domino's": { floor: 2, connections: ["Apple Store", "Zodiac", "KFC", "Anchor Store"] },
  "Zodiac": { floor: 2, connections: ["Domino's", "Anchor Store", "Food Stall", "Apple Store"] },
  "Apple Store": { floor: 2, connections: ["Domino's", "Food Stall", "Zodiac"] },
  "Food Stall": { floor: 2, connections: ["Zodiac", "Apple Store", "Anchor Store"] },
  "Anchor Store": { floor: 2, connections: ["Domino's", "Zodiac", "Atrium", "Staircase1", "Food Stall", "KFC"] },
  "Atrium": { floor: 2, connections: ["Anchor Store", "Thriller Room", "Staircase1", "Staircase2", "Washroom"] },
  "Thriller Room": { floor: 2, connections: ["Atrium", "Tanishq", "Washroom", "Titan"] },
  "Tanishq": { floor: 2, connections: ["Thriller Room", "Elevator", "Titan"] },
  "US Polo": { floor: 2, connections: ["Washroom", "Staircase2", "Elevator"] },
  "Washroom": { floor: 2, connections: ["US Polo", "Staircase2", "Elevator", "Atrium", "Titan"] },
  "Titan": { floor: 2, connections: ["Washroom", "Thriller Room", "Tanishq", "Elevator"] },

  //Third Floor
  "KK Cinemas" :{floor: 3, connections:["Fun Land"]},
  "Fun Land" :{floor: 3, connections:["Book Tickets","Elevator","Snacks Counter"]},
  "Book Tickets" :{floor: 3, connections:["Fun Land","Elevator"]},
  "Snacks Counter" :{floor: 3, connections:["Fun Land","Elevator"]},

  // Combined connections between floors
  "Staircase1": { floor: "multi", connections: ["Burger King", "Puma", "Reebok", "McDonald's", "Lifestyle", "Pantaloons", "KFC", "Anchor Store", "Atrium"] },
  "Staircase2": { floor: "multi", connections: ["The Concourse", "Maintenance Area", "ZARA", "Starbucks", "Woodland", "Washroom", "US Polo", "Atrium"] },
  "Elevator": { floor: "multi", connections: ["Maintenance Area", "Display Area", "Woodland", "Gucci", "Cafe Noir", "US Polo", "Washroom", "Tanishq", "Titan"] }
};
const MallPathFinder = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [path, setPath] = useState([]);

  const handleFindPath = () => {
    if (start && end) {
      const shortestPath = findShortestPathWithFloors(mallGraph, start, end);
      setPath(shortestPath);
    }
  };

  return (
    <div className="pathfinder-container" style={{backgroundColor:'#17153B'}}>
      <div className="input-container-mega">
      <h1>Mall Path Finder</h1>
        <div className="input-container">
        <label>
          Start Point:
          <input
            type="text"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            placeholder="Enter Start Point"
          />
        </label>

        <label>
          End Point:
          <input
            type="text"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            placeholder="Enter End Point"
          />
        </label>
        </div>

        <button onClick={handleFindPath} style={{width: '120px'}}>Find Path</button>
      

      {path.length > 0 ? (
        <div className="path-display" style={{marginLeft:'210px',justifyContent:'center'}}>
          <h2>Shortest Path:</h2>
          <ul>
            {path.map((location, index) => {
              const floorChange =
                index > 0 && mallGraph[location].floor !== mallGraph[path[index - 1]].floor;

              return (
                <li key={index}>
                  {location} {floorChange && ` (Floor change: ${mallGraph[location].floor})`}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="no-path">No path found</div>
      )}
      </div>
      <div className="map-1">
      <App />
      </div>
    </div>
  );
};

// Component to load and render the 3D model
function Model() {
  const gltf = useGLTF('mallfinal.glb');
  return <primitive object={gltf.scene} scale={1} />;
}

function App() {
  return (
    <div className="model-container" style={{height:"60vh",width:"100vw",backgroundColor:"#E4B1F0",marginTop:'100px'}}> 
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default MallPathFinder;
