"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Point {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
}

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
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Drawing system - like pen sketching
    const lines: THREE.Line[] = [];
    const maxLines = 150;
    let currentPhase = 0; // 0: face, 1: explosion, 2: new objects
    let phaseProgress = 0;
    const points: Point[] = [];
    
    // Get theme-aware color
    const getLineColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 0xffffff : 0x000000;
    };

    // Create face-like sketch (enlarged)
    const createFaceSketch = () => {
      const facePoints: THREE.Vector3[] = [];
      const scale = 2; // 2배 확대
      
      // Head outline (circle with noise)
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const noise = Math.random() * 0.3;
        const radius = (3 + noise) * scale;
        facePoints.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius + 1 * scale,
            0
          )
        );
      }
      
      // Eyes (sketchy circles)
      for (let eye = 0; eye < 2; eye++) {
        const xOffset = (eye === 0 ? -1.2 : 1.2) * scale;
        for (let i = 0; i < 25; i++) {
          const angle = (i / 25) * Math.PI * 2;
          const radius = 0.4 * scale;
          facePoints.push(
            new THREE.Vector3(
              Math.cos(angle) * radius + xOffset,
              Math.sin(angle) * radius + 1.5 * scale,
              0
            )
          );
        }
      }
      
      // Mouth (sketchy curve)
      for (let i = 0; i < 40; i++) {
        const t = i / 39;
        const x = (t - 0.5) * 3 * scale;
        const y = (-Math.pow((t - 0.5) * 3, 2) * 0.3 - 1) * scale;
        facePoints.push(new THREE.Vector3(x, y, 0));
      }
      
      // Nose (simple line)
      for (let i = 0; i < 15; i++) {
        facePoints.push(new THREE.Vector3(0, (1.5 - i * 0.15) * scale, 0));
      }
      
      return facePoints;
    };

    // Create explosion particles (more and larger)
    const createExplosion = (center: THREE.Vector3) => {
      const particles: Point[] = [];
      for (let i = 0; i < 300; i++) {
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5
        );
        particles.push({
          position: center.clone(),
          velocity: velocity,
          life: 1.0,
          maxLife: Math.random() * 60 + 60,
        });
      }
      return particles;
    };

    // Create abstract objects (geometric chaos) - larger
    const createAbstractObject = () => {
      const abstractPoints: THREE.Vector3[] = [];
      const shapes = Math.floor(Math.random() * 3);
      const scale = 1.5; // 1.5배 확대
      
      switch (shapes) {
        case 0: // Spiral
          for (let i = 0; i < 120; i++) {
            const t = i / 120;
            const angle = t * Math.PI * 8;
            const radius = t * 6 * scale;
            abstractPoints.push(
              new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                t * 3 - 1.5
              )
            );
          }
          break;
        case 1: // Chaotic polygon
          const sides = Math.floor(Math.random() * 5) + 6;
          for (let i = 0; i < sides * 4; i++) {
            const angle = (i / sides) * Math.PI * 2;
            const radius = (2 + Math.random() * 4) * scale;
            abstractPoints.push(
              new THREE.Vector3(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                Math.random() * 3 - 1.5
              )
            );
          }
          break;
        case 2: // Random mesh
          for (let i = 0; i < 100; i++) {
            abstractPoints.push(
              new THREE.Vector3(
                (Math.random() * 10 - 5) * scale,
                (Math.random() * 10 - 5) * scale,
                (Math.random() * 5 - 2.5) * scale
              )
            );
          }
          break;
      }
      
      return abstractPoints;
    };

    // Draw sketchy line between points (thicker and more visible)
    const drawLine = (points: THREE.Vector3[], opacity: number = 1) => {
      if (points.length < 2) return;
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: getLineColor(),
        opacity: opacity * 0.8, // 0.3 → 0.8 (훨씬 더 진하게)
        transparent: true,
        linewidth: 2, // 1 → 2 (더 두껍게)
      });
      
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
      
      // Remove old lines (keep more lines visible)
      if (lines.length > maxLines) {
        const oldLine = lines.shift();
        if (oldLine) {
          scene.remove(oldLine);
          oldLine.geometry.dispose();
          if (oldLine.material instanceof THREE.Material) {
            oldLine.material.dispose();
          }
        }
      }
    };

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
      // Update all line colors when theme changes
      lines.forEach(line => {
        if (line.material instanceof THREE.LineBasicMaterial) {
          line.material.color.setHex(getLineColor());
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animation loop
    let frameCount = 0;
    const animate = () => {
      frameCount++;
      phaseProgress += 0.005;

      // Phase transitions
      if (phaseProgress > 1) {
        phaseProgress = 0;
        currentPhase = (currentPhase + 1) % 3;
        
        // Clear some lines between phases
        while (lines.length > 20) {
          const oldLine = lines.shift();
          if (oldLine) {
            scene.remove(oldLine);
            oldLine.geometry.dispose();
            if (oldLine.material instanceof THREE.Material) {
              oldLine.material.dispose();
            }
          }
        }
      }

      // Draw based on current phase
      if (frameCount % 3 === 0) {
        switch (currentPhase) {
          case 0: // Drawing face
            if (phaseProgress < 0.8) {
              const facePoints = createFaceSketch();
              const startIdx = Math.floor(phaseProgress * facePoints.length * 1.2);
              const endIdx = Math.min(startIdx + 8, facePoints.length); // 5 → 8 (더 많은 포인트)
              if (startIdx < facePoints.length) {
                drawLine(facePoints.slice(startIdx, endIdx), 1 - phaseProgress * 0.2); // 페이드 아웃 느리게
              }
            }
            break;
            
          case 1: // Explosion
            if (points.length === 0 && phaseProgress < 0.1) {
              points.push(...createExplosion(new THREE.Vector3(0, 0, 0)));
            }
            
            // Update and draw explosion particles
            const particleLines: THREE.Vector3[][] = [];
            for (let i = points.length - 1; i >= 0; i--) {
              const p = points[i];
              p.position.add(p.velocity);
              p.velocity.multiplyScalar(0.98);
              p.life--;
              
              if (p.life <= 0) {
                points.splice(i, 1);
              } else {
                // Create trails (longer and more visible)
                const trail = [
                  p.position.clone(),
                  p.position.clone().add(p.velocity.clone().multiplyScalar(5)) // 3 → 5 (더 긴 트레일)
                ];
                particleLines.push(trail);
              }
            }
            
            if (frameCount % 2 === 0 && particleLines.length > 0) {
              const randomTrail = particleLines[Math.floor(Math.random() * particleLines.length)];
              drawLine(randomTrail, 0.8); // 0.5 → 0.8 (더 진하게)
            }
            break;
            
          case 2: // Abstract objects
            if (frameCount % 4 === 0) { // 5 → 4 (더 자주 그리기)
              const abstractPoints = createAbstractObject();
              const chunkSize = 12; // 10 → 12 (더 긴 선)
              for (let i = 0; i < abstractPoints.length - chunkSize; i += chunkSize) {
                const chunk = abstractPoints.slice(i, i + chunkSize);
                // Add rotation and position offset
                const offset = new THREE.Vector3(
                  Math.sin(phaseProgress * Math.PI * 2) * 2,
                  Math.cos(phaseProgress * Math.PI * 2) * 2,
                  0
                );
                const rotatedChunk = chunk.map(p => {
                  const rotated = p.clone();
                  rotated.applyAxisAngle(new THREE.Vector3(0, 0, 1), phaseProgress * Math.PI);
                  rotated.add(offset);
                  return rotated;
                });
                drawLine(rotatedChunk, 1 - phaseProgress * 0.5); // 페이드 아웃 느리게
              }
            }
            break;
        }
      }

      // Camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Subtle rotation for all lines
      lines.forEach((line, idx) => {
        line.rotation.z += 0.001 * (idx % 2 === 0 ? 1 : -1);
      });

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
      lines.forEach((line) => {
        line.geometry.dispose();
        if (line.material instanceof THREE.Material) {
          line.material.dispose();
        }
      });
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-60 dark:opacity-50"
      style={{ pointerEvents: "none" }}
    />
  );
}

