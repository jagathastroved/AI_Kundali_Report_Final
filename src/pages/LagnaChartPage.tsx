import React, { useState } from 'react';
import { useReport } from '../context/ReportContext';
import { planetImages } from '../constants/planetImages';
import { renderPromoBox } from '../components/ui/SharedElements';


const getPlanetImage = (planetName: string) => {
  const name = planetName.toLowerCase();
  if (name.includes('sun') || name.includes('surya')) return planetImages.surya;
  if (name.includes('moon') || name.includes('chandra')) return planetImages.moon;
  if (name.includes('mars') || name.includes('mangal') || name.includes('kuja')) return planetImages.mars;
  if (name.includes('mercury') || name.includes('budh') || name.includes('buddha')) return planetImages.buddha;
  if (name.includes('jupiter') || name.includes('guru') || name.includes('brihaspati')) return planetImages.guru;
  if (name.includes('venus') || name.includes('shukra') || name.includes('sukra')) return planetImages.sukra;
  if (name.includes('saturn') || name.includes('shani') || name.includes('sani')) return planetImages.sani;
  if (name.includes('rahu')) return planetImages.rahu;
  if (name.includes('ketu')) return planetImages.ketu;
  return planetImages.surya; // fallback
};

const SouthChartCell = ({ planets, isAsc = false, num, onMouseMove, onMouseLeave }: { planets: string[], isAsc?: boolean, num?: string, onMouseMove: (e: React.MouseEvent) => void, onMouseLeave: () => void }) => (
  <div
    className="p-1.5 sm:p-2 flex flex-col items-center justify-center card-bg h-full w-full relative overflow-hidden transition-colors duration-200 cursor-pointer hover:bg-indigo-50/40"
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
  >
    {num && <span className="absolute top-1 right-1.5 text-[9px] text-slate-400 font-medium">{num}</span>}
    <div className="flex flex-col space-y-0.5 items-center justify-center w-full mt-1">
      {planets.map((p: string, i: number) => (
        <span key={i} className="text-[11px] sm:text-[12px] font-semibold page-text tracking-tight leading-none">{p}</span>
      ))}
    </div>
    {isAsc && (
      <span className="absolute bottom-1 right-1.5 text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Lagna</span>
    )}
  </div>
);

const NorthChartCell = ({ x, y, width, height, num, planets, isAsc = false, onMouseMove, onMouseLeave }: { x: number, y: number, width: number, height: number, num: string, planets: string[], isAsc?: boolean, onMouseMove: (e: React.MouseEvent) => void, onMouseLeave: () => void }) => (
  <foreignObject x={x} y={y} width={width} height={height} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="cursor-pointer group">
    <div className="flex flex-col items-center justify-center w-full h-full text-center leading-none overflow-visible rounded-xl transition-colors duration-200 hover:bg-indigo-50/40">
      <span className="text-[10px] font-medium text-muted mb-1">{num}</span>
      <div className="flex flex-col items-center justify-center mt-0.5 space-y-[1px]">
        {planets.map((p: string, i: number) => (
          <span key={i} className="text-[10px] font-semibold page-text tracking-tight leading-tight">{p}</span>
        ))}
      </div>
      {isAsc && <span className="text-[8px] font-bold text-indigo-500 uppercase mt-1 tracking-widest">Lagna</span>}
    </div>
  </foreignObject>
);

