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

    // Create realistic human head wireframe (like the reference image)
    const createHeadGeometry = () => {
      const vertices: number[] = [];
      const indices: number[] = [];
      
      // Head dimensions
      const headWidth = 3;
      const headHeight = 4;
      const headDepth = 3.5;
      
      // Grid resolution for head mesh
      const segmentsH = 24; // horizontal
      const segmentsV = 32; // vertical
      
      // Create head mesh vertices (ellipsoid with face features)
      for (let v = 0; v <= segmentsV; v++) {
        const vRatio = v / segmentsV;
        const phi = vRatio * Math.PI;
        
        for (let h = 0; h <= segmentsH; h++) {
          const hRatio = h / segmentsH;
          const theta = hRatio * Math.PI * 2;
          
          // Base ellipsoid shape
          let x = Math.sin(phi) * Math.cos(theta) * headWidth;
          let y = (Math.cos(phi) - 0.1) * headHeight; // shift down slightly
          let z = Math.sin(phi) * Math.sin(theta) * headDepth;
          
          // Add face features (front side deformation)
          const isFront = Math.cos(theta) > 0;
          if (isFront) {
            const frontFactor = Math.cos(theta);
            
            // Eye sockets
            if (vRatio > 0.35 && vRatio < 0.5 && Math.abs(hRatio - 0.3) < 0.1) {
              z -= 0.3 * frontFactor;
            }
            if (vRatio > 0.35 && vRatio < 0.5 && Math.abs(hRatio - 0.7) < 0.1) {
              z -= 0.3 * frontFactor;
            }
            
            // Nose
            if (vRatio > 0.45 && vRatio < 0.65 && Math.abs(hRatio - 0.5) < 0.08) {
              z += 0.5 * frontFactor;
            }
            
            // Mouth
            if (vRatio > 0.65 && vRatio < 0.75 && Math.abs(hRatio - 0.5) < 0.15) {
              z -= 0.2 * frontFactor;
            }
          }
          
          // Narrow at neck
          if (vRatio > 0.85) {
            const neckFactor = (vRatio - 0.85) / 0.15;
            x *= (1 - neckFactor * 0.4);
            z *= (1 - neckFactor * 0.4);
          }
          
          vertices.push(x, y + 3, z); // offset y by 3
        }
      }
      
      // Create grid indices
      for (let v = 0; v < segmentsV; v++) {
        for (let h = 0; h < segmentsH; h++) {
          const i0 = v * (segmentsH + 1) + h;
          const i1 = i0 + 1;
          const i2 = i0 + (segmentsH + 1);
          const i3 = i2 + 1;
          
          indices.push(i0, i1, i0, i2, i1, i3, i2, i3);
        }
      }
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);
      
      return geometry;
    };

    const headGeometry = createHeadGeometry();
    const headMaterial = new THREE.LineBasicMaterial({
      color: getColor(),
      transparent: true,
      opacity: 0.4,
      linewidth: 1,
    });
    const headWireframe = new THREE.LineSegments(headGeometry, headMaterial);
    scene.add(headWireframe);

    // Create mind-blowing particles system - exploding from head
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const velocities: THREE.Vector3[] = [];
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Brain/top of head position (where particles explode from)
    const headCenter = new THREE.Vector3(0, 5.5, 0);
    const brainRadius = 2.5;

    for (let i = 0; i < particleCount; i++) {
      // Start from brain area (top of head)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5; // upper hemisphere
      const r = Math.random() * brainRadius;
      
      const startPos = new THREE.Vector3(
        headCenter.x + r * Math.sin(phi) * Math.cos(theta),
        headCenter.y + r * Math.cos(phi),
        headCenter.z + r * Math.sin(phi) * Math.sin(theta)
      );

      positions[i * 3] = startPos.x;
      positions[i * 3 + 1] = startPos.y;
      positions[i * 3 + 2] = startPos.z;

      // Explosion velocity - dramatic upward burst
      const explosionForce = 0.4;
      const upwardBias = 0.8;
      
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * explosionForce,
        Math.random() * explosionForce + upwardBias,
        (Math.random() - 0.5) * explosionForce
      ));

      // Varied particle sizes
      sizes[i] = Math.random() * 0.3 + 0.2;

      // Bright grayscale colors
      const gray = Math.random() * 0.4 + 0.6;
      colors[i * 3] = gray;
      colors[i * 3 + 1] = gray;
      colors[i * 3 + 2] = gray;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Create 3D text meshes with marketing/programming words (100 words - doubled!)
    const textMeshes: THREE.Mesh[] = [];
    const words = [
      'SEO', 'MARKETING', 'App', 'Social Media', 'APPLICATION',
      'Web Design', 'DIGITAL', 'advertising', 'Content', 'BRAND',
      'Analytics', 'STRATEGY', 'creative', 'Development', 'CODING',
      'JavaScript', 'REACT', 'NextJS', 'api', 'CLOUD',
      'Database', 'UI/UX', 'mobile', 'Responsive', 'INNOVATION',
      'Growth', 'CONVERSION', 'engagement', 'Organic', 'VIRAL',
      'Campaign', 'DESIGN', 'visual', 'Typography', 'LAYOUT',
      'Pixel', 'VECTOR', 'gradient', 'Motion', 'INTERACTIVE',
      'Dynamic', 'MODERN', 'minimal', 'Bold', 'CREATIVE',
      'Tech', 'CODE', 'startup', 'Scale', 'LAUNCH',
      // Additional 50 words
      'Performance', 'OPTIMIZE', 'automation', 'Intelligence', 'DATA',
      'Machine Learning', 'AI', 'blockchain', 'Crypto', 'METAVERSE',
      'Virtual', 'AUGMENTED', 'reality', 'Experience', 'INTERFACE',
      'Framework', 'LIBRARY', 'component', 'Module', 'PACKAGE',
      'Deploy', 'HOSTING', 'server', 'Backend', 'FRONTEND',
      'Fullstack', 'DEVOPS', 'cicd', 'Testing', 'DEBUG',
      'Algorithm', 'FUNCTION', 'class', 'Object', 'ARRAY',
      'Promise', 'ASYNC', 'await', 'Hook', 'STATE',
      'Props', 'CONTEXT', 'redux', 'Router', 'NAVIGATION',
      'Animation', 'TRANSITION', 'transform', 'Gradient', 'SHADOW'
    ];

    // Various font styles
    const fontStyles = [
      'bold', 'normal', '300', '600', '800', '900'
    ];

    const fontFamilies = [
      'Arial', 'Helvetica', 'Impact', 'Courier New', 'Georgia', 'Verdana', 'Trebuchet MS'
    ];

    // Create canvas-based texture for each word with varied styles
    const createTextTexture = (text: string, fontSize: number, fontWeight: string, fontFamily: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 1024;
      canvas.height = 512;

      context.fillStyle = 'transparent';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      context.fillStyle = getColor() === 0xffffff ? '#ffffff' : '#000000';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    words.forEach((word, index) => {
      // Much larger and more varied font sizes
      const fontSize = Math.random() * 100 + 60; // 60-160px (was 30-70px)
      const fontWeight = fontStyles[Math.floor(Math.random() * fontStyles.length)];
      const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
      const texture = createTextTexture(word, fontSize, fontWeight, fontFamily);
      
      if (texture) {
        // Larger geometry to match larger text
        const baseSize = word.length * 0.8 + 3;
        const sizeMultiplier = 1 + Math.random() * 1.5; // More size variation
        
        const geometry = new THREE.PlaneGeometry(
          baseSize * sizeMultiplier,
          3 * sizeMultiplier,
          1,
          1
        );
        
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60
        );
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        scene.add(mesh);
        textMeshes.push(mesh);
      }
    });

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
      const colorString = newColor === 0xffffff ? '#ffffff' : '#000000';
      
      // Update text meshes
      textMeshes.forEach(mesh => {
        if (mesh.material instanceof THREE.MeshBasicMaterial && mesh.material.map) {
          // Recreate texture with new color
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = 512;
            canvas.height = 256;
            context.fillStyle = 'transparent';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '50px Arial, sans-serif';
            context.fillStyle = colorString;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            // Extract text from existing texture (approximation)
            context.fillText('TEXT', canvas.width / 2, canvas.height / 2);
            const newTexture = new THREE.CanvasTexture(canvas);
            mesh.material.map = newTexture;
            mesh.material.needsUpdate = true;
          }
        }
      });
      
      // Update head wireframe
      if (headMaterial) {
        headMaterial.color.setHex(newColor);
      }
      
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

      // Animate particles - dramatic explosion from brain/head
      const particlePositions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Add velocity (explosion effect)
        particlePositions[i3] += velocities[i].x;
        particlePositions[i3 + 1] += velocities[i].y;
        particlePositions[i3 + 2] += velocities[i].z;

        // Add gravity and air resistance
        velocities[i].y -= 0.008; // stronger gravity
        velocities[i].multiplyScalar(0.98); // air resistance

        // Chaotic turbulence - more dramatic
        const noise = Math.sin(time * 3 + i * 0.1) * 0.015;
        velocities[i].x += (Math.random() - 0.5) * 0.03 + noise;
        velocities[i].z += (Math.random() - 0.5) * 0.03 + noise;

        // Check if particle has fallen too far or gone too far
        const distanceFromHead = Math.sqrt(
          (particlePositions[i3] - headCenter.x) ** 2 +
          (particlePositions[i3 + 1] - headCenter.y) ** 2 +
          (particlePositions[i3 + 2] - headCenter.z) ** 2
        );

        // Respawn from brain if too far or fallen below
        if (distanceFromHead > 60 || particlePositions[i3 + 1] < -25) {
          // Reset to brain/top of head position
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.random() * Math.PI * 0.5;
          const r = Math.random() * brainRadius * 0.3;
          
          particlePositions[i3] = headCenter.x + r * Math.sin(phi) * Math.cos(theta);
          particlePositions[i3 + 1] = headCenter.y + r * Math.cos(phi);
          particlePositions[i3 + 2] = headCenter.z + r * Math.sin(phi) * Math.sin(theta);

          // New dramatic explosion velocity
          const explosionForce = 0.4;
          velocities[i].set(
            (Math.random() - 0.5) * explosionForce,
            Math.random() * explosionForce + 0.8,
            (Math.random() - 0.5) * explosionForce
          );
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Subtle pulse for head wireframe
      const headScale = 1 + Math.sin(time * 1.5) * 0.05;
      headWireframe.scale.set(headScale, headScale, headScale);
      
      // Rotate head slightly for dynamic effect
      headWireframe.rotation.y = Math.sin(time * 0.3) * 0.1;

      // Animate 3D text meshes - floating and rotating
      textMeshes.forEach((mesh, index) => {
        // Smooth rotation
        mesh.rotation.x += 0.005 + Math.sin(time + index) * 0.003;
        mesh.rotation.y += 0.008 + Math.cos(time + index) * 0.005;
        mesh.rotation.z += 0.003;

        // Floating movement
        mesh.position.y += Math.sin(time * 0.5 + index * 0.3) * 0.02;
        mesh.position.x += Math.cos(time * 0.3 + index * 0.2) * 0.02;

        // Pulsing scale
        const scale = 1 + Math.sin(time * 1.5 + index * 0.7) * 0.15;
        mesh.scale.set(scale, scale, scale);

        // Spiral towards center and back
        const spiralRadius = 20 + Math.sin(time * 0.5 + index) * 10;
        const angle = time * 0.3 + index * 0.5;
        const targetX = Math.cos(angle) * spiralRadius;
        const targetZ = Math.sin(angle) * spiralRadius;
        
        mesh.position.x += (targetX - mesh.position.x) * 0.01;
        mesh.position.z += (targetZ - mesh.position.z) * 0.01;
      });

      // Subtle rotation of entire particle system
      particles.rotation.y += 0.0005;

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
      
      headGeometry.dispose();
      headMaterial.dispose();
      
      textMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        const material = mesh.material as THREE.MeshBasicMaterial;
        if (material.map) {
          material.map.dispose();
        }
        material.dispose();
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

