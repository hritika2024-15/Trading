import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeTerminalCanvas = ({ variant = "terminal" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.002);

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 14, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // 2. 3D Holographic Particle Wave Matrix (Market Fluidity)
    const cols = variant === "login" ? 70 : 60;
    const rows = variant === "login" ? 70 : 60;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cCyan = new THREE.Color(0x0284c7);
    const cPurple = new THREE.Color(0x6366f1);
    const cEmerald = new THREE.Color(0x10b981);

    let idx = 0;
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < rows; iz++) {
        const x = (ix - cols / 2) * 1.6;
        const z = (iz - rows / 2) * 1.6;
        positions[idx * 3] = x;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = z;

        const factor = Math.sin((ix / cols) * Math.PI) * Math.cos((iz / rows) * Math.PI);
        const c = factor > 0.35 ? cCyan : factor > 0 ? cPurple : cEmerald;

        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;

        idx++;
      }
    }

    const gridGeometry = new THREE.BufferGeometry();
    gridGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    gridGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const gridMaterial = new THREE.PointsMaterial({
      size: variant === "login" ? 0.38 : 0.28,
      vertexColors: true,
      transparent: true,
      opacity: variant === "login" ? 0.75 : 0.45,
      blending: THREE.AdditiveBlending,
    });

    const waveMesh = new THREE.Points(gridGeometry, gridMaterial);
    waveMesh.position.y = -10;
    scene.add(waveMesh);

    // 3. Central Hologram Core (Only in Login or ambient in terminal)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, variant === "login" ? 2 : 6, 0);

    const geo1 = new THREE.IcosahedronGeometry(variant === "login" ? 10 : 7, 1);
    const mat1 = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: variant === "login" ? 0.35 : 0.18,
    });
    const mesh1 = new THREE.Mesh(geo1, mat1);
    coreGroup.add(mesh1);

    const geo2 = new THREE.OctahedronGeometry(variant === "login" ? 6 : 4, 1);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: variant === "login" ? 0.45 : 0.22,
    });
    const mesh2 = new THREE.Mesh(geo2, mat2);
    coreGroup.add(mesh2);

    scene.add(coreGroup);

    // 4. Mouse movement tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.04;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.04;
    };

    window.addEventListener("mousemove", onMouseMove);

    // 5. Resize handler
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // 6. Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.4;
      camera.position.y = 14 - targetY * 0.2;
      camera.lookAt(0, 2, 0);

      // Undulate 3D grid
      const posArr = gridGeometry.attributes.position.array;
      let p = 0;
      for (let ix = 0; ix < cols; ix++) {
        for (let iz = 0; iz < rows; iz++) {
          const u = ix * 0.22 + elapsed * 1.1;
          const v = iz * 0.22 + elapsed * 0.8;
          posArr[p * 3 + 1] =
            Math.sin(u) * 2.2 + Math.cos(v) * 1.8 + Math.sin((u + v) * 0.4) * 1.2;
          p++;
        }
      }
      gridGeometry.attributes.position.needsUpdate = true;

      // Rotate geometric cores
      mesh1.rotation.x = elapsed * 0.2;
      mesh1.rotation.y = elapsed * 0.25;

      mesh2.rotation.x = -elapsed * 0.35;
      mesh2.rotation.y = -elapsed * 0.4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      geo1.dispose();
      mat1.dispose();
      geo2.dispose();
      mat2.dispose();
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
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

export default ThreeTerminalCanvas;