export const LagnaChartPage: React.FC<{ pageIdx: number, setPage: (idx: number) => void }> = ({ pageIdx, setPage }) => {
  const { reportData: data, birthDetails } = useReport();

  const findPageByType = (obj: any, type: string): any => {
    if (!obj || typeof obj !== 'object') return null;
    if (obj.page_type === type) return obj;
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        const found = findPageByType(obj[key], type);
        if (found) return found;
      }
    }
    return null;
  };

  const baseStellium = findPageByType(data, 'kundali_chart_stellium')
    || data?.pages?.page7_chart_stellium
    || data?.page7_chart_stellium;

  const stellium = baseStellium?.lagnaChart || baseStellium;

  const chartData = data?.pages?.page5_kundali_chart || data?.page5_kundali_chart;
  const chart = chartData?.chart || {};
  const planetPositions = chartData?.planet_positions || [];

  const [chartType, setChartType] = useState<'south' | 'north'>('north');
  const [tooltip, setTooltip] = useState<{ x: number, y: number, planets: string[], houseNum: string } | null>(null);

  if (!data) return null;

  const signsList = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  const lagnaSignName = planetPositions.find((p: any) => p.planet === 'Lagna')?.sign || 'Aries';
  const lagnaSignIndex = signsList.indexOf(lagnaSignName) + 1;

  const getPlanetsForHouse = (houseNum: number) => {
    return planetPositions.filter((p: any) => p.house === houseNum && p.planet !== 'Lagna').map((p: any) => p.planet);
  };

  const getHouseNumForSign = (signName: string) => {
    const signIndex = signsList.indexOf(signName) + 1;
    return String(((signIndex - lagnaSignIndex + 12) % 12) + 1);
  };

  const northHousesCoords = [
    { x: 110, y: 30, w: 80, h: 90 }, { x: 35, y: 5, w: 80, h: 60 }, { x: 5, y: 35, w: 60, h: 80 },
    { x: 30, y: 110, w: 90, h: 80 }, { x: 5, y: 185, w: 60, h: 80 }, { x: 35, y: 235, w: 80, h: 60 },
    { x: 110, y: 180, w: 80, h: 90 }, { x: 185, y: 235, w: 80, h: 60 }, { x: 235, y: 185, w: 60, h: 80 },
    { x: 180, y: 110, w: 90, h: 80 }, { x: 235, y: 35, w: 60, h: 80 }, { x: 185, y: 5, w: 80, h: 60 }
  ];

  const getPlanetsForSign = (signName: string) => {
    return planetPositions.filter((p: any) => p.sign === signName && p.planet !== 'Lagna').map((p: any) => p.planet);
  };

  const isAsc = (signName: string) => {
    return planetPositions.some((p: any) => p.sign === signName && p.planet === 'Lagna');
  };

  const handleMouseMove = (e: React.MouseEvent, planets: string[], houseNum: string) => {
    if (planets.length > 0) {
      setTooltip({ x: e.clientX, y: e.clientY, planets, houseNum });
    } else {
      setTooltip(null);
    }
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="space-y-8 pb-6 relative">


      {/* Title Section */}
      <div className="text-center space-y-3 mt-4">
        <h2 className="text-2xl md:text-3xl font-semibold page-text tracking-tight leading-tight max-w-xl mx-auto">
          Your Lagna Kundli Chart
        </h2>
        <div className="w-16 h-1 bg-linear-to-r from-indigo-400 to-indigo-600 mx-auto rounded-full mt-4" />
      </div>

      {/* Review birth details summary indicators inside booklet */}
      <div className="p-4 sm:p-5 bg-linear-to-r from-slate-50 to-white dark:from-slate-800/20 dark:to-transparent hover:dark:from-slate-900/40 hover:dark:to-slate-800/40 transition-all duration-300 rounded-3xl flex flex-col sm:flex-row justify-between items-center text-xs font-normal border border-default shadow-soft mx-1 gap-4">
        <div className="space-y-1 page-text text-center sm:text-left">
          <div className="font-medium text-[14px]">Birth: <span className="text-indigo-600 font-bold">{birthDetails?.name}</span> <span className="text-muted capitalize">({birthDetails?.gender})</span></div>
          <div className="text-[12px] text-muted flex flex-col sm:flex-row gap-1 sm:gap-3">
            <span>Date: {birthDetails?.day}/{birthDetails?.month}/{birthDetails?.year}</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span>Time: {String((birthDetails?.hour || 0) % 12 || 12).padStart(2, '0')}:{String(birthDetails?.minute || 0).padStart(2, '0')} {(birthDetails?.hour || 0) >= 12 ? 'PM' : 'AM'}</span>
          </div>
        </div>

        {/* Select Chart Style togglers */}
        <div className="flex card-bg p-1.5 rounded-2xl shadow-inner">
          <button
            onClick={() => setChartType('north')}
            className={`px-4 py-1.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all ${chartType === 'north' ? 'card-bg text-indigo-600 shadow-soft ring-1 ring-slate-200/50' : 'text-muted hover:page-text'
              }`}
          >
            North
          </button>
          <button
            onClick={() => setChartType('south')}
            className={`px-4 py-1.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all ${chartType === 'south' ? 'card-bg text-indigo-600 shadow-soft ring-1 ring-slate-200/50' : 'text-muted hover:page-text'
              }`}
          >
            South
          </button>
        </div>
      </div>

      {/* Interactive Graphic Kundli Chart Wrapper */}
      <div className="flex justify-center py-4 min-h-[340px] items-center">
        {chartType === 'north' ? (
          // High Fidelity North Indian Diamond Chart SVG representation
          <svg width="300" height="300" viewBox="0 0 300 300" className="text-slate-800 dark:text-slate-400">
            {/* Background Box */}
            <rect x="0" y="0" width="300" height="300" fill="transparent" stroke="currentColor" strokeWidth="1" className="rounded-xl" rx="8" ry="8" />
            {/* Major Diagonals */}
            <line x1="0" y1="0" x2="300" y2="300" stroke="currentColor" strokeWidth="1" />
            <line x1="300" y1="0" x2="0" y2="300" stroke="currentColor" strokeWidth="1" />
            {/* Inner Diamonds lines */}
            <line x1="150" y1="0" x2="0" y2="150" stroke="currentColor" strokeWidth="1" />
            <line x1="150" y1="0" x2="300" y2="150" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="150" x2="150" y2="300" stroke="currentColor" strokeWidth="1" />
            <line x1="300" y1="150" x2="150" y2="300" stroke="currentColor" strokeWidth="1" />

            {/* Displaying houses using foreignObject for perfect flexbox alignment */}
            {northHousesCoords.map((c, i) => {
              const houseNum = i + 1;
              return (
                <NorthChartCell
                  key={houseNum}
                  x={c.x} y={c.y} width={c.w} height={c.h}
                  num={String(houseNum)}
                  planets={getPlanetsForHouse(houseNum)}
                  isAsc={houseNum === 1}
                  onMouseMove={(e) => handleMouseMove(e, getPlanetsForHouse(houseNum), String(houseNum))}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </svg>
        ) : (
          <div className="grid grid-cols-4 grid-rows-4 gap-px bg-slate-800 dark:bg-slate-500 w-full aspect-square max-w-[340px] h-[340px] border border-slate-800 dark:border-slate-500 rounded-xl shadow-soft mx-auto overflow-hidden text-center font-sans relative">
            {/* Row 1 */}
            <SouthChartCell planets={getPlanetsForSign('Pisces')} isAsc={isAsc('Pisces')} num={getHouseNumForSign('Pisces')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Pisces'), getHouseNumForSign('Pisces'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Aries')} isAsc={isAsc('Aries')} num={getHouseNumForSign('Aries')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Aries'), getHouseNumForSign('Aries'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Taurus')} isAsc={isAsc('Taurus')} num={getHouseNumForSign('Taurus')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Taurus'), getHouseNumForSign('Taurus'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Gemini')} isAsc={isAsc('Gemini')} num={getHouseNumForSign('Gemini')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Gemini'), getHouseNumForSign('Gemini'))} onMouseLeave={handleMouseLeave} />

            {/* Row 2 */}
            <SouthChartCell planets={getPlanetsForSign('Aquarius')} isAsc={isAsc('Aquarius')} num={getHouseNumForSign('Aquarius')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Aquarius'), getHouseNumForSign('Aquarius'))} onMouseLeave={handleMouseLeave} />
            <div className="col-span-2 row-span-2 card-bg relative flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold page-text tracking-tight">Birth Chart</h3>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mt-1">Rasi Chart</p>
            </div>
            <SouthChartCell planets={getPlanetsForSign('Cancer')} isAsc={isAsc('Cancer')} num={getHouseNumForSign('Cancer')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Cancer'), getHouseNumForSign('Cancer'))} onMouseLeave={handleMouseLeave} />

            {/* Row 3 */}
            <SouthChartCell planets={getPlanetsForSign('Capricorn')} isAsc={isAsc('Capricorn')} num={getHouseNumForSign('Capricorn')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Capricorn'), getHouseNumForSign('Capricorn'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Leo')} isAsc={isAsc('Leo')} num={getHouseNumForSign('Leo')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Leo'), getHouseNumForSign('Leo'))} onMouseLeave={handleMouseLeave} />

            {/* Row 4 */}
            <SouthChartCell planets={getPlanetsForSign('Sagittarius')} isAsc={isAsc('Sagittarius')} num={getHouseNumForSign('Sagittarius')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Sagittarius'), getHouseNumForSign('Sagittarius'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Scorpio')} isAsc={isAsc('Scorpio')} num={getHouseNumForSign('Scorpio')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Scorpio'), getHouseNumForSign('Scorpio'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Libra')} isAsc={isAsc('Libra')} num={getHouseNumForSign('Libra')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Libra'), getHouseNumForSign('Libra'))} onMouseLeave={handleMouseLeave} />
            <SouthChartCell planets={getPlanetsForSign('Virgo')} isAsc={isAsc('Virgo')} num={getHouseNumForSign('Virgo')} onMouseMove={(e) => handleMouseMove(e, getPlanetsForSign('Virgo'), getHouseNumForSign('Virgo'))} onMouseLeave={handleMouseLeave} />
          </div>
        )}
      </div>

      {/* Premium Content Card (Stellium Information) */}
      <div className="p-6 sm:p-8 rounded-3xl card-bg border border-default shadow-soft relative overflow-hidden group font-sans mx-1">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-400 to-indigo-600" />

        <div className="space-y-5 sm:space-y-6">
          {stellium?.stelliumQuestion && (
            <h3 className="text-[22px] sm:text-2xl font-bold page-text tracking-tight leading-tight">
              {stellium.stelliumQuestion}
            </h3>
          )}

          <div className="space-y-4 sm:space-y-5 text-[14.5px] sm:text-[15px] page-text leading-relaxed md:leading-loose font-medium opacity-90">
            {stellium?.stelliumDesc1 && <p>{stellium.stelliumDesc1}</p>}
            {stellium?.stelliumDesc2 && <p>{stellium.stelliumDesc2}</p>}
            {stellium?.stelliumDesc3 && <p>{stellium.stelliumDesc3}</p>}
          </div>
        </div>
      </div>

      {/* Promotional Box */}
      <div className="mt-8">
        {renderPromoBox(() => setPage(pageIdx + 1), 'planetary')}
      </div>

      {/* Tooltip Portal Overlay - placed at the end to guarantee it overlays the SVGs */}
      {tooltip && (
        <div
          className="fixed z-[100] pointer-events-none transform -translate-x-1/2 -translate-y-full pb-3"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="card-bg p-3 rounded-2xl shadow-xl shadow-indigo-900/10 border border-slate-200/60 dark:border-slate-700/60 min-w-[120px] max-w-[200px]">
            <p className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider mb-2 border-b border-indigo-50 dark:border-slate-700 pb-1 text-center">
              House {tooltip.houseNum}
            </p>
            <div className="flex flex-col gap-2">
              {tooltip.planets.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <img src={getPlanetImage(p)} alt={p} className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 shadow-soft" />
                  <span className="text-[12px] font-bold page-text">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
