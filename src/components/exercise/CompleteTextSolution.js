import React, { PureComponent } from 'react';
import { string, array, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Highlighter from 'react-highlight-words';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 20,
    whiteSpace: 'pre-line'
  }),
  divider: {
    margin: '12px auto'
  }
});

class CompleteTextSolution extends PureComponent {
  static propTypes = {
    texto: string.isRequired,
    opciones: array.isRequired,
    classes: object.isRequired,
  }

  render() {
    const { texto, opciones, classes } = this.props;
    const optionsText = (option) => {
      let optText = `${option.referencia}\n`;
      option.variantes.map((variante) => {
        optText = `${optText}${variante}\n`;
      });
      return optText;
    };

    return (
      <div>
        <Paper className={classes.root} elevation={4}>
          <Typography component="p">
            <Highlighter
              highlightStyle={{ color: '#a9a6a6', backgroundColor: 'white' }}
              searchWords={['(present)', '(past)']}
              textToHighlight={texto}
              autoEscape
            />
          </Typography>
        </Paper>
        <Paper className={classes.root} elevation={4}>
          {opciones.map(option =>
            <div key={option.posicion}>
              <Typography style={{ whiteSpace: 'pre-line' }}>
                <Highlighter
                  highlightStyle={{ fontWeight: '900' }}
                  searchWords={[`${option.solucion}\n`]}
                  textToHighlight={optionsText(option)}
                  autoEscape
                />
              </Typography>
              <Divider className={classes.divider} />
            </div>)
          }
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CompleteTextSolution);
