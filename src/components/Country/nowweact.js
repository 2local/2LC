// common classes
import { primaryColor, lightPrimaryColor, whiteColor, blackColor, grayColor, sidebarWidth } from './constants'

const GlobalStyle = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 'calc(100% - 68px)',
    padding: '40px 34px',
    backgroundColor: grayColor[8],
    borderRadius: '8px',
  },
  titleArea: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '5px',
    paddingBottom: '24px',
  },
  title: {
    fontFamily: 'RobotoRegular',
    fontWeight: 400,
    fontSize: '24px',
    lineHieght: '24px',
    letterSpacing: '0.18px',
    color: blackColor[2],
  },
  cardContent: {
    padding: '37px 57px 37px 57px',
    paddingBottom: '45px !important',
  },
  button: {
    height: '37px',
    backgroundColor: primaryColor,
    color: whiteColor,
    fontFamily: 'RobotoMedium',
    fontSize: '14px',
    lineHeight: '1.14',
    letterSpacing: '1.25px',
    textTransform: 'none',
    paddingLeft: '30px',
    paddingRight: '30px',
    '&:hover': {
      backgroundColor: lightPrimaryColor,
    },
  },
  button1: {
    height: '37px',
    backgroundColor: grayColor[8],
    color: primaryColor,
    fontFamily: 'RobotoMedium',
    fontSize: '14px',
    lineHeight: '1.14',
    letterSpacing: '1.25px',
    textTransform: 'none',
    paddingLeft: '30px',
    paddingRight: '30px',
    border: '3px solid',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    '&:hover': {
      backgroundColor: grayColor[8],
    },
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  alarm_icon: {
    width: '20px',
    height: '24px',
  },
  pointer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  requiredStyle: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '12px',
    marginTop: '3px',
    fontFamily: 'RobotoRegular',
    letterSpacing: '0.5px',
  },
  logoArea: {
    width: sidebarWidth,
    minWidth: sidebarWidth,
    cursor: 'pointer',
  },
  logo: {
    width: 'auto',
    height: '21px',
  },
}

export default GlobalStyle
