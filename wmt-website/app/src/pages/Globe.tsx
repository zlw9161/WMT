import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';
import { institutions, type ResearchInstitution } from '@/data/institutions';
import ScrollReveal from '@/components/ScrollReveal';

const glowPalette = ['#00ffff', '#ff0080', '#ffd700', '#00ff88'];

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

function InstitutionMarkers({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (item: ResearchInstitution) => void;
}) {
  return (
    <group>
      {institutions.map((inst, idx) => {
        const pos = latLngToVector3(inst.lat, inst.lng, 1.03);
        const color = glowPalette[idx % glowPalette.length];
        const selected = selectedId === inst.id;

        return (
          <group key={inst.id} position={[pos.x, pos.y, pos.z]}>
            <mesh
              onPointerDown={(e) => {
                e.stopPropagation();
                onSelect(inst);
              }}
            >
              <sphereGeometry args={[selected ? 0.032 : 0.022, 18, 18]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={selected ? 1.2 : 0.65}
              />
            </mesh>
            {selected && (
              <Html distanceFactor={8} center>
                <div
                  style={{
                    minWidth: '200px',
                    maxWidth: '260px',
                    background: 'rgba(10,10,26,0.92)',
                    border: `1px solid ${color}`,
                    borderRadius: '12px',
                    padding: '10px 12px',
                    boxShadow: `0 0 18px ${color}55`,
                    color: '#eaf2ff',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{inst.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.86, marginBottom: 6 }}>
                    {inst.city}, {inst.country}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.95 }}>
                    {inst.focus.slice(0, 2).join(' • ')}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function Earth() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 80, 80]} />
        <meshStandardMaterial
          color="#0e375e"
          metalness={0.2}
          roughness={0.7}
          emissive="#061627"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.015, 80, 80]} />
        <meshStandardMaterial
          color="#00bcd4"
          transparent
          opacity={0.08}
          emissive="#00ffff"
          emissiveIntensity={0.45}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<ResearchInstitution | null>(null);

  const countryCount = useMemo(() => {
    return new Set(institutions.map((i) => i.country)).size;
  }, []);

  return (
    <div className="min-h-[100dvh] px-6 lg:px-12 pt-[92px] pb-10">
      <section className="max-w-[1320px] mx-auto">
        <ScrollReveal>
          <div className="mb-8 text-center">
            <h1
              className="text-[34px] md:text-[54px] font-bold mb-3"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#ffffff',
                textShadow: '0 0 12px rgba(0,255,255,0.5), 0 0 28px rgba(255,0,128,0.3)',
              }}
            >
              {lang === 'zh' ? '全球研究机构 3D 地球' : 'Global Research Globe'}
            </h1>
            <p
              className="text-[15px] md:text-[17px] text-text-secondary max-w-[860px] mx-auto"
              style={{ fontFamily: lang === 'zh' ? "'Noto Sans SC', sans-serif" : "'Inter', sans-serif" }}
            >
              {lang === 'zh'
                ? '基于 Three.js + React Three Fiber 构建的交互式数字地球，展示世界模型研究机构的全球分布。拖拽旋转，滚轮缩放，点击节点查看机构信息。'
                : 'An interactive digital globe built with Three.js and React Three Fiber to visualize worldwide world-model research institutions. Drag to rotate, scroll to zoom, and click nodes for details.'}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
          <div
            className="glass-card overflow-hidden"
            style={{ height: '72vh', minHeight: '520px' }}
            onPointerDown={() => setSelected(null)}
          >
            <Canvas camera={{ position: [0, 0, 2.8], fov: 48 }}>
              <color attach="background" args={['#050712']} />
              <ambientLight intensity={0.45} />
              <directionalLight position={[4, 2, 4]} intensity={1.2} color="#99ddff" />
              <pointLight position={[-4, -2, -2]} intensity={0.55} color="#ff66cc" />
              <Stars radius={120} depth={60} count={2500} factor={4} saturation={0} fade speed={1} />

              <Earth />
              <InstitutionMarkers
                selectedId={selected?.id ?? null}
                onSelect={setSelected}
              />

              <OrbitControls
                enablePan={false}
                minDistance={1.7}
                maxDistance={5}
                rotateSpeed={0.65}
                zoomSpeed={0.9}
                autoRotate
                autoRotateSpeed={0.2}
              />
            </Canvas>
          </div>

          <div className="glass-card p-5 h-fit">
            <h2
              className="text-[18px] font-semibold mb-3 text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {lang === 'zh' ? '分布概览' : 'Distribution Overview'}
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-lg p-3" style={{ background: 'rgba(0,255,255,0.08)' }}>
                <div className="text-[11px] text-text-dim">{lang === 'zh' ? '机构数量' : 'Institutions'}</div>
                <div className="text-[24px] font-bold text-neon-cyan">{institutions.length}</div>
              </div>
              <div className="rounded-lg p-3" style={{ background: 'rgba(255,0,128,0.08)' }}>
                <div className="text-[11px] text-text-dim">{lang === 'zh' ? '覆盖国家' : 'Countries'}</div>
                <div className="text-[24px] font-bold text-neon-magenta">{countryCount}</div>
              </div>
            </div>

            <div className="space-y-2 max-h-[48vh] overflow-auto pr-1">
              {institutions.map((inst) => {
                const active = selected?.id === inst.id;
                return (
                  <button
                    key={inst.id}
                    onClick={() => setSelected(inst)}
                    className="w-full text-left rounded-lg p-3 transition-all"
                    style={{
                      border: active ? '1px solid rgba(0,255,255,0.65)' : '1px solid rgba(255,255,255,0.08)',
                      background: active ? 'rgba(0,255,255,0.12)' : 'rgba(255,255,255,0.02)',
                    }}
                  >
                    <div className="text-[14px] text-white font-medium">{lang === 'zh' ? inst.name_cn : inst.name}</div>
                    <div className="text-[12px] text-text-secondary mt-1">{inst.city}, {inst.country}</div>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-[16px] text-white font-semibold mb-1">
                  {lang === 'zh' ? selected.name_cn : selected.name}
                </div>
                <div className="text-[12px] text-text-secondary mb-2">
                  {selected.city}, {selected.country}
                </div>
                <div className="text-[12px] text-text-secondary mb-3">
                  {(lang === 'zh' ? selected.focus_cn : selected.focus).join(' • ')}
                </div>
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[12px] no-underline"
                    style={{ color: '#00ffff' }}
                  >
                    {lang === 'zh' ? '访问机构主页' : 'Visit Institution Website'}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
