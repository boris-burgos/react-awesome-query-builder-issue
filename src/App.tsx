import {
  _TreeI,
  Builder,
  Query,
  BasicConfig,
  Utils,
  Config,
  ImmutableTree,
  JsonGroup,
  BuilderProps,
} from "@react-awesome-query-builder/ui";
import "@react-awesome-query-builder/ui/css/styles.css";
import { useState, useCallback, useMemo } from "react";

function buildConfig(value?: string): Config {
  if (!value) {
    return {
      ...BasicConfig,
      fields: {
        default: {
          label: "Default",
          type: "text",
        },
      },
    };
  }

  return {
    ...BasicConfig,
    fields: {
      test: {
        type: "!group",
        mode: "array",
        conjunctions: ["AND", "OR"],
        label: "Test Group",
        subfields: {
          f2cf5528da564f613539be250466c96fa: {
            label: "Number field",
            type: "number",
          },
        },
      },
    },
  };
}

const App = () => {
  const queryValue: JsonGroup = { id: Utils.uuid(), type: "group" };
  const [selectValue, setSelectValue] = useState<string>("test");
  const config = useMemo(() => buildConfig(selectValue), [selectValue]);
  console.log(config);

  const [state, setState] = useState({
    tree: Utils.loadTree(queryValue),
    config: config,
  });

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config) => {
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));
    },
    []
  );

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  console.log(config);

  return (
    <div className="content">
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
        style={{ marginRight: 10 }}
      >
        <option value=""></option>
        <option value="test">Test</option>
      </select>

      <button onClick={() => setSelectValue("")}>Clear</button>

      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
    </div>
  );
};

export default App;
