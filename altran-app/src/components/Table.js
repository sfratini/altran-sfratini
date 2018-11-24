import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import UserCard from './UserCard';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from './MySnackContent'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
});

class EnhancedTable extends React.Component {

  constructor(){
    super();
    this.snack = null;
  }

  state = {
    loading: false,
    order: 'asc',
    orderBy: 'name',
    selected: [],
    data: [],
    page: 0,
    rowsPerPage: 5,
    search: null,
    modal: false,
    current: null,
    error: null,
    snack: false
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    this.setState({ modal: true, current: this.state.data.find(item => {
        return (item.id === id);
    }) });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentDidMount(){

    this.setState({loading: true}, () => {

      fetch(this.props.url)
        .then(response => {
            if (response.headers && response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") > -1)            
                return response.json();
            else return response.text();
        })
        .then(responseJson => {
            this.setState({
              loading: false,
              data: JSON.parse(responseJson).Brastlewark || [],
              error: null,
              snack: false
            });
        })
        .catch(err => {
            this.setState({
              loading: false,
              error: err,
              snack: true
            });
        })

    })
  }

  search = (search) => {
      this.setState({search})
  }

  closeSnack = () => {
    this.setState({ snack: false });
  };

  render() {

    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;

    if (this.state.loading){
      return (
        <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                  <Grid item xs={12}>
                    <CircularProgress/>                
                  </Grid>   
                </Grid> 
      );
    }

    let msg = "An error has ocurred";
    if (this.state.error)
      msg = this.state.error.message || this.state.error.name;    

    let filtered = [];
    if (this.state.search){
        let l = this.state.search.toLowerCase();
        filtered = data.filter(item => {
            return (item.name.toLowerCase().indexOf(l) > -1 || item.weight.toString().indexOf(l) > -1 || item.height.toString().indexOf(l) > -1 || item.hair_color.toLowerCase().indexOf(l) > -1 || item.age.toString().indexOf(l) > -1 || item.professions.some(item => (item.toLowerCase().indexOf(l) > -1)))
        })
    } else filtered = data;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filtered.length - page * rowsPerPage);

    let sorted = stableSort(filtered, getSorting(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    let showTable = !this.state.error;

    return (
      <Paper className={classes.root}>
            <Modal open={this.state.modal} onClose={() => this.setState({modal: false})}> 
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
                >
                <Grid item xs={12}>
                    <UserCard item={this.state.current} onClose={() => this.setState({modal: false})}/>
                </Grid>   
                </Grid> 
            </Modal>
        {showTable && <div>
        <EnhancedTableToolbar numSelected={selected.length} onSearch={this.search}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={sorted.length}
            />
            <TableBody>
              {sorted
                .map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell>
                            <CardMedia
                                className={classes.cover}
                                image={n.thumbnail}
                                title={n.name}
                            />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell numeric>{n.age}</TableCell>
                      <TableCell numeric>{n.weight}</TableCell>
                      <TableCell numeric>{n.height}</TableCell>
                      <TableCell>{n.hair_color}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filtered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
        </div>}
           <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snack}
            autoHideDuration={6000}
            onClose={this.closeSnack}
          >
            <MySnackbarContentWrapper
              onClose={this.closeSnack}
              variant="error"
              message={msg}
            />
          </Snackbar>
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);