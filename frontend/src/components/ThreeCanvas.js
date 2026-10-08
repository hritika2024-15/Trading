import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.0018);

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 15, 45);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 2. Futuristic Wave Grid of Particles (Market Data Grid)
    const gridCols = 80;
    const gridRows = 80;
    const numParticles = gridCols * gridRows;
    const positions = new Float32Array(numParticles * 3);
    const colors = new Float32Array(numParticles * 3);

    const color1 = new THREE.Color(0x0284c7); // Vibrant Azure
    const color2 = new THREE.Color(0x6366f1); // Electric Indigo
    const color3 = new THREE.Color(0x10b981); // Emerald Green

    let i = 0;
    for (let ix = 0; ix < gridCols; ix++) {
      for (let iz = 0; iz < gridRows; iz++) {
        const x = (ix - gridCols / 2) * 1.5;
        const z = (iz - gridRows / 2) * 1.5;
        const y = 0;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mixRatio = Math.sin((ix / gridCols) * Math.PI) * Math.cos((iz / gridRows) * Math.PI);
        const c = mixRatio > 0.3 ? color1 : mixRatio > 0 ? color2 : color3;

        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;

        i++;
      }
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    gridGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const gridMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(gridGeometry, gridMaterial);
    particleSystem.position.y = -12;
    scene.add(particleSystem);

    // 3. Central Holographic Quantum Core
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 4, 0);

    // Outer wireframe cage
    const icoGeom = new THREE.IcosahedronGeometry(11, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const icosahedron = new THREE.Mesh(icoGeom, icoMat);
    coreGroup.add(icosahedron);

    // Second counter-rotating cage
    const innerGeom = new THREE.OctahedronGeometry(7, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    // Glowing center sphere
    const glowGeom = new THREE.SphereGeometry(3.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.35,
      wireframe: false,
    });
    const glowSphere = new THREE.Mesh(glowGeom, glowMat);
    coreGroup.add(glowSphere);

    // Orbiting Candlestick Node rings
    const ringCount = 3;
    const rings = [];
    for (let r = 0; r < ringCount; r++) {
      const ringGeom = new THREE.TorusGeometry(14 + r * 3, 0.05, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0x0284c7 : 0x10b981,
        transparent: true,
        opacity: 0.3,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 2 + (r * Math.PI) / 6;
      ringMesh.rotation.y = (r * Math.PI) / 4;
      coreGroup.add(ringMesh);
      rings.push(ringMesh);
    }

    scene.add(coreGroup);

    // 4. Mouse movement interpolation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Window resize handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.5;
      camera.position.y = 15 - targetY * 0.3;
      camera.lookAt(0, 2, 0);

      // Undulate particle wave grid (simulating market fluctuations)
      const posArray = gridGeometry.attributes.position.array;
      let pIdx = 0;
      for (let ix = 0; ix < gridCols; ix++) {
        for (let iz = 0; iz < gridRows; iz++) {
          const u = ix * 0.2 + elapsedTime * 1.2;
          const v = iz * 0.2 + elapsedTime * 0.9;
          posArray[pIdx * 3 + 1] =
            Math.sin(u) * 2.5 + Math.cos(v) * 2.0 + Math.sin((u + v) * 0.5) * 1.5;
          pIdx++;
        }
      }
      gridGeometry.attributes.position.needsUpdate = true;

      // Rotate quantum holographic core
      icosahedron.rotation.x = elapsedTime * 0.25;
      icosahedron.rotation.y = elapsedTime * 0.35;

      innerCore.rotation.x = -elapsedTime * 0.45;
      innerCore.rotation.y = -elapsedTime * 0.55;

      rings.forEach((ring, idx) => {
        ring.rotation.z = elapsedTime * (0.2 + idx * 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      icoGeom.dispose();
      icoMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeCanvas;
