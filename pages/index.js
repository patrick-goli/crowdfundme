import React, { Component } from "react";
import { Card, Button, Container } from "semantic-ui-react";
import Link from 'next/link';
import "semantic-ui-css/semantic.min.css";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log("campaigns:", campaigns);
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns?.map((campaignAddress) => {
      return {
        header: campaignAddress,
        description: (        
        <Link href={`/campaigns/${campaignAddress}`}>
        <a className="item">
        View description
        </a>
      </Link>),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Container>
        <h3>Ongoing crowd-funding Campaigns</h3>
        <Link href="/campaigns/new">
          <a className="item">
          <Button content="Create Campaign" icon="add circle" primary floated="right" />
          </a>
        </Link>
        {this.renderCampaigns()}
      </Container>
    );
  }
}

export default CampaignIndex;
