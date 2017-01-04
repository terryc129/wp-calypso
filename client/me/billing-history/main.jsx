/**
 * External dependencies
 */
var React = require( 'react' ),
	isEmpty = require( 'lodash/isEmpty' );
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
var observe = require( 'lib/mixins/data-observe' ),
	Card = require( 'components/card' ),
	MeSidebarNavigation = require( 'me/sidebar-navigation' ),
	config = require( 'config' ),
	CreditCards = require( 'me/purchases/credit-cards' ),
	eventRecorder = require( 'me/event-recorder' ),
	PurchasesHeader = require( '../purchases/list/header' ),
	BillingHistoryTable = require( './billing-history-table' ),
	UpcomingChargesTable = require( './upcoming-charges-table' ),
	SectionHeader = require( 'components/section-header' );

import Main from 'components/main';
import purchasesPaths from 'me/purchases/paths';
import QueryBillingData from 'components/data/query-billing-data';
import { getBillingData } from 'state/billing-data/selectors';

const BillingHistory =  React.createClass( {
	mixins: [ observe( 'sites' ), eventRecorder ],

	render: function() {
		const { billingData, sites } = this.props;
		const hasBillingHistory = ! isEmpty( billingData.past );

		return (
			<Main className="billing-history">
				<MeSidebarNavigation />
				<QueryBillingData />
				<PurchasesHeader section={ 'billing' } />
				<Card className="billing-history__receipts">
					<BillingHistoryTable transactions={ billingData && billingData.past } />
				</Card>
				<Card href={ purchasesPaths.purchasesRoot() }>
					{ this.translate( 'Go to "Purchases" to add or cancel a plan.' ) }
				</Card>
				{ hasBillingHistory &&
					<div>
						<SectionHeader label={ this.translate( 'Upcoming Charges' ) } />
						<Card className="billing-history__upcoming-charges">
							<UpcomingChargesTable sites={ sites } transactions={ billingData && billingData.upcoming } />
						</Card>
					</div> }
				{ config.isEnabled( 'upgrades/credit-cards' ) &&
					<CreditCards /> }
			</Main>
		);
	}
} );

export default connect(
	( state ) => ( {
		billingData: getBillingData( state )
	} )
)( BillingHistory );
