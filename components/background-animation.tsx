"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Get theme-aware color
    const getColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 0xffffff : 0x000000;
    };

    // Create mind-blowing particles system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Random sphere distribution
      const radius = Math.random() * 20 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      ));

      // Grayscale colors
      const gray = Math.random();
      colors[i * 3] = gray;
      colors[i * 3 + 1] = gray;
      colors[i * 3 + 2] = gray;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create complex geometric shapes
    const shapes: THREE.Mesh[] = [];
    const shapeCount = 50;

    for (let i = 0; i < shapeCount; i++) {
      let geometry;
      const type = Math.floor(Math.random() * 5);
      
      switch(type) {
        case 0:
          geometry = new THREE.IcosahedronGeometry(Math.random() * 2 + 0.5, 0);
          break;
        case 1:
          geometry = new THREE.OctahedronGeometry(Math.random() * 2 + 0.5, 0);
          break;
        case 2:
          geometry = new THREE.TetrahedronGeometry(Math.random() * 2 + 0.5, 0);
          break;
        case 3:
          geometry = new THREE.TorusGeometry(Math.random() * 1.5 + 0.5, 0.3, 8, 16);
          break;
        default:
          geometry = new THREE.BoxGeometry(Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5);
      }

      const material = new THREE.MeshBasicMaterial({
        color: getColor(),
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    
    for (let i = 0; i < 200; i++) {
      linePositions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
    }
    
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: getColor(),
      transparent: true,
      opacity: 0.2,
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);


    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Theme change observer
    const observer = new MutationObserver(() => {
      const newColor = getColor();
      
      // Update shapes
      shapes.forEach(shape => {
        if (shape.material instanceof THREE.MeshBasicMaterial) {
          shape.material.color.setHex(newColor);
        }
      });
      
      // Update lines
      if (lineMaterial) {
        lineMaterial.color.setHex(newColor);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Animate particles - chaotic movement
      const particlePositions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Add velocity
        particlePositions[i3] += velocities[i].x;
        particlePositions[i3 + 1] += velocities[i].y;
        particlePositions[i3 + 2] += velocities[i].z;

        // Chaotic forces
        const noise = Math.sin(time + i * 0.1) * 0.02;
        velocities[i].x += (Math.random() - 0.5) * 0.01 + noise;
        velocities[i].y += (Math.random() - 0.5) * 0.01 + noise;
        velocities[i].z += (Math.random() - 0.5) * 0.01 + noise;

        // Boundary check - respawn
        const distance = Math.sqrt(
          particlePositions[i3] ** 2 +
          particlePositions[i3 + 1] ** 2 +
          particlePositions[i3 + 2] ** 2
        );

        if (distance > 40) {
          const radius = Math.random() * 10 + 5;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI;
          
          particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
          particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          particlePositions[i3 + 2] = radius * Math.cos(phi);

          velocities[i].set(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
          );
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Animate shapes - crazy rotations
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01 + Math.sin(time + index) * 0.01;
        shape.rotation.y += 0.01 + Math.cos(time + index) * 0.01;
        shape.rotation.z += 0.005 + Math.sin(time * 2 + index) * 0.005;

        // Pulsing scale
        const scale = 1 + Math.sin(time * 2 + index * 0.5) * 0.3;
        shape.scale.set(scale, scale, scale);

        // Orbital movement
        const orbitRadius = 15 + index * 0.5;
        shape.position.x += Math.sin(time * 0.5 + index) * 0.05;
        shape.position.y += Math.cos(time * 0.5 + index) * 0.05;
        shape.position.z += Math.sin(time * 0.3 + index) * 0.03;
      });

      // Rotate entire particle system
      particles.rotation.y += 0.001;
      particles.rotation.x += 0.0005;

      // Animate lines
      lines.rotation.x += 0.002;
      lines.rotation.y += 0.003;

      // Camera movement - wild
      camera.position.x = Math.sin(time * 0.3) * 5 + mouseRef.current.x * 10;
      camera.position.y = Math.cos(time * 0.2) * 5 + mouseRef.current.y * 10;
      camera.position.z = 30 + Math.sin(time * 0.5) * 5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        if (shape.material instanceof THREE.Material) {
          shape.material.dispose();
        }
      });
      
      lineGeometry.dispose();
      lineMaterial.dispose();
      
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: "none" }}
    />
  );
}

