import React from "react";
import Grid from "@material-ui/core/Grid";
import SmallCard from "../../components/SmallCard/SmallCard";

class DashboardCount extends React.Component {
  render() {
    return (
      <>
        <Grid item xs={3}>
          <SmallCard
            style={{ width: "100%" }}
            type={"Total"}
            count={this.props.total}
            icon={"perm_media"}
          />
        </Grid>
        <Grid item xs={3}>
          <SmallCard
            type={"Approved"}
            count={this.props.approved}
            icon={"thumb_up"}
          />
        </Grid>
        <Grid item xs={3}>
          <SmallCard
            type={"Pending"}
            count={this.props.pending}
            icon={"hourglass_empty"}
          />
        </Grid>
        <Grid item xs={3}>
          <SmallCard
            type={"Rejected"}
            count={this.props.rejected}
            icon={"thumb_down"}
          />
        </Grid>
      </>
    );
  }
}

export default DashboardCount;
