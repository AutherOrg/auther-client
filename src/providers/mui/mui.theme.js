import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
})

theme = responsiveFontSizes(theme)

theme.overrides.MuiButton = {
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0'
    }
  }
}

theme.overrides.MuiCardActions = {
  root: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}

// theme.overrides.MuiGrid = {
//   item: {
//     [theme.breakpoints.down('sm')]: {
//       padding: '20px 0 !important'
//     }
//   }
// }

export default theme
