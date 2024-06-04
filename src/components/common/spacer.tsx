interface ISpace {
  space: string | number;
}

export const SpacingVertical = ({ space }: ISpace) => {
  return <div style={{ height: space }} />;
};

export const SpacingHorizontal = ({ space }: ISpace) => {
  return <div style={{ width: space }} />;
};
