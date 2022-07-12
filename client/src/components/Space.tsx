interface IProps {
  width?: number;
  height?: number;
}
function Space({width, height}: IProps) {
  return <div style={{width: width || 0, height: height || 0}}></div>;
}

export default Space;
