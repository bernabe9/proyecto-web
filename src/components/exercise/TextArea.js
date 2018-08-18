import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';

class TextArea extends PureComponent {
  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    placeholder: string,
  }

  render() {
    const { value, onChange, placeholder } = this.props;

    return (
      <textarea
        className="text-area"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    );
  }
}

export default TextArea;
