import React from 'react'
import classNames from 'classnames'

import {
  List,
  ListItem,
  ListItemText,
  Theme,
  Toolbar as MuiToolbar,
  createStyles,
  withStyles,
} from '@material-ui/core'

import {
  TableColumnResizing,
  TableColumnReordering,
  TableHeaderRow,
  TableGroupRow,
  TableSummaryRow,
  TableFilterRow,
  VirtualTable,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
  ColumnChooser,
  TableColumnVisibility,
} from '@devexpress/dx-react-grid-material-ui'

import {
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  SummaryState,
  IntegratedSummary,
  DataTypeProvider,
  FilteringState,
  IntegratedFiltering,
  Sorting,
} from '@devexpress/dx-react-grid'

import GridPackages from '../containers/Packages/GridPackages'
import GridComponentPackages from '../containers/Packages/GridComponentPackages'
import IconButtonSideBar from '../containers/Packages/IconButtonSideBar'
import DrawerFilter from '../containers/Packages/DrawerFilter'

const drawerWidth = 240

const styles = (theme: Theme) => createStyles({
  table: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tablebar: {
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
})

type GridProps = {
  classes: {
    [key: string]: string
  }
}

const GridComponentBase: React.FunctionComponent<GridProps> = props => {
  const { classes, ...restProps } = props
  return (
    <GridComponentPackages
      generateClassNames={(props) => classNames(classes.table, {
        [classes.contentShift]: props.packagesFilterVisible,
        [classes.content]: !props.packagesFilterVisible,
      })}
      {...restProps}
    />
  )
}

const GridComponent = withStyles(styles)(GridComponentBase)

type ToolbarProps = {
  classes: {
    [key: string]: string
  }
}

const ToolbarComponentBase: React.FunctionComponent<ToolbarProps> = props => {
  const { classes, children, ...restProps } = props
  return (
    <MuiToolbar className={classes.tablebar} {...restProps} >
      {children}
      <IconButtonSideBar />
    </MuiToolbar>
  )
}

const ToolbarComponent = withStyles(styles)(ToolbarComponentBase)

type FormatterProps = React.FunctionComponent<DataTypeProvider.ValueFormatterProps>

const SizeFormatter: FormatterProps = ({ value }) => {
  if (value < 1000) {
    return <React.Fragment>{value} B</React.Fragment>
  } else if (value < 1000 ** 2) {
    return <React.Fragment>{Math.round(value / 1000)} kB</React.Fragment>
  } else {
    return <React.Fragment>{Math.round(value / 1000 ** 2)} MB</React.Fragment>
  }
}

const FlagFormatter: FormatterProps = ({ value }) => {
  const children = Object
    .entries(value)
    .map(([name, status]) => status ? `+${name}` : name)
    .join(' ')

  return <React.Fragment>{children}</React.Fragment>
}

const DependencyFormatter: FormatterProps = ({ value }) => {
  return value.join(' ')
}

const defaultSorting: Array<Sorting> = [
  { columnName: 'category', direction: 'asc' },
  { columnName: 'name', direction: 'asc' },
]

const columns = [
  {
    columnName: 'category',
    name: 'category',
    title: 'Category',
    width: 125,
  },
  {
    columnName: 'name',
    name: 'name',
    title: 'Name',
    width: 125,
  },
  {
    columnName: 'version',
    name: 'version',
    title: 'Version',
    width: 125,
  },
  {
    columnName: 'revision',
    name: 'revision',
    title: 'Revision',
    width: 125,
  },
  {
    columnName: 'size',
    name: 'size',
    title: 'Size',
    width: 125,
  },
  {
    columnName: 'files',
    name: 'files',
    title: 'Files',
    width: 125,
  },
  {
    columnName: 'use_bool',
    name: 'use_bool',
    title: 'USE flags',
    width: 125,
  },
  {
    columnName: 'deps',
    name: 'deps',
    title: 'Dependencies',
    width: 125,
  },
]

const summaryItems = [
  { columnName: 'name', type: 'count' },
  { columnName: 'size', type: 'sum' },
  { columnName: 'files', type: 'sum' },
]

const defaultOrder = [
  'category',
  'name',
  'version',
  'revision',
  'size',
  'files',
  'use_bool',
  'deps',
]

const defaultHiddenColumnNames = ['use_bool', 'deps',]

type Props = {
  classes: {
    [key: string]: string
  }
}

const Packages: React.FunctionComponent<Props> = props => {
  const { classes } = props
  return (
    <React.Fragment>
      <GridPackages columns={columns} rootComponent={GridComponent}>
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <SortingState defaultSorting={defaultSorting} />
        <IntegratedSorting />
        <GroupingState defaultGrouping={[]} />
        <IntegratedGrouping />
        <SummaryState totalItems={summaryItems} groupItems={summaryItems} />
        <IntegratedSummary />
        <DragDropProvider />
        <DataTypeProvider for={['size']} formatterComponent={SizeFormatter} />
        <DataTypeProvider for={['use_bool']} formatterComponent={FlagFormatter} />
        <DataTypeProvider for={['deps']} formatterComponent={DependencyFormatter} />
        <VirtualTable height="auto" />
        <TableColumnResizing defaultColumnWidths={columns} />
        <TableColumnReordering defaultOrder={defaultOrder} />
        <TableColumnVisibility
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
        <TableHeaderRow showSortingControls />
        <TableGroupRow />
        <TableSummaryRow />
        <TableFilterRow />
        <Toolbar rootComponent={ToolbarComponent} />
        <GroupingPanel />
        <ColumnChooser />
      </GridPackages>
      <DrawerFilter
        variant="persistent"
        anchor="right"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem><ListItemText>Filters</ListItemText></ListItem>
        </List>
      </DrawerFilter>
    </React.Fragment>
  )
}

export default withStyles(styles)(Packages)

  // tableSort(a, b) {
  //   const { order, orderBy } = this.props
  //   if (!orderBy) {
  //     return 0
  //   }
  //   if (order === 'asc') {
  //     return a[orderBy] < b[orderBy] ? 1 : -1
  //   }
  //   if (order === 'desc') {
  //     return a[orderBy] > b[orderBy] ? 1 : -1
  //   }
  // }