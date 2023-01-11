//Created by Vivek - 23.04.2020
import React, { useState } from "react";
import { makeStyles, withStyles } from "@mui/styles";
// import ExpansionPanel from "@mui/material/ExpansionPanel";
// import ExpansionPanelDetails from "@mui/material/ExpansionPanelDetails";
// import ExpansionPanelSummary from "@mui/material/ExpansionPanelSummary";
import MuiExpansionPanel from "@mui/material/Accordion";
import MuiExpansionPanelDetails from "@mui/material/AccordionDetails";
import MuiExpansionPanelSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md'
import { GenericTabContent } from "../modalContentPages";
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

function GenericDetailsDataPanel(props) {
  const classes = useClasses(styles);
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
                  <GenericTabContent data={eachDetail} />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })
        : null}
    </div>
  );
}

export default GenericDetailsDataPanel;
