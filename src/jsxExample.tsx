import * as React from 'react';

type InnerComponentProps<T> = {
  value: T;
  onChange(newValue: T): void;
}

function InnerComponent<T>({value}: InnerComponentProps<T>): JSX.Element {
  return <div children={value} />;
}

function OuterComponent(): JSX.Element {
  const [value, setValue] = React.useState(0);

  return (
    <InnerComponent
      value={value}
      onChange={setValue}
    />
  )
}
