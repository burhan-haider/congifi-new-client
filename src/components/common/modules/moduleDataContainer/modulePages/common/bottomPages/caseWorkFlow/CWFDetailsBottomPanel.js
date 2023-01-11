import React, { useState } from "react";
import { makeStyles, withStyles } from "@mui/styles";
import {
  Typography
} from "@mui/material";
import MuiExpansionPanel from "@mui/material/Accordion";
import MuiExpansionPanelDetails from "@mui/material/AccordionDetails";
import MuiExpansionPanelSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import { CWFTabContent } from "../../modalContentPages";
import { useClasses } from "@application";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#ece4e4"
    //borderRadius: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
    // flexBasis: "33.33%",
    // flexShrink: 0,
  }
});

function CWFDetailsDataPanel(props) {
  //console.log("CWFDetailsDataPanel = ", props.data);
  const classes = useClasses(styles);
  //const { actionDisplayHandler } = props;
  const { bottomAction, dataRow } = props;
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    //actionDisplayHandler(isExpanded ? true : false);
  };

  const ExpansionPanel = withStyles({
    root: {
      //backgroundColor: "rgba(0, 0, 0, .03)",
      borderRadius: "25px",
      boxShadow: "none",
      "&:not(:last-child)": {
        borderBottom: 0
      },
      "&:before": {
        display: "none"
      },
      "&$expanded": {
        margin: "auto"
      }
    },
    expanded: {}
  })(MuiExpansionPanel);

  const ExpansionPanelSummary = withStyles({
    root: {
      //backgroundColor: "rgba(0, 0, 0, .03)",
      backgroundColor: "#cbd5e0",
      border: "1px solid rgba(0, 0, 0, .125)",
      marginBottom: -1,
      minHeight: 56,
      "&$expanded": {
        minHeight: 56
      }
    },
    /*content: {
      "&$expanded": {
        margin: "12px 0"
      }
    },*/
    expanded: {}
  })(MuiExpansionPanelSummary);

  const ExpansionPanelDetails = withStyles({
    root: {
      display: "block",
      padding: 0
    }
  })(MuiExpansionPanelDetails);

  return (
    <div className={classes.root}>
      {props.data
        ? Object.keys(props.data).map(function(key) {
            const eachDetail = {
              dataSet: props.data[key]
            };
            return (
              <ExpansionPanel
                key={key}
                expanded={expanded === key}
                onChange={handleChange(key)}
                TransitionProps={{ unmountOnExit: true }}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={key}
                  id={key}
                  className="bg-gray-300"
                >
                  <Typography className={classes.heading}>{key}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <CWFTabContent
                    data={eachDetail}
                    bottomAction={bottomAction}
                    dataRow={dataRow}
                    reloadData={props.reloadData}
                    inputParams={props.inputParams}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        : null}
    </div>
  );
}

export default CWFDetailsDataPanel;
