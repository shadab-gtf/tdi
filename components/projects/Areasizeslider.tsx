"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";

const BARS = [3, 5, 6, 8, 9, 11, 13, 15, 17, 18, 20, 21, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88,];
const BAR_MAX = 88;

const AreaSizeSlider: React.FC<{
    min?: number;
    max?: number;
    step?: number;
    values?: [number, number];
    onChange?: (v: [number, number]) => void;
}> = ({
    min = 1200,
    max = 25000,
    step = 100,
    values: externalValues,
    onChange,
}) => {
        const [internalValues, setInternalValues] = useState<[number, number]>([3200, 12000]);
        const values = externalValues ?? internalValues;
        const setValues = onChange ?? setInternalValues;

        const containerRef = useRef<HTMLDivElement>(null);
        const [containerWidth, setContainerWidth] = useState(0);

        useEffect(() => {
            const el = containerRef.current;
            if (!el) return;
            const ro = new ResizeObserver(([entry]) => {
                setContainerWidth(entry.contentRect.width);
            });
            ro.observe(el);
            setContainerWidth(el.getBoundingClientRect().width);
            return () => ro.disconnect();
        }, []);

        const pct = useCallback(
            (v: number) => ((v - min) / (max - min)) * 100,
            [min, max]
        );

        const n = BARS.length;
        const total = max - min;

        const isDragging = useRef<null | "min" | "max">(null);

        const valueFromClientX = useCallback(
            (clientX: number) => {
                const el = containerRef.current;
                if (!el) return 0;
                const rect = el.getBoundingClientRect();
                const raw = (clientX - rect.left) / rect.width;
                const clamped = Math.max(0, Math.min(1, raw));
                const val = min + clamped * (max - min);
                return Math.round(val / step) * step;
            },
            [min, max, step]
        );

        const handlePointerMove = useCallback(
            (e: PointerEvent) => {
                if (!isDragging.current) return;
                const v = valueFromClientX(e.clientX);
                if (isDragging.current === "min") {
                    if (v < values[1]) setValues([v, values[1]]);
                } else {
                    if (v > values[0]) setValues([values[0], v]);
                }
            },
            [values, setValues, valueFromClientX]
        );

        const handlePointerUp = useCallback(() => {
            isDragging.current = null;
            document.body.style.userSelect = "";
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        }, [handlePointerMove]);

        const startDrag = useCallback(
            (which: "min" | "max") => (e: React.PointerEvent) => {
                e.preventDefault();
                isDragging.current = which;
                document.body.style.userSelect = "none";
                window.addEventListener("pointermove", handlePointerMove);
                window.addEventListener("pointerup", handlePointerUp);
            },
            [handlePointerMove, handlePointerUp]
        );

        const minPct = pct(values[0]);
        const maxPct = pct(values[1]);

        const CHART_HEIGHT = 80;
        const THUMB_R = 7;
        // const TRACK_H = 1;

        return (
            <div className="w-full select-none" ref={containerRef}>
                <div
                    className="relative w-full"
                    style={{ height: `${CHART_HEIGHT + THUMB_R * 2 + 4}px` }}
                >
                    <div
                        className="absolute left-0 right-0 bottom-0 flex items-end gap-[2.5px]"
                        style={{ height: `${CHART_HEIGHT}px`, paddingBottom: `${THUMB_R + 2}px` }}
                    >
                        {BARS.map((h, i) => {
                            const bMin = min + (i / n) * total;
                            const bMax = min + ((i + 1) / n) * total;
                            const active = bMax > values[0] && bMin < values[1];
                            const barH = Math.round((h / BAR_MAX) * (CHART_HEIGHT - THUMB_R - 6));
                            return (
                                <div
                                    key={i}
                                    className="flex-1 rounded-t-[2px] transition-colors duration-200"
                                    style={{
                                        height: `${barH}px`,
                                        backgroundColor: active ? "#D9991F" : "#E2E8F0",
                                    }}
                                />
                            );
                        })}
                    </div>
                    {/* <div
                        className="absolute left-0 right-0"
                        style={{ bottom: `${THUMB_R - TRACK_H / 2}px`, height: `${TRACK_H}px` }}
                    >
                        <div className="absolute inset-0 rounded-full bg-[#E2E8F0]" />
                        <div
                            className="absolute top-0 bottom-0 rounded-full bg-[#D9991F]"
                            style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
                        />
                    </div> */}
                    <div
                        className="absolute flex items-center justify-center"
                        style={{
                            bottom: 0,
                            left: `${minPct}%`,
                            transform: "translateX(-35%)",
                            width: `${THUMB_R * 2}px`,
                            height: `${THUMB_R * 2}px`,
                            cursor: "grab",
                            touchAction: "none",
                            zIndex: 10,
                        }}
                        onPointerDown={startDrag("min")}
                    >
                        <div
                            className="rounded-full bg-white transition-shadow duration-150"
                            style={{
                                width: `${THUMB_R * 2}px`,
                                height: `${THUMB_R * 2}px`,
                                border: "1.5px solid #D9991F",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            }}
                        />
                    </div>
                    <div
                        className="absolute flex items-center justify-center"
                        style={{
                            bottom: 0,
                            left: `${maxPct}%`,
                            transform: "translateX(-70%)",
                            width: `${THUMB_R * 2}px`,
                            height: `${THUMB_R * 2}px`,
                            cursor: "grab",
                            touchAction: "none",
                            zIndex: 10,
                        }}
                        onPointerDown={startDrag("max")}
                    >
                        <div
                            className="rounded-full bg-white transition-shadow duration-150"
                            style={{
                                width: `${THUMB_R * 2}px`,
                                height: `${THUMB_R * 2}px`,
                                border: "1.5px solid #D9991F",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-3">
                    <span className="text-[15px] font-normal font-serif text-[var(--color-paragraph,#4A4A4A)]">
                        {values[0].toLocaleString()} sq.ft
                    </span>
                    <span className="text-[15px] font-normal font-serif text-[var(--color-paragraph,#4A4A4A)]">
                        {values[1].toLocaleString()} sq.ft
                    </span>
                </div>
            </div>
        );
    };

export default AreaSizeSlider;