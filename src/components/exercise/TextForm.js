import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';

import TextArea from './TextArea';

class TextForm extends PureComponent {
  static propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <form>
        <TextArea
          value={value}
          onChange={onChange}
          placeholder="Ingrese el texto aqui"
        />
      </form>
    );
  }
}

export default TextForm;
