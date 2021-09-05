import { ComponentProps, PropsWithChildren, useEffect } from "react";
import qr from "qr.js";
import React from "react";
import { useRef } from "react";

export default function Qr({
  children,
  ...props
}: ComponentProps<"canvas"> & { children: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas) {
      return;
    }
    const qrCode = qr(children, { errorCorrectLevel: 1 });
    context.fillStyle = "black";
    context.imageSmoothingEnabled = false;
    const squareSize =
      Math.min(canvas.width, canvas.height) / qrCode.modules.length;
    qrCode.modules.forEach((row, rowIndex) =>
      row.forEach((square, index) => {
        square &&
          context.rect(
            squareSize * index,
            squareSize * rowIndex,
            squareSize,
            squareSize
          );
      })
    );
    context.fill();
    return () => context.clearRect(0, 0, canvas.width, canvas.height);
  }, [children, canvasRef.current]);
  return (
    <div
      style={{
        padding: ".75em",
        borderRadius: "1em",
        background: "white",
        maxHeight: "8em",
        maxWidth: "8em",
      }}
    >
      <canvas
        {...props}
        ref={canvasRef}
        width={500}
        height={500}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  );
}
