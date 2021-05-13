import React from 'react'

// material ui core components
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
// icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// styles
import { makeStyles } from '@material-ui/core/styles'
import globalStyles from './nowweact'

const globalUseStyles = makeStyles(globalStyles)

export default function Country(props) {
  const { countryList, getSelectedCountry, currentCountry } = props
  const globalClasses = globalUseStyles()
  const [value, setValue] = React.useState({})
  React.useEffect(() => {
    setValue(currentCountry)
  }, [currentCountry])

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
          getSelectedCountry(newValue)
        }}
        id="country"
        options={countryList}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option
          } else if (JSON.stringify(option) === JSON.stringify({})) {
            return ''
          }
          return option.name
        }}
        renderOption={option => option.name}
        fullWidth
        popupIcon={<ExpandMoreIcon />}
        renderInput={params => <TextField {...params} variant="outlined" />}
      />
      {/* <div className={globalClasses.requiredStyle}>{generalRequired.country}</div> */}
    </React.Fragment>
  )
}
