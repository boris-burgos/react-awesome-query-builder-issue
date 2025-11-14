import {
  Builder,
  Config,
  ImmutableTree,
  JsonGroup,
  JsonLogicTree,
  Query,
  Utils,
} from "@react-awesome-query-builder/ui";
import { CSSProperties, useCallback, useMemo } from "react";

const queryValue: JsonGroup = { id: Utils.uuid(), type: "group" };

interface ConditionsBuilderProps {
  value?: JsonLogicTree;
  onChange?: (value: object | undefined) => void;
  config: Config;
  style?: CSSProperties;
}

export function Conditions(props: ConditionsBuilderProps) {
  const { value, onChange, config, style } = props;
  console.log({value})

  const memoizedValue = useMemo(() => {
    return Utils.loadFromJsonLogic(value, config) ?? Utils.loadTree(queryValue);
  }, [config]); // Dont add 'value' to dependencies to avoid re-render the component

  const handleChange = useCallback(
    (newValue: ImmutableTree, newConfig: Config) => {
      const newLogic = Utils.jsonLogicFormat(newValue, newConfig)?.logic;

      if (onChange) {
        onChange(newLogic);
      }
    },
    [onChange]
  );

  return (
    <Query
      {...config}
      value={memoizedValue}
      onChange={handleChange}
      renderBuilder={(renderProps) => (
        <div
          className="query-builder-container"
          style={{ width: "100%", ...style }}
        >
          <div className="query-builder qb-lite">
            <Builder {...renderProps} />
          </div>
        </div>
      )}
    />
  );
}
