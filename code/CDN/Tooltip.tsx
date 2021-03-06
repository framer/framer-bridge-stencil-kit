import * as React from "react";
import { Frame, addPropertyControls, ControlType } from "framer";
import { useScript } from "../utils/useScript";
import { StencilComponents } from "../utils/constants";

type Props = {
  arrow: "top" | "right" | "bottom" | "left";
  error: boolean;
  text: string;
};

export function Tooltip(props: Props) {
  const [loaded, error] = useScript(StencilComponents);

  React.useEffect(() => {
    if (!loaded) return;
  }, [loaded, error]);

  const StencilTooltip = React.useMemo(() => {
    return (
      //@ts-ignore
      <my-tooltip arrow={props.arrow} error={props.error} text={props.text} />
    );
  }, [props]);

  return (
    <Frame size={"100%"} background={""}>
      {loaded && !error ? StencilTooltip : <b>Something went wrong!</b>}
    </Frame>
  );
}

//@ts-ignore
addPropertyControls(Tooltip, {
  arrow: {
    title: "Arrow",
    options: ["top", "right", "bottom", "left"],
    optionTitles: ["Top", "Right", "Bottom", "Left"],
    type: ControlType.Enum,
    defaultValue: "left"
  },
  error: { title: "Error", type: ControlType.Boolean, defaultValue: false },
  text: {
    title: "Text",
    type: ControlType.String,
    defaultValue: "Component"
  }
});

Tooltip.defaultProps = {
  height: 23,
  width: 68
};
