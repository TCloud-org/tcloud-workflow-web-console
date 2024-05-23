import { theme } from "antd";
import Xarrow, { xarrowPropsType } from "react-xarrows";

export const AppLineConnector = (props: xarrowPropsType) => {
  const { token } = theme.useToken();

  const { start, end } = props;

  // const [svgPoint, setSvgPoint] = useState([0, 0]);
  // const [startPoint, setStartPoint] = useState([0, 0]);
  // const [endPoint, setEndPoint] = useState([0, 0]);
  // const [controlPoint, setControlPoint] = useState([0, 0]);

  // useEffect(() => {
  //   if (!start || !end || typeof start !== "string" || typeof end !== "string")
  //     return;

  //   const updateControlPoint = () => {
  //     const startEl = document.getElementById(start);
  //     const endEl = document.getElementById(end);
  //     if (startEl && endEl) {
  //       const startRect = startEl.getBoundingClientRect();
  //       const endRect = endEl.getBoundingClientRect();

  //       const startX = startRect.x + startRect.width / 2;
  //       const startY = startRect.y + startRect.height / 2;
  //       const endX = endRect.x + endRect.width / 2;
  //       const endY = endRect.y + endRect.height / 2 - 100;

  //       setSvgPoint([startRect.x, startRect.y]);
  //       setStartPoint([startX, startY]);

  //       setEndPoint([endX, endY]);

  //       const d = 200;

  //       const midX = (startX + endX) / 2;
  //       const midY = (startY + endY) / 2;

  //       const dx = endX - startX;
  //       const dy = endY - startY;

  //       const length = Math.sqrt(dx * dx + dy * dy);
  //       const unitPerpX = -dy / length;
  //       const unitPerpY = dx / length;

  //       const newPointX = midX + d * unitPerpX;
  //       const newPointY = midY + d * unitPerpY;

  //       setControlPoint([newPointX, newPointY]);
  //     }
  //   };

  //   updateControlPoint();
  //   window.addEventListener("resize", updateControlPoint);
  //   return () => window.removeEventListener("resize", updateControlPoint);
  // }, [start, end]);

  // console.log(`M ${startPoint} Q ${controlPoint} ${endPoint}`, svgPoint);

  if (!start || !end) {
    return null;
  }

  return (
    <Xarrow
      headShape="circle"
      headSize={4}
      strokeWidth={2}
      tailSize={4}
      tailShape="circle"
      showTail
      color={token.colorPrimary}
      dashness
      // arrowBodyProps={{
      //   d: `M ${startPoint} Q ${controlPoint} ${endPoint}`,
      //   fill: "none",
      //   stroke: "hotpink",
      //   strokeWidth: 5,
      // }}
      {...props}
    />
  );
};
