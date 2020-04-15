import { Theme } from "@material-ui/core"
import { getColor } from "../../../../utils/themeUtils"

const styles = (theme: Theme) => ({
  calendar: {
    width: (props: any) => (props.fullWidth ? "100%" : undefined),
    "& .DayPicker": {
      display: "inline-block",
      fontSize: "1rem",
    },
    "& .DayPicker-wrapper": {
      position: "relative",
      flexDirection: "row",
      paddingBottom: "1em",
      userSelect: "none",
    },
    "& .DayPicker-Months": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    "& .DayPicker-Month": {
      width: (props: any) => (props.fullWidth ? "100%" : undefined),
      display: "table",
      margin: 0,
      borderSpacing: 0,
      borderCollapse: "collapse",
      backgroundColor: theme.palette.common.white,
    },
    "& .DayPicker-NavBar": {
      display: (props: any) => (props.hideHeader ? "none" : undefined),
    },
    "& .DayPicker-NavButton": {
      position: "absolute",
      top: "1em",
      right: "1.5em",
      left: "auto",
      display: "inline-block",
      marginTop: "2px",
      width: "1.25em",
      height: "1.25em",
      backgroundPosition: "center",
      backgroundSize: "50%",
      backgroundRepeat: "no-repeat",
      color: theme.palette.common.black,
      cursor: "pointer",
    },
    "& .DayPicker-NavButton:hover": {
      opacity: "0.8",
    },
    "& .DayPicker-NavButton--prev": {
      marginRight: "1.5em",
      backgroundImage:
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAVVJREFUWAnN2G0KgjAYwPHpGfRkaZeqvgQaK+hY3SUHrk1YzNLay/OiEFp92I+/Mp2F2Mh2lLISWnflFjzH263RQjzMZ19wgs73ez0o1WmtW+dgA01VxrE3p6l2GLsnBy1VYQOtVSEH/atCCgqpQgKKqYIOiq2CBkqtggLKqQIKgqgCBjpJ2Y5CdJ+zrT9A7HHSTA1dxUdHgzCqJIEwq0SDsKsEg6iqBIEoq/wEcVRZBXFV+QJxV5mBtlDFB5VjYTaGZ2sf4R9PM7U9ZU+lLuaetPP/5Die3ToO1+u+MKtHs06qODB2zBnI/jBd4MPQm1VkY79Tb18gB+C62FdBFsZR6yeIo1YQiLJWMIiqVjQIu1YSCLNWFgijVjYIuhYYCKoWKAiiFgoopxYaKLUWOii2FgkophYp6F3r42W5A9s9OcgNvva8xQaysKXlFytoqdYmQH6tF3toSUo0INq9AAAAAElFTkSuQmCC")',
    },
    "& .DayPicker-NavButton--next": {
      marginRight: "1.5em",
      backgroundImage:
        'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAwCAYAAAB5R9gVAAAABGdBTUEAALGPC/xhBQAAAXRJREFUWAnN119ugjAcwPHWzJ1gnmxzB/BBE0n24m4xfNkTaOL7wOtsl3AXMMb+Vjaa1BG00N8fSEibPpAP3xAKKs2yjzTPH9RAjhEo9WzPr/Vm8zgE0+gXATAxxuxtqeJ9t5tIwv5AtQAApsfT6TPdbp+kUBcgVwvO51KqVhMkXKsVJFXrOkigVhCIs1Y4iKlWZxB1rX4gwlpRIIpa8SDkWmggrFq4IIRaJKCYWnSgnrXIQV1r8YD+1Vrn+bReagysIFfLABRt31v8oBu1xEBttfRbltmfjgEcWh9snUS2kNdBK6WN1vrOWxObWsz+fjxevsxmB1GQDfINWiev83nhaoiB/CoOU438oPrhXS0WpQ9xc1ZQWxWHqUYe0I0qrKCQKjygDlXIQV2r0IF6ViEBxVTBBSFUQQNhVYkHIVeJAtkNsbQ7c1LtzP6FsObhb2rCKv7NBIGoq4SDmKoEgTirXAcJVGkFSVVpgoSrXICGUMUH/QBZNSUy5XWUhwAAAABJRU5ErkJggg==")',
    },
    "& .DayPicker-NavButton--interactionDisabled": {
      display: "none",
    },
    "& .DayPicker-Caption": {
      display: (props: any) => (props.hideHeader ? "none" : "table-caption"),
      marginBottom: "0.5em",
      padding: "0 0.5em",
      textAlign: "left",
    },
    "& .DayPicker-Caption > div": {
      fontWeight: 500,
      fontSize: "1.15em",
    },
    "& .DayPicker-Weekdays": {
      backgroundColor: (props: any) => getColor(theme, props.color),
      display: "table-header-group",
      marginTop: "1em",
    },
    "& .DayPicker-WeekdaysRow": {
      display: "table-row",
    },
    "& .DayPicker-Weekday": {
      fontSize: "0.75rem",
      fontWeight: "bold",
      color: theme.palette.common.white,
      display: "table-cell",
      padding: "0.5em",
      textAlign: "center",
    },
    "& .DayPicker-Weekday abbr[title]": {
      borderBottom: "none",
      textDecoration: "none",
    },
    "& .DayPicker-Body": {
      display: "table-row-group",
    },
    "& .DayPicker-Week": {
      display: "table-row",
      borderTop: `1rem solid ${theme.palette.common.white}`,
      borderBottom: `1rem solid ${theme.palette.common.white}`,
    },
    "& .DayPicker-Day": {
      display: "table-cell",
      color: theme.palette.common.black,
      fontSize: "1rem",
      padding: "0.15rem 0.75rem",
      borderRadius: 0,
      outline: "none !important",
      backgroundColor: theme.palette.common.white,
      verticalAlign: "middle",
      textAlign: "center",
      cursor: "pointer",
    },
    "& .DayPicker-Day--today": {
      fontWeight: "inherit !important",
      color: theme.palette.common.black,
    },
    "& .DayPicker-Day.DayPicker-Day--outside": {
      color: theme.palette.action.disabled,
    },
    "& .DayPicker-Day--selectedRange:not(.DayPicker-Day--hideSelected)": {
      backgroundColor: (props: any) => getColor(theme, props.color),
      color: theme.palette.common.black,
    },
    "& .DayPicker-Day--selectedRangeStart": {
      borderBottomLeftRadius: "75%",
      borderTopLeftRadius: "75%",
    },
    "& .DayPicker-Day--selectedRangeEnd": {
      borderBottomRightRadius: "50%",
      borderTopRightRadius: "50%",
    },
    "& .DayPicker-Day--hoverRange": {
      backgroundColor: (props: any) => getColor(theme, props.color, "light"),
      borderRadius: 0,
    },
    "& .DayPicker-Day--hoverRange.DayPicker-Day--hoverRangeStart": {
      borderBottomLeftRadius: "75%",
      borderTopLeftRadius: "75%",
    },
    "& .DayPicker-Day--hoverRange.DayPicker-Day--hoverRangeEnd": {
      borderBottomRightRadius: "75%",
      borderTopRightRadius: "75%",
    },
    "& .DayPicker-WeekNumber": {
      display: "table-cell",
      padding: "0.5em",
      minWidth: "1em",
      verticalAlign: "middle",
      textAlign: "right",
      fontSize: "0.75em",
      cursor: "pointer",
    },
    "& .DayPicker--interactionDisabled .DayPicker-Day": {
      cursor: "default",
    },
    "& .DayPicker-Footer": {
      paddingTop: "0.5em",
    },
    "& .DayPicker-Day--outside": {
      cursor: "default",
    },
    "& .DayPicker-Day--disabled": {
      color: theme.palette.action.disabled,
      cursor: "default",
    },
  },
})

export default styles
