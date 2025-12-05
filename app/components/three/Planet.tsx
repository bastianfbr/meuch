"use client";

import React, { useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TreePine, Home, Building2 } from "lucide-react";

interface LegendItemProps {
  icon: React.ElementType;
  label: string;
  percentage: number;
  color: string;
}

const LegendItem: React.FC<LegendItemProps> = ({
  icon: Icon,
  label,
  percentage,
  color,
}) => (
  <div className="flex items-center gap-1.5">
    <Icon size={14} style={{ color }} />
    <span className="text-xs text-slate-300">{label}</span>
    <span className="text-xs font-bold" style={{ color }}>
      {percentage}%
    </span>
  </div>
);

interface PlanetProps {
  treeDensity?: number;
  houseDensity?: number;
  buildingDensity?: number;
  totalItems?: number;
  isDragging?: boolean;
}

export const Planet: React.FC<PlanetProps> = ({
  treeDensity = 0.5,
  houseDensity = 0.3,
  buildingDensity = 0.2,
  totalItems = 200,
  isDragging = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{
    trees: THREE.Group[];
    houses: THREE.Group[];
    buildings: THREE.Group[];
  }>({ trees: [], houses: [], buildings: [] });

  // Initialize scene only once
  useEffect(() => {
    const PLANET_RADIUS = 25;
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 85);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.minDistance = 40;
    controls.maxDistance = 150;

    const dirLight = new THREE.DirectionalLight(0xffd4a3, 2.0);
    dirLight.position.set(50, 50, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    // Fill light for dark side
    const fillLight = new THREE.DirectionalLight(0x9333ea, 1.0);
    fillLight.position.set(-50, -30, -50);
    scene.add(fillLight);

    const geometryPlanet = new THREE.IcosahedronGeometry(PLANET_RADIUS, 4);

    const materialPlanet = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.7,
      metalness: 0.1,
      flatShading: true,
    });

    const planet = new THREE.Mesh(geometryPlanet, materialPlanet);
    planet.receiveShadow = true;
    scene.add(planet);

    const planetWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometryPlanet),
      new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.05,
      })
    );
    planet.add(planetWireframe);

    const createModernTree = () => {
      const group = new THREE.Group();
      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.4, 1.2, 6),
        new THREE.MeshStandardMaterial({
          color: 0x475569,
          roughness: 0.9,
        })
      );
      trunk.position.y = 0.6;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      group.add(trunk);

      const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(1.2, 3, 6),
        new THREE.MeshStandardMaterial({
          color: 0x4ade80,
          flatShading: true,
          emissive: 0x4ade80,
          emissiveIntensity: 0.2,
          roughness: 0.7,
        })
      );
      leaves.position.y = 2.1;
      leaves.rotateY(Math.random() * Math.PI);
      leaves.castShadow = true;
      leaves.receiveShadow = true;
      group.add(leaves);
      return group;
    };

    const createModernHouse = () => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.8, 1.5, 1.8),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.6,
          metalness: 0.1,
        })
      );
      base.position.y = 0.75;
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      const roofColor = Math.random() > 0.5 ? 0xfb923c : 0xea580c;
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(1.6, 1.2, 5),
        new THREE.MeshStandardMaterial({
          color: roofColor,
          flatShading: true,
          emissive: roofColor,
          emissiveIntensity: 0.2,
          roughness: 0.8,
        })
      );
      roof.position.y = 2.1;
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      roof.receiveShadow = true;
      group.add(roof);
      return group;
    };

    const createModernBuilding = () => {
      const height = 2.5 + Math.random() * 4;
      const group = new THREE.Group();
      const building = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, height, 1.2),
        new THREE.MeshStandardMaterial({
          color: 0x60a5fa,
          flatShading: true,
          emissive: 0x60a5fa,
          emissiveIntensity: 0.1,
          roughness: 0.4,
          metalness: 0.5,
        })
      );
      building.position.y = height / 2;
      building.castShadow = true;
      building.receiveShadow = true;
      group.add(building);

      const roofLight = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 0.1, 0.8),
        new THREE.MeshBasicMaterial({ color: 0xdbeafe })
      );
      roofLight.position.y = height + 0.05;
      group.add(roofLight);
      return group;
    };

    const createCloud = () => {
      const group = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85,
        flatShading: true,
        roughness: 1.0,
      });

      const puffs = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < puffs; i++) {
        const puff = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.6 + Math.random() * 0.8, 0),
          mat
        );
        puff.position.set(
          (Math.random() - 0.5) * 4.0,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 3.0
        );
        group.add(puff);
      }
      return group;
    };

    const placeOnSphere = (
      object: THREE.Group,
      radius: number,
      phi: number,
      theta: number
    ) => {
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      object.position.set(x, y, z);
      object.lookAt(0, 0, 0);
      object.rotateX(-Math.PI / 2);
      object.rotateY(Math.random() * Math.PI * 2);
    };

    const numTrees = totalItems;
    const numHouses = totalItems;
    const numBuildings = totalItems;

    const trees: THREE.Group[] = [];
    const houses: THREE.Group[] = [];
    const buildings: THREE.Group[] = [];

    // Create all trees
    for (let i = 0; i < numTrees; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const item = createModernTree();
      const s = 0.5 + Math.random() * 0.6;
      item.scale.set(0, 0, 0); // Start hidden
      item.userData.baseScale = s;
      item.visible = false;
      scene.add(item);
      placeOnSphere(item, PLANET_RADIUS, phi, theta);
      trees.push(item);
    }

    // Create all houses
    for (let i = 0; i < numHouses; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const item = createModernHouse();
      const s = 0.6 + Math.random() * 0.4;
      item.scale.set(0, 0, 0); // Start hidden
      item.userData.baseScale = s;
      item.visible = false;
      scene.add(item);
      placeOnSphere(item, PLANET_RADIUS, phi, theta);
      houses.push(item);
    }

    // Create all buildings
    for (let i = 0; i < numBuildings; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const item = createModernBuilding();
      const s = 0.7 + Math.random() * 0.5;
      item.scale.set(0, 0, 0); // Start hidden
      item.userData.baseScale = s;
      item.visible = false;
      scene.add(item);
      placeOnSphere(item, PLANET_RADIUS, phi, theta);
      buildings.push(item);
    }

    // Store references
    itemsRef.current = { trees, houses, buildings };

    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    for (let i = 0; i < 15; i++) {
      const cloud = createCloud();
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const altitude = PLANET_RADIUS + 2 + Math.random() * 3;

      placeOnSphere(cloud, altitude, phi, theta);

      // Start clouds invisible and animate them in
      cloud.scale.set(0, 0, 0);
      cloud.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = 0;
        }
      });

      cloudGroup.add(cloud);

      // Animate cloud appearance with delay
      const delay = i * 50; // Stagger animation
      setTimeout(() => {
        const startTime = Date.now();
        const duration = 800;

        const animateCloud = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);

          cloud.scale.set(eased, eased, eased);
          cloud.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material.transparent) {
              child.material.opacity = 0.85 * eased;
            }
          });

          if (progress < 1) {
            requestAnimationFrame(animateCloud);
          }
        };

        animateCloud();
      }, delay);
    }

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      cloudGroup.rotation.y += 0.0015;
      cloudGroup.rotation.x += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount) currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [totalItems]);

  // Update visibility based on density changes with animation
  useEffect(() => {
    const { trees, houses, buildings } = itemsRef.current;

    const numTreesVisible = Math.floor(totalItems * treeDensity);
    const numHousesVisible = Math.floor(totalItems * houseDensity);
    const numBuildingsVisible = Math.floor(totalItems * buildingDensity);

    const animateItems = (
      items: THREE.Group[],
      targetVisible: number,
      duration: number = 500,
      baseDelay: number = 0
    ) => {
      items.forEach((item, index) => {
        const shouldBeVisible = index < targetVisible;
        const baseScale = item.userData.baseScale || 1;
        const currentScale = item.scale.x;
        const targetScale = shouldBeVisible ? baseScale : 0;

        if (Math.abs(currentScale - targetScale) > 0.01) {
          const startScale = currentScale;
          const itemDelay = baseDelay + index * 5; // 5ms delay between each item

          setTimeout(() => {
            const startTime = Date.now();

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out cubic for smooth animation
              const eased = 1 - Math.pow(1 - progress, 3);
              const newScale = startScale + (targetScale - startScale) * eased;

              item.scale.set(newScale, newScale, newScale);
              item.visible = newScale > 0.01;

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            animate();
          }, itemDelay);
        }
      });
    };

    animateItems(trees, numTreesVisible);
    animateItems(houses, numHousesVisible);
    animateItems(buildings, numBuildingsVisible);
  }, [treeDensity, houseDensity, buildingDensity, totalItems]);

  return (
    <div
      id="planet-container"
      className={`relative w-full h-[600px] overflow-hidden rounded-2xl transition-all duration-300 ${
        isDragging
          ? "ring-4 ring-orange-500/50 shadow-[0_0_50px_rgba(249,115,22,0.3)] scale-[1.02]"
          : ""
      }`}
    >
      <div ref={mountRef} className="w-full h-full" />

      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-orange-500/50 text-orange-400 font-bold animate-pulse shadow-xl">
            Déposez votre choix ici
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm rounded-2xl md:rounded-full px-4 py-2 border border-white/10 z-20">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <LegendItem
            icon={TreePine}
            label="Environnement"
            percentage={Math.round(treeDensity * 100)}
            color="#4ade80"
          />
          <LegendItem
            icon={Home}
            label="Société"
            percentage={Math.round(houseDensity * 100)}
            color="#fb923c"
          />
          <LegendItem
            icon={Building2}
            label="Économie"
            percentage={Math.round(buildingDensity * 100)}
            color="#60a5fa"
          />
        </div>
      </div>
    </div>
  );
};
