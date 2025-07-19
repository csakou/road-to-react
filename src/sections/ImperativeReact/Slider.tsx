import { useRef } from "react";
import styled from "styled-components";

import { getPercentage, getLeft, getValue } from "./utils/utils";

type SliderProps = {
  initial?: number;
  max?: number;
  formatFn?: (arg: number) => string;
  onChange?: (arg: string | number) => void;
};

const StyledSlider = styled.div`
  position: relative;
  border-radius: 3px;
  background: #dddddd;
  height: 15px;
`;

const StyledThumb = styled.div`
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: absolute;
  top: -5px;
  opacity: 0.5;
  background: #823eb7;
  cursor: pointer;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export function Slider({
  initial = 0,
  max = 100,
  formatFn = (value: number) => value.toFixed(0),
  onChange,
}: SliderProps) {
  const initialPercentage = getPercentage(initial, max);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const currentPosRef = useRef<HTMLElement>(null);
  const diffRef = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!thumbRef.current) return;
    diffRef.current = e.clientX - thumbRef.current.getBoundingClientRect().left;
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleThumbMove);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleThumbMove);
  };

  const handleThumbMove = (e: MouseEvent) => {
    if (!sliderRef.current || !thumbRef.current) return;

    let newX =
      e.clientX -
      diffRef.current -
      sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max);

    thumbRef.current.style.left = getLeft(String(newPercentage));
    if (currentPosRef.current) {
      currentPosRef.current.textContent = formatFn(newValue);
    }
    if (onChange) onChange(newValue);
  };

  return (
    <>
      <SliderHeader>
        <strong ref={currentPosRef}>{formatFn(initial)}</strong>
        &nbsp;/&nbsp;
        {formatFn(max)}
      </SliderHeader>
      <StyledSlider
        id="slider"
        ref={sliderRef}
        onClick={(e) => handleThumbMove(e.nativeEvent)}
      >
        <StyledThumb
          style={{ left: getLeft(String(initialPercentage)) }}
          ref={thumbRef}
          onMouseDown={handleMouseDown}
        />
      </StyledSlider>
    </>
  );
}
