"use client";

import JsBarcode from "jsbarcode";
import { useEffect, useRef } from "react";

interface BarcodeBoletoProps {
  digitableLine: string;
}

export const TicketBarcode = ({ digitableLine }: BarcodeBoletoProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const getBarCodeNumber = (line: string) => {
    return line.replace(/\D/g, "").slice(0, 44);
  };

  useEffect(() => {
    if (svgRef.current && digitableLine) {
      const barcode = getBarCodeNumber(digitableLine);
      JsBarcode(svgRef.current, barcode, {
        format: "CODE128",
        lineColor: "#000",
        width: 1.5,
        height: 60,
        displayValue: false,
      });
    }
  }, [digitableLine]);
  return (
    <div className="mt-4">
      <svg ref={svgRef}></svg>
    </div>
  );
};
