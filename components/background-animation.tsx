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


    // Create 3D text meshes with marketing/programming words (100 words - doubled!)
    const textMeshes: THREE.Mesh[] = [];
    // Store word data for theme changes
    const wordData: Array<{mesh: THREE.Mesh, text: string, fontSize: number, fontWeight: string, fontFamily: string}> = [];
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
      const fontSize = Math.random() * 100 + 60; // 60-160px
      const fontWeight = fontStyles[Math.floor(Math.random() * fontStyles.length)];
      const fontFamily = fontFamilies[Math.floor(Math.random() * fontFamilies.length)];
      const texture = createTextTexture(word, fontSize, fontWeight, fontFamily);
      
      if (texture) {
        // Larger geometry to match larger text
        const baseSize = word.length * 0.8 + 3;
        const sizeMultiplier = 1 + Math.random() * 1.5;
        
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
        
        // Store word data for theme changes
        wordData.push({
          mesh,
          text: word,
          fontSize,
          fontWeight,
          fontFamily
        });
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
      
      // Recreate all text textures with new color
      wordData.forEach(data => {
        const newTexture = createTextTexture(data.text, data.fontSize, data.fontWeight, data.fontFamily);
        if (newTexture && data.mesh.material instanceof THREE.MeshBasicMaterial) {
          if (data.mesh.material.map) {
            data.mesh.material.map.dispose();
          }
          data.mesh.material.map = newTexture;
          data.mesh.material.needsUpdate = true;
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

